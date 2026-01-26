# Strapi Form Submissions Integration Setup

**Last Updated:** 2026-01-26  
**Status:** Code Deployed - Content Types Registered - Backend Configuration In Progress

## Current Status

- ✅ Strapi content types created and registered
- ✅ Backend code deployed with Strapi integration
- ✅ CMS_API_TOKEN configured in backend .env
- ⚠️ Backend service needs DATABASE_PASSWORD to be set in .env
- ⚠️ Strapi content types need to be activated in admin panel (first-time setup)

## Overview

Form submissions from the frontend are now automatically synced to Strapi CMS for viewing in the admin panel. PostgreSQL remains the source of truth, and Strapi provides a user-friendly interface for viewing submissions.

## Implementation Summary

### Code Changes Completed

1. **Strapi Content Types Created:**
   - `puja-sponsorship` - For puja sponsorship form submissions
   - `facility-request` - For facility rental requests
   - `form-submission` - For generic forms (donation statement, change of address, email subscription)

2. **Backend Integration:**
   - Created `backend/src/services/strapi.service.ts` with functions to sync submissions to Strapi
   - Updated form submission routes to call Strapi service after PostgreSQL write
   - Added axios dependency for Strapi API calls
   - Strapi sync is non-blocking (errors logged but don't fail submissions)

3. **Environment Variables:**
   - `CMS_API_URL` - Already configured in backend env template
   - `CMS_API_TOKEN` - Needs to be set (see manual steps below)

## Manual Configuration Required

### 1. Rebuild Strapi CMS

**Status:** ✅ Completed

After adding the new content types, Strapi has been rebuilt and content types are registered. The content types are now available in the Strapi admin panel.

### 2. Create Strapi API Token

**Status:** ✅ Completed

The API token has been created and configured in the backend `.env` file. The token is set and ready for use.

### 3. Configure Backend Environment Variable

**Status:** ✅ Completed

The Strapi API token and URL have been configured in the backend `.env` file. The backend service has been restarted with the updated environment variables.

### 4. Configure Strapi Permissions

Set up role-based permissions in Strapi admin panel:

1. Go to **Settings** → **Users & Permissions plugin** → **Roles**
2. For each role, configure permissions:

**Admin Role:**
- `puja-sponsorship`: Full access (find, findOne, create, update, delete)
- `facility-request`: Full access
- `form-submission`: Full access

**Finance Role:**
- `puja-sponsorship`: Read-only (find, findOne)
- `facility-request`: Read-only
- `form-submission`: Read-only

**Editor Role:**
- No access to form submissions (content management only)

**Event Manager Role:**
- No access to form submissions (event management only)

### 5. Activate Content Types in Strapi Admin

After rebuilding Strapi, the new content types need to be activated:

1. Access Strapi admin panel: `http://cms.vishnumandirtampa.com:1337/admin`
2. Log in with admin credentials
3. Navigate to **Content Manager**
4. You should see the new content types:
   - **Puja Sponsorships**
   - **Facility Requests**
   - **Form Submissions**
5. Click on each content type to view (they may be empty initially)
6. Verify the fields match the schema

### 6. Test Integration

1. Submit a test form from the frontend (e.g., puja sponsorship)
2. Verify entry created in PostgreSQL (existing flow)
3. Check Strapi admin panel: **Content Manager** → **Puja Sponsorships**
4. Verify submission appears in Strapi
5. Check backend logs for Strapi sync messages:
   ```bash
   pm2 logs backend-api | grep strapi
   ```

## How It Works

### Data Flow

```
Frontend Form Submission
    ↓
Backend API (/api/v1/forms/*)
    ↓
PostgreSQL (via Prisma) ← Primary storage
    ↓
Strapi CMS (via REST API) ← View-only copy
```

### Key Features

- **Non-blocking sync:** Strapi sync failures don't affect form submissions
- **PostgreSQL is source of truth:** All data operations use PostgreSQL
- **Strapi for viewing:** Admin users can view submissions in Strapi's user-friendly interface
- **Transaction ID linking:** Each submission has a transaction ID linking PostgreSQL and Strapi entries
- **Postgres ID field:** Strapi entries include `postgresId` field to link back to source record

## Troubleshooting

### Submissions not appearing in Strapi

1. **Check backend logs:**
   ```bash
   pm2 logs backend-api | grep strapi
   ```

2. **Verify environment variables:**
   ```bash
   # On backend instance
   echo $CMS_API_URL
   echo $CMS_API_TOKEN
   ```

3. **Test Strapi API connectivity:**
   ```bash
   curl -H "Authorization: Bearer YOUR_TOKEN" \
        http://cms.vishnumandirtampa.com:1337/api/puja-sponsorships
   ```

4. **Check Strapi content types:**
   - Verify content types exist in Strapi admin panel
   - Ensure content types are published/active

### Strapi sync errors

- Check Strapi API token permissions
- Verify CMS_API_URL is correct and accessible
- Check Strapi service is running
- Review backend logs for specific error messages

## Files Modified

- `cms/src/api/puja-sponsorship/content-types/puja-sponsorship/schema.json` (created)
- `cms/src/api/facility-request/content-types/facility-request/schema.json` (created)
- `cms/src/api/form-submission/content-types/form-submission/schema.json` (created)
- `backend/src/services/strapi.service.ts` (created)
- `backend/src/api/v1/forms.routes.ts` (modified)
- `backend/package.json` (modified - added axios)
- `scripts/backend-env-template.txt` (modified - added CMS_API_TOKEN)

## Next Steps

1. Rebuild Strapi CMS with new content types
2. Create API token in Strapi admin panel
3. Configure backend environment variable
4. Set up role-based permissions in Strapi
5. Test form submission flow
6. Verify submissions appear in Strapi admin panel
