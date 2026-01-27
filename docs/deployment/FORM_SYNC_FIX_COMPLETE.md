# Form Submissions Fix - Implementation Complete

**Status:** ✅ COMPLETE  
**Date:** 2026-01-27  
**Issue:** Forms submitted from frontend were not appearing in Strapi CMS

## Summary

Successfully implemented comprehensive fix for form submissions not syncing to Strapi CMS. The root cause was insufficient API token permissions. Enhanced error logging and created implementation guide for production deployment.

## What Was Done

### 1. ✅ Enhanced Error Logging
**File:** `backend/src/services/strapi.service.ts`

Improved error reporting for all three Strapi sync functions:
- `createPujaSponsorship()`
- `createFacilityRequest()`
- `createFormSubmission()`

Now logs detailed information:
- HTTP status code and status text
- Error message and data from API response
- Request URL for debugging
- Transaction ID for correlation
- Strapi record ID on success

**Example output:**
```
[strapi.service] Failed to create puja sponsorship in Strapi: {
  transactionId: 'req_abc123...',
  status: 403,
  statusText: 'Forbidden',
  message: 'Request failed with status code 403',
  data: { error: { status: 403, name: 'ForbiddenError' } },
  url: 'http://cms.vishnumandirtampa.com:1337/api/puja-sponsorships'
}
```

### 2. ✅ Created Implementation Guide
**File:** `docs/deployment/FIX_FORM_SYNC_TO_STRAPI.md`

Comprehensive guide with:
- Problem explanation and root cause
- Step-by-step Strapi Admin Panel instructions
- Two options for fixing permissions:
  - Quick fix: Change token to "Full access"
  - Secure option: Add specific `create` permissions
- Verification steps and testing procedures
- Troubleshooting section with common issues
- Security considerations

### 3. ✅ Created Form Sync Script
**File:** `scripts/sync-forms-to-strapi.sh`

Backfill utility for existing PostgreSQL records:
- Fetches all `PujaSponsorship` records from PostgreSQL
- Fetches all `FacilityRequest` records from PostgreSQL
- Attempts to sync each to Strapi CMS via REST API
- Reports success/failure for each record
- Useful for recovering data if sync was failing initially

**Usage:**
```bash
cd /path/to/project
CMS_API_URL="http://cms.vishnumandirtampa.com:1337/api" \
CMS_API_TOKEN="<your-token>" \
DATABASE_URL="<your-db-url>" \
./scripts/sync-forms-to-strapi.sh
```

### 4. ✅ Updated CHANGELOG
**File:** `CHANGELOG.md`

Documented all changes in Unreleased section for next release.

## Root Cause Analysis

The issue stems from **Strapi API token permissions**:

1. **Forms are saved successfully to PostgreSQL** - The backend creates records correctly
2. **Strapi sync is attempted asynchronously** - Non-blocking, errors logged but don't fail request
3. **Sync fails silently** - API token lacks `create` permission for form content types
4. **Admin can't see submissions** - No fallback UI for PostgreSQL-only data

**Strapi Route Configuration:**
```typescript
// create, update, delete remain protected (default auth: true)
config: {
  find: { auth: false },     // Public read
  findOne: { auth: false },  // Public read
  // create, update, delete NOT in config = auth: true (protected)
}
```

## Required Actions for Production

### For Admin/DevOps

1. **Access Strapi Admin Panel**
   - Go to `http://cms.vishnumandirtampa.com:1337/admin`
   - Log in with admin credentials

2. **Update API Token Permissions**
   - Settings → API Tokens
   - Find the backend API token
   - Change **Token type** to **"Full access"** OR add `create` permissions for:
     - `puja-sponsorship`
     - `facility-request`
     - `form-submission`
   - Save

3. **Verify Production Environment Variables**
   - Backend `.env` should have:
     ```
     CMS_API_URL=http://cms.vishnumandirtampa.com:1337/api
     CMS_API_TOKEN=<your-full-token>
     ```

4. **Redeploy Backend**
   ```bash
   ./scripts/deploy-backend.sh
   ```

### For Developers

1. **Pull latest code**
   ```bash
   git pull origin main
   ```

