# AWS Amplify Deployment Status

**Date**: 2026-01-26  
**App ID**: `d8s4hpdn0uxuc`  
**App Name**: `vishnu-mandir-frontend`  
**Region**: `us-east-1`  
**Last Updated**: 2026-01-26 03:40 UTC

## ✅ Completed

1. **Amplify App Created**
   - App ID: `d8s4hpdn0uxuc`
   - Platform: `WEB_COMPUTE` (Next.js SSR)
   - Default Domain: `d8s4hpdn0uxuc.amplifyapp.com`
   - IAM Service Role: Configured

2. **Build Configuration Updated**
   - File: `frontend/amplify.yml`
   - Updated to use `pnpm` instead of `npm`
   - Configured for monorepo structure
   - Prisma Client generation from root directory
   - Correct artifact paths for Next.js 16

3. **Environment Variables Configured**
   - `NEXT_PUBLIC_API_URL=http://34.206.184.139:4000/api`
   - `CMS_API_URL=http://44.202.153.84:1337/api`
   - `NEXT_PUBLIC_URL=https://vishnumandirtampa.com`
   - `NEXT_PUBLIC_COGNITO_REGION=us-east-1`
   - `STRIPE_API_VERSION=2024-11-20.acacia`

4. **Setup Scripts Created**
   - `scripts/amplify-setup.sh` - Automated branch and domain setup
   - `docs/deployment/AMPLIFY_SETUP.md` - Complete setup documentation

5. **Branch Created and Connected**
   - Branch: `main` (PRODUCTION)
   - Repository: Connected to GitHub
   - Auto-build: Enabled

6. **Deployment Completed**
   - Job ID: 2 - Status: SUCCEED
   - Build spec: Configured for monorepo with pnpm
   - Environment variables: Configured

7. **Custom Domain Attached**
   - Domain: `vishnumandirtampa.com`
   - Status: AWAITING_APP_CNAME (DNS records need to be updated in Route53)

## Deployment URLs

- **Amplify Default URL**: `https://main.d8s4hpdn0uxuc.amplifyapp.com` or `https://d8s4hpdn0uxuc.amplifyapp.com`
- **Custom Domain**: `https://vishnumandirtampa.com` (pending DNS propagation)

## ⏳ Pending (Requires Manual Steps)

### 1. Update Route53 Records
**Status**: Domain attached, DNS records need to be updated  
**Hosted Zone**: `Z10186528G387OP9KXEZ`

**DNS Records to Add/Update**:
- Apex domain (`vishnumandirtampa.com`): CNAME to `d3lqee0j4vm8q4.cloudfront.net`
- WWW subdomain (`www.vishnumandirtampa.com`): CNAME to `d3lqee0j4vm8q4.cloudfront.net`
- Certificate verification: `_ad920e339c295fc2413305d8dde74fc9.vishnumandirtampa.com. CNAME _5407209bddebfabc67fea0c50bd03f04.jkddzztszm.acm-validations.aws.`

**Command to get current DNS records**:
```bash
aws amplify get-domain-association \
  --app-id d8s4hpdn0uxuc \
  --domain-name vishnumandirtampa.com \
  --region us-east-1 \
  --output json | jq '.domainAssociation.subDomains'
```

### 2. Add Remaining Environment Variables
**Status**: Needs to be done via Amplify Console

**Required Secrets**:
- `DATABASE_URL` (with actual database password)
- `NEXT_PUBLIC_API_KEY` / `API_KEY`
- `COGNITO_USER_POOL_ID` / `COGNITO_CLIENT_ID`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` / `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET`
- `CMS_API_TOKEN`
- `NEXTAUTH_SECRET`

### 3. Verify Website Accessibility
**Status**: Deployment succeeded, but site returns 404

**Current Status**:
- Build: SUCCEED (Job ID: 2)
- Deploy: SUCCEED
- Website: Returns 404 (may need baseDirectory adjustment or time to propagate)

**Troubleshooting**:
- Check if artifacts are in correct location
- Verify Next.js build output structure
- Wait for CloudFront propagation (can take 5-15 minutes)
- Check browser console for errors

**Next Deployment**:
Deployments are automatic on push to `main` branch, or trigger manually:
```bash
aws amplify start-job \
  --app-id d8s4hpdn0uxuc \
  --branch-name main \
  --job-type RELEASE \
  --region us-east-1
```

## 📋 Quick Reference

**App Details**:
- App ID: `d8s4hpdn0uxuc`
- App Name: `vishnu-mandir-frontend`
- Default Domain: `d8s4hpdn0uxuc.amplifyapp.com`
- Custom Domain: `vishnumandirtampa.com` (pending)

**AWS CLI Commands**:
```bash
# Check app status
aws amplify get-app --app-id d8s4hpdn0uxuc --region us-east-1

# List branches (after repository connected)
aws amplify list-branches --app-id d8s4hpdn0uxuc --region us-east-1

# Get domain association (after domain attached)
aws amplify get-domain-association --app-id d8s4hpdn0uxuc --domain-name vishnumandirtampa.com --region us-east-1

# Trigger deployment
aws amplify start-job --app-id d8s4hpdn0uxuc --branch-name main --job-type RELEASE --region us-east-1
```

## 📚 Documentation

- **Setup Guide**: `docs/deployment/AMPLIFY_SETUP.md`
- **Infrastructure**: `docs/deployment/aws-infrastructure.md`
- **Deployment Checklist**: `docs/deployment/DEPLOYMENT_CHECKLIST.md`

## Current Configuration

**Build Spec**: `frontend/amplify.yml`
- Uses pnpm with corepack
- Monorepo structure (frontend directory)
- Prisma Client generation from root
- Artifacts: `frontend/.next`

**Environment Variables Set**:
- `NEXT_PUBLIC_API_URL=http://34.206.184.139:4000/api`
- `CMS_API_URL=http://44.202.153.84:1337/api`
- `NEXT_PUBLIC_URL=https://vishnumandirtampa.com`
- `NEXT_PUBLIC_COGNITO_REGION=us-east-1`
- `STRIPE_API_VERSION=2024-11-20.acacia`
- `AMPLIFY_MONOREPO_APP_ROOT=frontend`

**Still Need to Add** (secrets):
- `DATABASE_URL` (for Prisma Client generation)
- `NEXT_PUBLIC_API_KEY` / `API_KEY`
- `COGNITO_USER_POOL_ID` / `COGNITO_CLIENT_ID`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` / `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET`
- `CMS_API_TOKEN`
- `NEXTAUTH_SECRET`

## Next Steps

1. **Update Route53** with DNS records from Amplify (see above)
2. **Add Remaining Environment Variables** via Amplify Console (secrets listed above)
3. **Verify Website** - Check if 404 resolves after DNS propagation
4. **Monitor Deployments** - Automatic on push to main branch
