# Deployment Troubleshooting Guide

This document provides solutions to common deployment issues encountered during production deployments.

## Table of Contents

1. [TypeScript Compilation Errors](#1-typescript-compilation-errors)
2. [AWS Amplify Build Errors](#2-aws-amplify-build-errors)
3. [Prisma Database Issues](#3-prisma-database-issues)
4. [Environment Variable Issues](#4-environment-variable-issues)
5. [API Route Issues](#5-api-route-issues)

---

## 1. TypeScript Compilation Errors

### Error: Property 'user' does not exist on type 'Request'

**Symptoms:**
```
Property 'user' does not exist on type 'Request'
```

**Root Cause:** TypeScript doesn't know about the custom `user` property added to Express Request objects.

**Solution:**
1. Ensure `types/express.d.ts` exists and is properly configured
2. Verify `tsconfig.json` includes the types directory:
   ```json
   {
     "compilerOptions": {
       "typeRoots": ["./types", "./node_modules/@types"]
     }
   }
   ```
3. Restart TypeScript server in your IDE

**Prevention:** Always create `types/express.d.ts` when adding custom Request properties.

---

### Error: Type 'string | string[]' is not assignable to type 'string'

**Symptoms:**
```
Type 'string | string[]' is not assignable to type 'string'
Argument of type 'string | string[]' is not assignable to parameter of type 'string'
```

**Root Cause:** Express 5.x changed parameter types - `req.params.id` can be either `string` or `string[]`.

**Solution:**
Use type guards when accessing route parameters:

```typescript
// ❌ Bad
const id = req.params.id;

// ✅ Good
const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

// ✅ Good - In Prisma queries
const event = await prisma.event.findUnique({
  where: { 
    id: Array.isArray(req.params.id) ? req.params.id[0] : req.params.id 
  }
});
```

**Prevention:** Always use type guards for `req.params` access. See `.cursorrules` Section 24.2.

---

### Error: Property 'errors' does not exist on type 'ZodError'

**Symptoms:**
```
Property 'errors' does not exist on type 'ZodError'
```

**Root Cause:** Zod changed from `error.errors` to `error.issues` in newer versions.

**Solution:**
```typescript
// ❌ Bad
catch (error) {
  if (error.errors) { ... }
}

// ✅ Good
catch (error) {
  if (error instanceof z.ZodError) {
    return Response.json(
      { success: false, error: 'Validation failed', errors: error.issues },
      { status: 400 }
    );
  }
}
```

**Prevention:** Always use `error.issues` for Zod errors. See `.cursorrules` Section 24.3.

---

### Error: Invalid API version: '2024-12-18.acacia'

**Symptoms:**
```
Invalid API version: '2024-12-18.acacia'
```

**Root Cause:** Using a future or invalid Stripe API version.

**Solution:**
1. Check [Stripe API Versioning](https://stripe.com/docs/api/versioning) for valid versions
2. Update `lib/stripe.ts`:
   ```typescript
   export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
     apiVersion: '2024-11-20.acacia', // Use valid, current version
   });
   ```

**Prevention:** Always use valid, current Stripe API versions. See `.cursorrules` Section 24.5.

---

## 2. AWS Amplify Build Errors

### Error: Can't find Prisma Client

**Symptoms:**
```
Error: Can't find Prisma Client. Please run: prisma generate
```

**Root Cause:** Prisma Client wasn't generated before TypeScript build.

**Solution:**
1. Ensure `amplify.yml` includes Prisma Client generation:
   ```yaml
   preBuild:
     commands:
       - npm ci
       - npx prisma generate
   ```
2. Or add to `package.json`:
   ```json
   {
     "scripts": {
       "build": "prisma generate && next build",
       "prebuild": "prisma generate"
     }
   }
   ```

**Prevention:** Always generate Prisma Client before building. See `.cursorrules` Section 8.

---

### Error: Environment variables not available

**Symptoms:**
```
process.env.NEXT_PUBLIC_API_URL is undefined
process.env.DATABASE_URL is undefined
```

**Root Cause:** Environment variables not set in AWS Amplify Console.

**Solution:**
1. Go to AWS Amplify Console > App Settings > Environment Variables
2. Add all required variables
3. Rebuild the application

**Important:** 
- Only `NEXT_PUBLIC_*` variables are available in the browser
- Server-side variables (without prefix) are only available in API routes

**Prevention:** Set all environment variables in Amplify Console before first deployment. See `.cursorrules` Section 20.

---

### Error: Build cache issues

**Symptoms:**
```
Module not found: Can't resolve '@/components/...'
Stale dependencies
```

**Root Cause:** Build cache not properly configured or corrupted.

**Solution:**
1. Clear Amplify build cache:
   - Go to Amplify Console > App Settings > Build Settings
   - Clear cache and rebuild
2. Update `amplify.yml` with proper caching:
   ```yaml
   cache:
     paths:
       - node_modules/**/*
       - .next/cache/**/*
   ```

**Prevention:** Configure proper caching in `amplify.yml`. See `.cursorrules` Section 21.

---

## 3. Prisma Database Issues

### Error: SSL connection required

**Symptoms:**
```
Error: SSL connection required. Please specify SSL options
```

**Root Cause:** AWS RDS PostgreSQL requires SSL connections, but DATABASE_URL doesn't include SSL parameters.

**Solution:**
Add `?sslmode=require` to DATABASE_URL:

```bash
# ❌ Bad
DATABASE_URL="postgresql://user:pass@host:5432/db"

# ✅ Good
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"
```

**Prevention:** Always include `?sslmode=require` for production RDS connections. See `.cursorrules` Section 8.

---

### Error: Migration lock file mismatch

**Symptoms:**
```
Error: Migration lock file indicates different provider
```

**Root Cause:** `prisma/migrations/migration_lock.toml` doesn't match schema provider.

**Solution:**
1. Check `prisma/schema.prisma` provider:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
2. Verify `prisma/migrations/migration_lock.toml`:
   ```toml
   provider = "postgresql"
   ```

**Prevention:** Let Prisma manage migration lock file automatically. See `.cursorrules` Section 8.

---

### Error: Cannot seed database - tables don't exist

**Symptoms:**
```
Error: Cannot seed database - tables don't exist
```

**Root Cause:** Tried to seed before running migrations.

**Solution:**
Follow proper deployment order:

```bash
# 1. Generate Prisma Client
npx prisma generate

# 2. Run migrations
npx prisma migrate deploy  # Production
# OR
npx prisma migrate dev     # Development

# 3. Seed database (optional)
npx prisma db seed
```

**Prevention:** Always run migrations before seeding. See `.cursorrules` Section 8.

---

## 4. Environment Variable Issues

### Issue: NEXT_PUBLIC_ variables not available in browser

**Symptoms:**
```
process.env.NEXT_PUBLIC_API_URL is undefined in browser
```

**Root Cause:** Variable not prefixed with `NEXT_PUBLIC_` or not set in Amplify Console.

**Solution:**
1. Ensure variable is prefixed with `NEXT_PUBLIC_`
2. Set in AWS Amplify Console > Environment Variables
3. Rebuild application

**Rule:** Only `NEXT_PUBLIC_*` variables are available in the browser. See `.cursorrules` Section 20.

---

### Issue: Server-side variables undefined in API routes

**Symptoms:**
```
process.env.DATABASE_URL is undefined in API route
```

**Root Cause:** Variable not set in Amplify Console (server-side variables don't need `NEXT_PUBLIC_` prefix).

**Solution:**
1. Set variable in AWS Amplify Console (without `NEXT_PUBLIC_` prefix)
2. Rebuild application
3. Verify variable is available in API route context

**Rule:** Server-side variables (without `NEXT_PUBLIC_` prefix) are only available in API routes. See `.cursorrules` Section 20.

---

## 5. API Route Issues

### Issue: API routes not deploying

**Symptoms:**
```
API routes return 404 in production
```

**Root Cause:** 
- API routes not properly configured
- Build process not including API routes

**Solution:**
1. Verify API routes are in `app/api/` directory
2. Ensure Next.js build includes API routes (they're automatically deployed as Lambda functions)
3. Check Amplify build logs for errors

**Note:** This project uses Next.js API Routes (not static export), so API routes are automatically deployed as Lambda functions by AWS Amplify.

---

### Issue: API route timeout

**Symptoms:**
```
API route times out after 10 seconds
```

**Root Cause:** AWS Lambda has execution time limits.

**Solution:**
1. Optimize API route performance
2. Consider breaking long-running operations into smaller chunks
3. Use background jobs for heavy processing

**Lambda Limits:**
- Default timeout: 3 seconds (can be increased to 30 seconds in Amplify)
- Maximum timeout: 30 seconds (for API routes)

---

## Quick Reference

### Common Fixes

| Issue | Quick Fix |
|-------|-----------|
| TypeScript errors | Run `npm run build` locally, fix all errors |
| Prisma Client missing | Add `npx prisma generate` to build process |
| Environment variables | Set in Amplify Console |
| Database SSL | Add `?sslmode=require` to DATABASE_URL |
| req.params type error | Use type guard: `Array.isArray(req.params.id) ? req.params.id[0] : req.params.id` |
| Zod error handling | Use `error.issues` not `error.errors` |

### Build Order

1. `npm ci` - Install dependencies
2. `npx prisma generate` - Generate Prisma Client
3. `npx prisma migrate deploy` - Run migrations (production)
4. `npm run build` - Build Next.js application
5. Deploy (automatic in Amplify)

---

**Last Updated:** 2026-01-25  
**Related Documentation:**
- `.cursorrules` Section 24: TypeScript Deployment Patterns
- `.cursorrules` Section 25: Deployment Troubleshooting
- `DEPLOYMENT_CHECKLIST.md`: Pre-deployment checklist
