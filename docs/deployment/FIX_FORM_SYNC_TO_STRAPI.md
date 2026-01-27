# Fix Form Submissions Not Syncing to Strapi CMS

**Status:** Action Required  
**Last Updated:** 2026-01-27

## Problem

Form submissions from the frontend are being saved to PostgreSQL, but they are **NOT appearing in Strapi CMS** for admin viewing. This breaks the admin dashboard workflow.

## Root Cause

The API token used by the backend (`CMS_API_TOKEN`) does NOT have `create` permission for the form submission content types:
- `puja-sponsorship`
- `facility-request`
- `form-submission`

The Strapi routes are configured with `auth: true` for `create` operations, requiring proper permissions.

## Solution

### Step 1: Access Strapi Admin Panel

1. Go to **Strapi Admin Panel**: `http://cms.vishnumandirtampa.com:1337/admin`
2. Log in with admin credentials
3. Navigate to **Settings** (gear icon on left sidebar)

### Step 2: Navigate to API Tokens

1. In Settings, click **API Tokens** (or "API Tokens & Keys" depending on version)
2. You should see a list of existing tokens
3. Find the token with this value: `2abbbec06f6d64146f8b9a77953d381aea3a70b27a3fe950814954738b1c3f11c60a96605fc85fc615d82bdb1844c79a980f1a7bdf5e81e02e1020531cc3443ba1319f05490f88bce2500467955f93fec18d9e41839538ab36a19b5ed11e509aea54b004466ba3492c91102f8a476ccd1c68ce4421166a553ed58a66d007bd87`
   - Or look for a token named something like "backend-api" or "form-sync"

### Step 3: Change Token to "Full Access"

**Option A: Quickest Fix (Recommended)**

1. Click the edit/pencil icon next to the token
2. Find the **"Token type"** dropdown (currently set to "Custom")
3. Change it to **"Full access"**
4. Click **Save** button at the top right
5. The token now has all permissions for all content types

**Option B: Custom Permissions (More Secure)**

If you prefer limited permissions instead of full access:

1. Click the edit/pencil icon next to the token
2. Keep **Token type** as **"Custom"**
3. Look for **"Permissions"** section
4. Find and enable `create` permission for these content types:
   - ✅ `puja-sponsorship` → enable `create`
   - ✅ `facility-request` → enable `create`
   - ✅ `form-submission` → enable `create`
5. You can also enable `read` and `update` for management purposes:
   - `puja-sponsorship` → `read`, `update`
   - `facility-request` → `read`, `update`
   - `form-submission` → `read`
6. Click **Save**

### Step 4: Verify Token Change

1. After saving, verify the token type shows "Full access" (or your custom permissions)
2. You should see a confirmation message

### Step 5: Redeploy Backend

The backend code has already been enhanced with better error logging. Now redeploy it to use the improved logging:

```bash
# Deploy backend to Lightsail instance
./scripts/deploy-backend.sh
```

Or manually:

```bash
# SSH to backend instance
ssh -i /path/to/key ubuntu@api.vishnumandirtampa.com

# Pull latest code
cd /var/www/backend
git pull origin main

# Install dependencies and build
npm ci
npm run build

# Restart service
pm2 restart vishnu-mandir-backend
pm2 save
```

### Step 6: Test the Fix

1. **Submit a test form from the frontend**:
   - Go to `https://vishnumandirtampa.com/forms/puja-sponsorships`
   - Fill in form fields with test data
   - Submit the form
   - You should see a success message with a transaction ID

2. **Check PostgreSQL**:
   - Verify the form appears in the `puja_sponsorships` table

3. **Check Strapi CMS**:
   - Go to Strapi Admin: `http://cms.vishnumandirtampa.com:1337/admin`
   - Navigate to **Content Manager** (left sidebar)
   - Click on **Puja Sponsorship** collection
   - You should see your test submission appearing here

