# Project Learnings

This document captures technical learnings from challenging tasks, non-obvious solutions, and patterns discovered during development. It serves as a reference for solving similar issues in the future and avoiding known pitfalls.

**Last Updated**: 2026-01-29

---

## Frontend

### AWS Amplify Lambda Environment Variables Not Accessible at Runtime

**Problem**: Environment variables configured in AWS Amplify Console (like `CMS_API_URL` and `CMS_API_TOKEN`) were set correctly but diagnostic endpoints showed `"not set"` when deployed to Lambda.

**Root Cause**: Next.js on AWS Amplify requires explicit `env` configuration in `next.config.ts` to pass server-side environment variables to Lambda functions. Simply setting them in Amplify Console is not sufficient for API routes running as Lambda.

**Solution**: Add explicit `env` configuration to `next.config.ts`:
```typescript
const nextConfig: NextConfig = {
  env: {
    CMS_API_URL: process.env.CMS_API_URL,
    CMS_API_TOKEN: process.env.CMS_API_TOKEN,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    // ... other server-side variables
  },
};
```

**Prevention**: Always add server-side environment variables to `next.config.ts` `env` object when deploying to Amplify Lambda.

**Files**: 
- `frontend/next.config.ts`
- `frontend/src/app/api/debug/env/route.ts` (diagnostic endpoint)

---

### ISR Cache Invalidation Required for Content Updates

**Problem**: When content date changes in Strapi (e.g., event date changes from future to past), the frontend cache shows stale content. Event should filter out but still displays because ISR cache hasn't expired (5-minute default).

**Root Cause**: Next.js ISR caches pages for a configured duration (default 300 seconds). When filtering logic changes server-side, cached HTML is served to users until cache expires.

**Solution**: Implement two cache invalidation strategies:
1. **Manual Revalidation API**: Endpoint that accepts `secret` and `path` parameters to trigger immediate ISR revalidation
2. **Webhook Integration**: Strapi webhooks automatically call revalidation endpoint when content is published/updated

**Prevention**: 
- Implement revalidation endpoint early: `frontend/src/app/api/revalidate/route.ts`
- Configure Strapi webhooks to automatically trigger cache invalidation
- For testing, use `/api/revalidate?secret=YOUR_SECRET&path=/` to clear cache immediately

**Files**:
- `frontend/src/app/api/revalidate/route.ts` (manual revalidation)
- `frontend/src/app/api/webhooks/strapi/route.ts` (automatic via Strapi webhooks)
- `docs/deployment/CACHE_INVALIDATION.md` (comprehensive guide)

---

### Date/Time Format Handling in CMS Content

**Problem**: Events with dates stored in different formats (YYYY-MM-DD vs YYYY/MM/DD) or times without seconds (HH:mm) were parsed incorrectly, causing events to filter out incorrectly.

**Root Cause**: JavaScript `Date` parsing is strict about format. Without proper normalization, parsing fails, returns `NaN`, and filtering logic treats as invalid date.

**Solution**: Implement flexible date/time parsing with format normalization:
```typescript
function isFutureEvent(date: string, time: string): boolean {
  const normalizedDate = date.replace(/\//g, "-"); // Normalize YYYY/MM/DD to YYYY-MM-DD
  let normalizedTime = time;
  const timeParts = time.split(":");
  if (timeParts.length === 2) {
    normalizedTime = `${time}:00`; // Pad HH:mm with seconds
  }
  const eventDate = new Date(`${normalizedDate}T${normalizedTime}`);
  if (isNaN(eventDate.getTime())) {
    console.warn(`Invalid date/time: "${date}T${time}"`);
    return false;
  }
  return eventDate > new Date();
}
```

**Prevention**:
- Always normalize date/time formats before parsing
- Add console warnings for unparseable dates
- Include validation function to check event data before filtering
- Test with multiple date/time formats

**Files**:
- `frontend/src/lib/strapi-utils.ts` (`isFutureEvent()`, `validateEventData()`)

