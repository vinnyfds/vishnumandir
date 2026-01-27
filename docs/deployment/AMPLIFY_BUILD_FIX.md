# Amplify Build Fix - Prisma Client Generation

## Issue Fixed
Deployment was failing because the Amplify build process was not generating Prisma Client before attempting to build Next.js.

## Root Cause
When we added Prisma to the frontend for form submission API routes (`frontend/src/lib/prisma.ts`), the build process was missing the critical step to generate the Prisma Client. Without this step, Next.js couldn't compile because `@prisma/client` module was not available.

## Solution Implemented
Updated `frontend/amplify.yml` to include `npx prisma generate` in the preBuild phase:

```yaml
preBuild:
  commands:
    - npm install -g pnpm
    - pnpm install --frozen-lockfile
    - npx prisma generate  # NEW: Generate Prisma Client before build
build:
  commands:
    - cd frontend && pnpm run build
```

## Build Process Order
The corrected build order is now:
1. Install pnpm globally
2. Install dependencies via pnpm
3. **Generate Prisma Client** ← NEW STEP
4. Build Next.js application
5. Deploy to AWS (API routes as Lambda functions)

## Verification
- ✅ Local test: `npx prisma generate` runs successfully
- ✅ Local test: `pnpm run build` in frontend completes successfully
- ✅ All API routes are properly configured as Lambda functions
- ✅ Changes pushed to GitHub (commit: a5a855e)
- ✅ Next Amplify build should succeed

## Next Steps
1. Monitor Amplify build in AWS Console
2. Verify build logs show successful Prisma generation
3. Confirm deployment completes
4. Test form submissions in production

## Environment Variables Checklist
The following environment variables must be set in Amplify Console for form submissions to work:

- [ ] `DATABASE_URL` - PostgreSQL connection with SSL (`?sslmode=require`)
- [ ] `RESEND_API_KEY` - Email service API key
- [ ] `SENDER_EMAIL_ADDRESS` - Email sender address
- [ ] `ADMIN_EMAIL_ADDRESS` - Admin notification email
- [ ] `CMS_API_URL` - Strapi API endpoint
- [ ] `CMS_API_TOKEN` - Strapi API token

## Files Modified
- `frontend/amplify.yml` - Added Prisma generation step

## Related Issues
- Fixed: Form submission API routes not deployable to Amplify
- Fixed: Deployment failure due to missing Prisma Client

## Troubleshooting
If the build still fails:
1. Check Amplify build logs for error messages
2. Verify Prisma schema at `prisma/schema.prisma` is valid
3. Confirm all dependencies are installed correctly
4. Check that `@prisma/client` is in `frontend/package.json`