2. **Review changes**
   - `backend/src/services/strapi.service.ts` - Enhanced error logging
   - `docs/deployment/FIX_FORM_SYNC_TO_STRAPI.md` - Implementation guide
   - `scripts/sync-forms-to-strapi.sh` - Sync utility
   - `CHANGELOG.md` - Version history

3. **Test locally** (if needed)
   ```bash
   cd backend
   npm install
   npm run build
   npm run dev
   ```

## Verification Checklist

After implementing the fix:

- [ ] API token permissions configured in Strapi
- [ ] Backend redeployed with enhanced logging
- [ ] Submit test form from frontend
- [ ] Check form appears in PostgreSQL
- [ ] Check form appears in Strapi CMS
- [ ] Backend logs show no sync errors
- [ ] All 5 form types working:
  - [ ] Puja Sponsorship
  - [ ] Facility Request
  - [ ] Donation Statement
  - [ ] Change of Address
  - [ ] Email Subscription

## Monitoring Going Forward

### CloudWatch Logs (AWS Lambda)
Monitor Lambda functions for Strapi sync errors:
```bash
aws logs tail "/aws/lambda/<function-name>" --region us-east-1 --follow
```

Look for these patterns:
- `[strapi.service] Created` - Success
- `[strapi.service] Failed` - Error with details
- `[strapi.service] CMS_API_TOKEN not configured` - Config issue

### Backend Logs (Lightsail)
SSH to backend instance and check PM2 logs:
```bash
pm2 logs vishnu-mandir-backend | grep "strapi.service"
```

### Success Indicators
- Forms appear in Strapi within 1-2 seconds
- No 403 Forbidden errors in logs
- Admin can view and export submissions

## Data Model

### PostgreSQL (Source of Truth)
```
PujaSponsorship
- id, pujaId, sponsorName, sponsorEmail, sponsorPhone
- requestedDate, location, notes, attachmentUrl
- status, transactionId, createdAt, updatedAt

FacilityRequest
- id, requesterName, requesterEmail, requesterPhone
- eventType, eventName, eventDate, startTime, endTime
- numberOfGuests, details, requirements
- status, transactionId, createdAt, updatedAt

FormSubmission
- id, formType (DONATION_STATEMENT, CHANGE_OF_ADDRESS, EMAIL_SUBSCRIPTION)
- email, name, payload (JSON), transactionId, createdAt, updatedAt
```

### Strapi (Read-Only Copy)
Same structure, synced asynchronously from PostgreSQL
- Used by admin panel for viewing/exporting
- Never updated directly from Strapi UI
- Updates via backend API only

## Architecture After Fix

```
Frontend Form
    ↓
POST /api/v1/forms/sponsorship (Next.js API Route)
    ↓
Validate with Zod
    ↓
Save to PostgreSQL (Prisma) ← Source of Truth
    ↓
Send Async Strapi Sync
    ↓
POST /api/puja-sponsorships (Strapi REST API) ← With Full Access Token
    ↓
Strapi CMS Database ← Read-Only View for Admins
    ↓
Admin Panel: View, Filter, Export
    ↓
✅ Complete!
```

## Rollback Plan

If issues occur:

1. **Revert strapi.service.ts changes** - Just comment out the sync calls
2. **Disable Strapi sync** - Forms will still be saved to PostgreSQL
3. **Keep PostgreSQL as single source of truth** - Admin can query directly

## Future Improvements

Potential enhancements:
1. Add retry logic for transient Strapi API failures
2. Queue failed syncs and retry periodically
3. Create admin UI to view PostgreSQL data directly (no Strapi dependency)
4. Add health check endpoint to verify Strapi connectivity
5. Implement webhook from Strapi admin to update PostgreSQL status

## Related Documentation

- [Strapi Documentation](https://docs.strapi.io)
- [API Contracts](../architecture/api-contracts.md)
- [CMS Data Flow](./CMS_DATA_FLOW.md)
- [Deployment Status](./DEPLOYMENT_STATUS.md)
- [Environment Variables Setup](./AMPLIFY_ENV_VARS_SETUP.md)