---

### Client-Side publishedAt Filtering as Backup

**Problem**: Even though Strapi API filters for published content, occasionally unpublished items appeared on frontend (possibly due to race conditions or API caching).

**Root Cause**: Backend API might return drafts in rare conditions. Frontend needs defensive filtering.

**Solution**: Add client-side `publishedAt` filtering in addition to API-side filtering:
```typescript
let filteredEvents = normalizedEvents.filter((event) => {
  const isPublished = event?.attributes?.publishedAt !== null && event?.attributes?.publishedAt !== undefined;
  if (!isPublished && process.env.NODE_ENV === "development") {
    console.warn("[strapi] Filtered out unpublished event:", event.id);
  }
  return isPublished;
});
```

**Prevention**: 
- Always include defensive filtering on client side
- Add development-mode logging to debug filtering issues
- Check for both `null` and `undefined` values

**Files**:
- `frontend/src/lib/strapi.ts` (`fetchEvents()`)

---

### Production-Safe Logging with Environment Flags

**Problem**: Verbose debug logging is helpful during development but should not run in production (logs fill up, affect performance).

**Root Cause**: Logs run regardless of environment without explicit guards.

**Solution**: Gate debug logging with environment variables:
```typescript
if (process.env.DEBUG_EVENT_FILTERING === "true" || process.env.NODE_ENV === "development") {
  console.log("[HomePage] Event filtering analysis:", {...});
}
```

**Prevention**:
- Use environment variable flags for production debug logging
- Default to false in production
- Allow enabling via Amplify Console environment variables if needed

**Files**:
- `frontend/src/app/(site)/page.tsx`
- `frontend/src/app/(site)/calendar/current-events/page.tsx`

---

## Backend

### Lazy Initialization Pattern for Environment Variables

**Problem**: When dotenv loads environment variables after a module imports and reads `process.env`, the variable is `undefined`. Module-level reads fail silently.

**Root Cause**: `dotenv.config()` is called in server startup, but modules import before it runs. If a module reads `process.env.TOKEN` at import time, it's not yet set.

**Solution**: Use lazy initialization - read environment variables at function call time, not at module import time:
```typescript
// ❌ Bad: Reads env at import time
const cmsApiToken = process.env.CMS_API_TOKEN || '';

// ✅ Good: Reads env at function call time
function getStrapiConfig() {
  const cmsApiUrl = process.env.CMS_API_URL || 'https://cms.vishnumandirtampa.com/api';
  const cmsApiToken = process.env.CMS_API_TOKEN || '';
  return { cmsApiUrl, cmsApiToken };
}
```

**Prevention**:
- Always read environment variables inside functions, not at module level
- Particularly critical for services loaded before dotenv.config()
- Use getter functions or lazy loading patterns

**Files**:
- `backend/src/services/strapi.service.ts`
- `frontend/src/lib/strapi.ts`

---

### CORS Configuration for Amplify Domains

**Problem**: Frontend forms hosted on Amplify (*.amplifyapp.com) were blocked by CORS when calling backend API due to strict origin checking.

**Root Cause**: CORS middleware used exact string matching for origins, but Amplify generates dynamic subdomains for preview/production deploys.

**Solution**: Use function-based origin checking to match Amplify domain pattern:
```typescript
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Allow Amplify domains (*.amplifyapp.com)
    if (origin && /\.amplifyapp\.com$/.test(origin)) {
      callback(null, true);
    } else if (!origin) {
      callback(null, true); // Allow no-origin requests (like mobile apps)
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
```

**Prevention**:
- Use regex patterns for domain matching when possible
- Test with actual Amplify preview/production domains
- Document allowed origin patterns

**Files**:
- `backend/src/config/corsOptions.ts`

---

### Multipart/Form-Data Handling in API Proxy

**Problem**: Frontend proxy routes forwarding form submissions to backend were parsing multipart/form-data as JSON, resulting in "Unexpected token" errors.

