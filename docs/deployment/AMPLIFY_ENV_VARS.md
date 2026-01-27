# Amplify Environment Variables Configuration

**App ID:** `d1rp3bwb0j3dq8`  
**App Name:** `vishnumandir`  
**Last Updated:** 2026-01-27

## Status

✅ **Environment variables have been successfully configured in Amplify** as of 2026-01-27.
- `CMS_API_URL`: Configured
- `CMS_API_TOKEN`: Configured with proper permissions

## Required Environment Variables

Set these in AWS Amplify Console > App Settings > Environment Variables

### Database (NO LONGER NEEDED IN FRONTEND)

⚠️ **As of 2026-01-27: Prisma has been removed from the frontend.** Database operations now go through the Express backend only.

- **`DATABASE_URL`** - No longer required for frontend deployment
  - Backend services still require this for database connections
  - Not needed for Amplify frontend build

### Backend API

- **`NEXT_PUBLIC_API_URL`** (Client-side)
  - Value: `http://34.206.184.139:4000/api`
  - Or use domain: `http://api.vishnumandirtampa.com/api` (if DNS configured)

### Payment Gateway (Stripe)

- **`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`** (Client-side)
  - Your Stripe publishable key (starts with `pk_`)

- **`STRIPE_SECRET_KEY`** (Server-side only)
  - Your Stripe secret key (starts with `sk_`)

- **`STRIPE_WEBHOOK_SECRET`** (Server-side only)
  - Your Stripe webhook secret (starts with `whsec_`)

- **`STRIPE_API_VERSION`** (Optional)
  - Value: `2024-11-20.acacia` (or latest valid version)

### Authentication (AWS Cognito)

- **`COGNITO_USER_POOL_ID`** (Server-side only)
  - Value: `us-east-1_N3Kxkj933`
  - User Pool: `vishnu-mandir-admin-pool`

- **`COGNITO_CLIENT_ID`** (Server-side only)
  - Value: `343pre3iphtlr0od4bkl1n78ar`
  - Client: `vishnu-mandir-frontend-client`

- **`NEXT_PUBLIC_COGNITO_REGION`** (Client-side)
  - Value: `us-east-1`

### Content Management System (Strapi)

- **`CMS_API_URL`** (Server-side only)
  - Value: `https://cms.vishnumandirtampa.com/api`
  - **Note:** SSL certificate is configured. Use HTTPS (no port number needed)
  - **Important:** Port 1337 is closed from public access. All access must go through HTTPS on port 443 via nginx reverse proxy

- **`CMS_API_TOKEN`** (Server-side only)
  - Generate from Strapi Admin Panel: Settings → API Tokens → Create new API Token
  - **Critical:** After creating the token, you MUST configure permissions:
    - Edit the token → Enable `find` and `findOne` for each content type (Event, Puja Service, Priest, Newsletter, Announcement)
    - Without these permissions, API calls will return 404 errors
    - See `docs/deployment/STRAPI_API_PERMISSIONS_FIX.md` for detailed instructions

### Application

- **`NEXT_PUBLIC_URL`** (Client-side)
  - Will be set after first deployment: `https://main.d1rp3bwb0j3dq8.amplifyapp.com`
  - Or custom domain: `https://vishnumandirtampa.com` (after domain attachment)

- **`NEXT_PUBLIC_API_KEY`** (Client-side, optional)
  - If needed for public API endpoints (same as backend API_KEY)

## Setting Environment Variables

### Via AWS Console

1. Go to AWS Amplify Console
2. Select app: `vishnumandir` (d1rp3bwb0j3dq8)
3. Go to **App Settings** → **Environment Variables**
4. Click **Manage variables**
5. Add each variable with its value
6. Click **Save**

### Via AWS CLI

```bash
aws amplify update-branch \
  --app-id d1rp3bwb0j3dq8 \
  --branch-name main \
  --environment-variables \
    DATABASE_URL="postgresql://..." \
    NEXT_PUBLIC_API_URL="http://34.206.184.139:4000/api" \
    NEXT_PUBLIC_COGNITO_REGION="us-east-1" \
  --region us-east-1
```

## Critical Variables for Build