4. **Check Backend Logs**:
   - SSH to backend and check logs:
     ```bash
     pm2 logs vishnu-mandir-backend
     ```
   - You should see a message like:
     ```
     [strapi.service] Created puja sponsorship in Strapi: <transactionId>
     ```
   - If there's an error, it will now show detailed information about what went wrong

### Step 7: Test All Form Types

After the fix works, test each form type:

- ✅ **Puja Sponsorship**: `/forms/puja-sponsorships`
- ✅ **Facility Request**: `/forms/request-facility`
- ✅ **Donation Statement**: `/forms/donation-statement`
- ✅ **Change of Address**: `/forms/change-of-address`
- ✅ **Email Subscription**: `/forms/email-subscription`

For each, verify:
1. Form submits successfully
2. Admin receives confirmation email
3. Entry appears in Strapi CMS
4. Backend logs show successful sync

## Verification Checklist

- [ ] API token changed to "Full access" (or custom permissions added)
- [ ] Backend redeployed with new error logging
- [ ] Test form submitted successfully
- [ ] Form data appears in PostgreSQL
- [ ] Form data appears in Strapi CMS
- [ ] Backend logs show no sync errors
- [ ] All 5 form types tested and working

## If Still Not Working

If forms still don't appear in Strapi after these steps, check:

1. **Verify Environment Variables**:
   - CMS_API_URL should be: `http://cms.vishnumandirtampa.com:1337/api`
   - CMS_API_TOKEN should be the full token value

2. **Check Backend Logs**:
   ```bash
   pm2 logs vishnu-mandir-backend | grep "strapi.service"
   ```
   Look for error messages that indicate:
   - 401 Unauthorized → Token invalid or expired
   - 403 Forbidden → Token lacks permissions
   - 404 Not Found → Endpoint doesn't exist
   - Connection timeout → CMS server unreachable

3. **Test Strapi API Directly**:
   ```bash
   CMS_API_URL="http://cms.vishnumandirtampa.com:1337/api"
   CMS_API_TOKEN="<your-token>"
   
   curl -X POST \
     -H "Authorization: Bearer $CMS_API_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"data":{"sponsorName":"Test","sponsorEmail":"test@example.com","pujaId":"test","pujaServiceName":"Test","requestedDate":"2026-01-27T00:00:00Z","status":"pending","transactionId":"test123","postgresId":"pg123"}}' \
     "$CMS_API_URL/puja-sponsorships"
   ```
   
   - If it works, you'll see: `{"data":{"id":<number>,...}}`
   - If permission error, you'll see: `{"error":{"status":403,"name":"ForbiddenError",...}}`

4. **Restart Strapi**:
   ```bash
   # SSH to CMS instance
   ssh -i /path/to/key ubuntu@cms.vishnumandirtampa.com
   
   # Restart Strapi service
   pm2 restart vishnu-mandir-cms
   pm2 logs vishnu-mandir-cms
   ```

## Backfill Existing Data (Optional)

If there are already forms in PostgreSQL that didn't sync to Strapi, run this script to sync them:

```bash
./scripts/sync-forms-to-strapi.sh
```

This script will query PostgreSQL for all puja-sponsorship and facility-request records and sync them to Strapi.

## Expected Data Flow After Fix

```
Frontend Form Submission
    ↓
POST /api/v1/forms/sponsorship (Next.js API Route)
    ↓
Validate & Save to PostgreSQL (Prisma)
    ↓
Async: Call Strapi API to create entry
    ↓
✅ Strapi CMS now shows the submission
    ↓
Admin can view and manage submissions
```

## Documentation References

- [Strapi API Documentation](https://docs.strapi.io)
- [Backend Strapi Service](../../backend/src/services/strapi.service.ts)
- [Form Routes](../../backend/src/api/v1/forms.routes.ts)
- [CMS Data Flow](./CMS_DATA_FLOW.md)
- [Deployment Status](./DEPLOYMENT_STATUS.md)