**Root Cause**: Proxy was converting request to JSON and losing multipart boundaries, then sending with wrong Content-Type.

**Solution**: Preserve original Content-Type and request body:
```typescript
// ❌ Bad: Converts to JSON, loses boundaries
const body = JSON.stringify(await request.json());

// ✅ Good: Preserves original Content-Type and multipart boundaries
const buffer = await request.arrayBuffer();
const response = await fetch(apiUrl, {
  method: 'POST',
  headers: {
    'Content-Type': request.headers.get('content-type') || 'application/json',
  },
  body: buffer,
});
```

**Prevention**:
- Don't parse and re-stringify multipart requests
- Always preserve original Content-Type header
- Use `arrayBuffer()` instead of `text()` for binary safety

**Files**:
- `frontend/src/app/api/v1/forms/sponsorship/route.ts`
- `frontend/src/app/api/v1/forms/facility-request/route.ts`

---

### Lazy Initialization for Stripe Client

**Problem**: Backend startup crashed with "Neither apiKey nor config.authenticator provided" when `STRIPE_SECRET_KEY` was not configured.

**Root Cause**: Stripe client initialized at module import time. Missing key immediately throws error, preventing backend from starting.

**Solution**: Use Proxy pattern for lazy initialization:
```typescript
const globalForStripe = globalThis as unknown as { stripe: Stripe | undefined };

export const stripe = globalForStripe.stripe ?? new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-11-20.acacia',
});

if (process.env.NODE_ENV !== 'production') globalForStripe.stripe = stripe;
```

**Prevention**:
- Use lazy initialization for external service clients
- Allow backend to start even if optional services are unconfigured
- Only throw errors when service is actually accessed

**Files**:
- `backend/src/utils/stripe.client.ts`

---

### Webhook Signature Verification Requires Raw Body

**Problem**: Strapi and Resend webhooks failed signature verification because middleware parsed JSON before signature check could be performed.

**Root Cause**: Express `json()` middleware consumes the request stream. Raw body needed for signature verification must be captured before middleware consumes it.

**Solution**: Mount webhook routes before body parsing middleware:
```typescript
// ✅ Correct order: webhooks BEFORE json parser
app.post('/webhooks/strapi', handleStrapiWebhook); // Can read raw body
app.post('/webhooks/resend', handleResendWebhook);

// Then add body parser for other routes
app.use(express.json());

// Regular API routes AFTER parser
app.use('/api', apiRoutes);
```

**Prevention**:
- Mount webhook endpoints before body parsing middleware
- Document this requirement for webhook endpoints
- Capture raw body in middleware if needed: `const raw = req.body; ... next()`

**Files**:
- `backend/src/server.ts` (route mounting order)
- `backend/src/api/webhooks/resend.routes.ts` (Resend webhook)

---

## Deployment

### AWS Amplify Environment Variable Availability

**Problem**: Environment variables set in Amplify Console weren't available in Next.js API routes when deployed to Lambda.

**Root Cause**: Amplify passes environment variables to build-time, but `next.config.ts` needs explicit configuration to make them available to runtime Lambda functions.

**Solution**: 
1. Add environment variables to `next.config.ts` `env` object
2. Set variables in Amplify Console for "All branches"
3. Verify with `/api/debug/env` endpoint after deployment

**Prevention**:
- Create diagnostic endpoint to verify environment variables at runtime
- Document that Amplify requires explicit config in `next.config.ts`
- Test environment variable availability before relying on them

**Files**:
- `frontend/next.config.ts` (env configuration)
- `frontend/src/app/api/debug/env/route.ts` (verification endpoint)
- `docs/deployment/AMPLIFY_ENV_VARS.md`

---

### Prisma Client Generation Before Build

**Problem**: TypeScript compilation failed with "Prisma Client not found" because Prisma hadn't generated the client before the build.

**Root Cause**: Build step runs without generating Prisma Client first. Prisma types are missing.