**Minimum required for build to succeed:**
- *(None - Frontend build no longer requires DATABASE_URL or Prisma)*

**Recommended for deployment to work correctly:**
- `NEXT_PUBLIC_API_URL` - Backend API URL for form submissions
- `NEXT_PUBLIC_COGNITO_REGION` - For admin authentication
- `CMS_API_URL` - For CMS content display (announcements, events, etc.)
- `CMS_API_TOKEN` - For accessing CMS API
- `NEXT_PUBLIC_URL` - Can be updated after deployment

**Currently Configured in Amplify (as of 2026-01-27):**
- ✅ `CMS_API_URL`: Configured
- ✅ `CMS_API_TOKEN`: Configured

## Troubleshooting

### CMS Content Not Showing on Frontend

**Symptoms:**
- Events/Announcements not displaying on website
- `/api/debug/cms` endpoint shows errors
- Test script shows "Failed" for CMS endpoints

**Solutions:**

1. **Verify CMS_API_TOKEN has permissions:**
   ```bash
   # Test the token with curl
   curl -H "Authorization: Bearer YOUR_TOKEN" \
     'https://cms.vishnumandirtampa.com/api/events?populate=*'
   ```
   - If response is 403 (Forbidden): Token lacks permissions
   - If response is 401 (Unauthorized): Token is invalid
   - If response is 200 with data: Token is working ✓

2. **Fix token permissions:**
   - Go to Strapi Admin: Settings → API Tokens
   - Click your token to edit
   - Change "Token type" from "Custom" to **"Full access"**
   - Click Save
   - See [STRAPI_PERMISSIONS_VERIFICATION.md](./STRAPI_PERMISSIONS_VERIFICATION.md) for detailed steps

3. **Verify environment variables in Amplify:**
   - Go to AWS Amplify Console → vishnumandir → App Settings → Environment Variables
   - Verify `CMS_API_URL` = `https://cms.vishnumandirtampa.com/api`
   - Verify `CMS_API_TOKEN` is set
   - If missing, add them and redeploy

4. **Check content is published:**
   - Go to Strapi Admin: Content Manager → Event (or other type)
   - Click each item
   - Ensure you click "Publish" (not just "Save")
   - Check event date/time is in the future (past events are hidden)

5. **Clear ISR cache:**
   - Frontend pages cache for 5 minutes (ISR)
   - New content appears automatically within 5 minutes
   - Or redeploy frontend to force refresh

### Test CMS Connectivity

Use the debug endpoint to test from production:

```bash
# Test from deployed frontend
curl https://vishnumandirtampa.com/api/debug/cms

# Should return JSON with:
# - "summary.successful": number > 0
# - "summary.errors": 0
# - Each content type status should be "success"
```

Use the test script from local:

```bash
cd /path/to/project
./scripts/test-cms-frontend-integration.sh
```

### Build Failures Related to Environment Variables

**Error:** "DATABASE_URL is not set" or similar

**Solution:**
1. Ensure all required variables are set in Amplify Console
2. Variables must be set BEFORE starting a new build
3. After setting variables, trigger a new build:
   - Go to AWS Amplify Console
   - Select the app
   - Click "Deployments" tab
   - Click "Redeploy this version"

### ISR Cache Issues

**Problem:** Changes made to Strapi don't appear on website immediately

**Explanation:**
- Frontend pages use ISR (Incremental Static Regeneration)
- Pages cache for 5 minutes (300 seconds)
- New content is fetched automatically in background

**Solutions:**
1. **Wait 5 minutes:** Content will appear automatically
2. **Redeploy frontend:** Force rebuild to refresh all pages
3. **Use debug endpoint:** Check if CMS API is returning data

### Notes

- Variables prefixed with `NEXT_PUBLIC_` are available in the browser
- Variables without `NEXT_PUBLIC_` prefix are server-side only (API routes)
- Never commit actual values to Git
- Update `NEXT_PUBLIC_URL` after domain is attached to Amplify app
- For CMS configuration issues, see [STRAPI_PERMISSIONS_VERIFICATION.md](./STRAPI_PERMISSIONS_VERIFICATION.md)
