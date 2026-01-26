# Strapi Form Submissions Integration Setup

**Last Updated:** 2026-01-26  
**Status:** Code Implementation Complete - Configuration In Progress

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

After adding the new content types, Strapi needs to be rebuilt:

```bash
# SSH to CMS instance
ssh -i /path/to/vishnumandir-cms.pem ubuntu@3.93.212.154

# Navigate to CMS directory
cd /home/ubuntu/vishnu-mandir-tampa/cms

# Rebuild Strapi to register new content types
npm run build

# Restart Strapi service
pm2 restart strapi-cms
```

### 2. Create Strapi API Token

1. Access Strapi admin panel: `http://cms.vishnumandirtampa.com:1337/admin`
2. Log in with admin credentials
3. Navigate to **Settings** → **API Tokens**
4. Click **Create new API Token**
5. Configure:
   - **Name:** `Backend API Token`
   - **Token duration:** `Unlimited` (or set expiration as needed)
   - **Token type:** `Full access` (or custom permissions for create on the three content types)
6. Click **Save**
7. **Copy the token** (it's only shown once)

### 3. Configure Backend Environment Variable

Add the Strapi API token to the backend instance:

```bash
# SSH to backend instance
ssh -i /path/to/vishnumandir-backend.pem ubuntu@34.206.184.139

# Navigate to backend directory
cd /home/ubuntu/vishnu-mandir-tampa/backend

# Edit .env file
nano .env

# Add or update:
CMS_API_URL="http://cms.vishnumandirtampa.com:1337/api"
CMS_API_TOKEN="your-token-here"

# Restart backend service
pm2 restart backend-api
```

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

### 5. Test Integration

1. Submit a test form from the frontend (e.g., puja sponsorship)
2. Verify entry created in PostgreSQL (existing flow)
3. Check Strapi admin panel: **Content Manager** → **Puja Sponsorships**
4. Verify submission appears in Strapi
5. Check backend logs for Strapi sync messages

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