**Solution**: Add `prisma generate` before TypeScript build:
```json
{
  "scripts": {
    "build": "prisma generate && next build",
    "prebuild": "prisma generate"
  }
}
```

**Prevention**:
- Always run `prisma generate` in prebuild hooks
- Never commit generated Prisma Client to git
- Use `.gitignore` to exclude generated files

**Files**:
- `frontend/package.json` (build scripts)
- `backend/package.json` (build scripts)

---

### RDS PostgreSQL SSL Connection Required

**Problem**: Production database connection failed with SSL/TLS errors when connecting to AWS RDS.

**Root Cause**: AWS RDS PostgreSQL requires SSL encryption. Connection strings without `?sslmode=require` fail.

**Solution**: Always add `?sslmode=require` to production DATABASE_URL:
```bash
# Development (local, no SSL)
DATABASE_URL="postgresql://user:pass@localhost:5432/db"

# Production (AWS RDS, SSL required)
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"
```

**Prevention**:
- Document that RDS requires SSL in all connection strings
- Use environment-specific templates
- Test connection strings before deploying

**Files**:
- `docs/deployment/AMPLIFY_ENV_VARS.md`
- `.cursorrules` Section 8 (Prisma)

---

## Database

### Prisma Migrations Order Matters

**Problem**: Database failed to initialize because initial schema migration hadn't created tables before alteration migrations tried to modify columns.

**Root Cause**: Migrations ran in lexicographic order, but if "initial" migration came after "alter" migrations, tables wouldn't exist to alter.

**Solution**: Use proper timestamp naming to ensure initial schema runs first:
```
20260124000000_initial_schema/migration.sql (creates all tables)
20260125000001_add_column/migration.sql (alters existing table)
20260125000002_add_enum/migration.sql (further changes)
```

**Prevention**:
- Start timestamps with appropriate dates (earliest = initial)
- Create initial migration with `CREATE TABLE IF NOT EXISTS`
- Test migrations in correct order before deploying

**Files**:
- `prisma/migrations/` directory

---

### Migration Lock File Must Match Schema Provider

**Problem**: Migration failed with error "Migration lock file indicates different provider".

**Root Cause**: `prisma/migrations/migration_lock.toml` specifies a different database provider than `prisma/schema.prisma`.

**Solution**: Ensure consistency:
```toml
# prisma/migrations/migration_lock.toml
provider = "postgresql"  # Must match schema.prisma
```

**Prevention**:
- Don't manually edit migration_lock.toml
- If issues occur, regenerate with `prisma migrate reset` (dev only) or manually verify match

**Files**:
- `prisma/migrations/migration_lock.toml`

---

### Prisma Client Generation Required for Deployment

**Problem**: Deployed application crashed with "Prisma Client not found" in production.

**Root Cause**: Prisma Client wasn't generated during build process, or wasn't available at runtime.

**Solution**: 
1. Run `npx prisma generate` before build
2. Include in `prebuild` script
3. Verify `.prisma/client` directory exists after build

**Prevention**:
- Always include `prisma generate` in build pipeline
- Test locally before deploying
- Monitor build logs for Prisma generation

**Files**:
- `backend/package.json` (prebuild scripts)
- `frontend/package.json` (prebuild scripts)

---

## API Integration

### Strapi API Token Permissions Required

**Problem**: Form submissions appeared in database but not synced to Strapi. API returned silent failures.

**Root Cause**: API token lacked `create` permissions for `puja-sponsorship`, `facility-request`, and `form-submission` content types.

**Solution**: 
1. Go to Strapi Admin Panel → Settings → API Tokens
2. Change token type to "Full access" OR
3. Add explicit `create` permissions for required content types
4. Update token in backend environment variables

**Prevention**:
- Document required permissions in API token setup guide
- Verify permissions when setting up new content types
- Check error responses from CMS API for permission issues

**Files**:
- `backend/src/services/strapi.service.ts` (error logging)
- `docs/deployment/FIX_FORM_SYNC_TO_STRAPI.md`

---

### CMS API URL Must Use HTTPS Without Port

**Problem**: Backend couldn't reach CMS API. Connection failed with connection refused errors.

**Root Cause**: Configuration used `http://cms.vishnumandirtampa.com:1337/api`. Port 1337 is closed to public. Strapi runs internally on 1337 but exposed via Nginx reverse proxy on HTTPS 443 (no port in URL).

**Solution**: Use HTTPS endpoint without port:
```bash
# ❌ Wrong: Uses HTTP and explicit port
CMS_API_URL="http://cms.vishnumandirtampa.com:1337/api"

# ✅ Correct: Uses HTTPS, no port
CMS_API_URL="https://cms.vishnumandirtampa.com/api"
```

**Prevention**:
- Document correct CMS API URL format
- Test connectivity after configuration changes
- Use curl to verify API endpoint is reachable

**Files**:
- `scripts/backend-env-template.txt`
- Backend `.env` file (production)

---

### Form Submissions Require Both API_URL and API_KEY

**Problem**: Form submission worked but then failed intermittently. When one environment variable was missing, forms completely failed.

**Root Cause**: Backend needs both `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_API_KEY` configured. If either was missing, proxy routes failed. Additionally, need `CMS_API_URL` and `CMS_API_TOKEN` for CMS sync.

**Solution**: 
1. Frontend needs all four environment variables:
   - `NEXT_PUBLIC_API_URL` - Backend API URL
   - `NEXT_PUBLIC_API_KEY` - Backend API key
   - `CMS_API_URL` - CMS/Strapi API URL
   - `CMS_API_TOKEN` - CMS/Strapi API token
2. Validate all four in Amplify Console
3. Don't assume "either/or" - need ALL for full functionality

**Prevention**:
- Create validation script: `scripts/validate-frontend-env.sh`
- Document all four variables required in deployment guide
- Check Amplify Console for all variables before deploying

**Files**:
- `scripts/validate-frontend-env.sh`
- `docs/deployment/FRONTEND_ENV_SETUP.md`
- `docs/deployment/AMPLIFY_ENV_VARS.md`

---

### Webhook Signature Verification for Security

**Problem**: Webhooks could be spoofed by anyone. Need to verify webhook genuineness.

**Root Cause**: Webhooks are HTTP POST requests that could be sent from anywhere. Need cryptographic verification.

**Solution**: Verify webhook signature using secret key:
```typescript
// Verify Strapi webhook signature
const signature = req.headers['x-webhook-secret'] as string;
const expected = process.env.STRAPI_WEBHOOK_SECRET || '';
if (signature !== expected) {
  return res.status(401).json({ error: 'Unauthorized' });
}
```

**Prevention**:
- Always verify webhook signatures
- Store webhook secrets securely in environment variables
- Document signature verification requirement

**Files**:
- `frontend/src/app/api/webhooks/strapi/route.ts`
- `backend/src/api/webhooks/resend.routes.ts`

---

## Architecture

### Serverless-First Pattern

**Problem**: Initial architecture considered always-on backend servers, which is expensive and unnecessary for this workload.

**Root Cause**: Not optimized for cost and scalability requirements.

**Solution**: Use serverless architecture:
- **Frontend**: Next.js on AWS Amplify (SSG/ISR with automatic Lambda deployment)
- **API Routes**: Deployed as AWS Lambda functions (pay per invocation)
- **Database**: AWS RDS (can be scaled down for non-peak times)
- **Storage**: AWS S3 (cost-effective for files)

**Prevention**:
- Always prefer serverless for variable-load applications
- Use diagnostic endpoints for troubleshooting
- Monitor Lambda invocation costs

**Files**:
- `frontend/amplify.yml` (build configuration)
- `docs/architecture/architecture-overview.md`

---

### ISR + Webhooks for Real-Time Content Updates

**Problem**: Content updated in CMS, but frontend took 5 minutes to show new version. Users expected real-time updates.

**Root Cause**: ISR cache doesn't automatically invalidate on CMS updates.

**Solution**: Combine ISR with webhook-triggered revalidation:
1. Default 5-minute ISR cache for performance
2. Strapi webhook calls `/api/revalidate` endpoint on publish
3. Content appears within seconds instead of minutes

**Prevention**:
- Implement revalidation endpoint early
- Configure Strapi webhooks during CMS setup
- Document expected delay (webhook trigger + rebuild)

**Files**:
- `frontend/src/app/api/revalidate/route.ts`
- `frontend/src/app/api/webhooks/strapi/route.ts`

---

### Diagnostic Endpoints Critical for Production

**Problem**: When CMS content wasn't displaying, couldn't determine if issue was API connectivity, environment variables, filtering logic, or caching.

**Root Cause**: No visibility into production system state. Needed to add logging after the fact.

**Solution**: Create diagnostic endpoints that report system health:
- `/api/debug/cms` - Tests CMS API connectivity and returns sample data
- `/api/debug/content` - Shows what content is fetched vs filtered
- `/api/debug/env` - Shows which environment variables are available at runtime
- `/api/debug/forms` - Tests form submission backend connectivity

**Prevention**:
- Build diagnostic endpoints from project start
- Make them production-safe (no sensitive data logging)
- Document what each endpoint checks
- Use environment variables to gate verbose logging

**Files**:
- `frontend/src/app/api/debug/` (all diagnostic endpoints)

---

## Troubleshooting Patterns

### "Content exists in Strapi but not showing on frontend"

**Diagnostic Steps**:
1. Check `/api/debug/cms` - Does API return content?
2. Check `/api/debug/content` - Is content filtered out?
3. Check published status - Is content published (not draft)?
4. Check filtering logic - Does content pass date/time filters?
5. Check cache - Has 5 minutes passed or was cache revalidated?
6. Hard refresh - Ctrl+Shift+R to clear browser cache

**Common Causes**:
- Content not published
- Content date/time in past (filtered out)
- Content announcement expired (displayUntil date passed)
- ISR cache showing stale content
- Environment variables not set (CMS_API_URL, CMS_API_TOKEN)

---

### "Environment variables not set in production"

**Diagnostic Steps**:
1. Visit `/api/debug/env` to see what's available at runtime
2. Check Amplify Console → App Settings → Environment Variables
3. Verify variables are set for "All branches" or specific branch
4. Verify `next.config.ts` has explicit `env` configuration
5. Check if variable names have typos (case-sensitive)

**Common Causes**:
- Variables not set in Amplify Console
- Variables set but `next.config.ts` doesn't explicitly pass them
- Typo in variable name (case matters)
- Variables set for wrong branch

---

### "Form submissions failing with CORS errors"

**Diagnostic Steps**:
1. Check browser DevTools → Network → see exact CORS error
2. Check `/api/debug/forms` to verify backend is reachable
3. Verify `NEXT_PUBLIC_API_URL` is set in Amplify
4. Check backend CORS configuration for Amplify domains

**Common Causes**:
- Backend CORS not configured for Amplify domains
- `NEXT_PUBLIC_API_URL` not set
- Backend service not running
- Strict origin checking instead of regex pattern

---

### "Stripe/external service failing to initialize"

**Diagnostic Steps**:
1. Check backend logs for initialization errors
2. Verify service API keys in environment variables
3. Check if service is optional or required
4. See if lazy initialization is implemented

**Common Causes**:
- API key missing and service initializes at module import (crashes backend)
- Service not using lazy initialization
- API key incorrect or expired

---

## Notes

- This document should be updated after completing challenging tasks
- Check for duplicates before adding new learnings
- Keep entries concise but complete
- Include file paths for easy navigation
- Reference CHANGELOG.md entries where applicable
