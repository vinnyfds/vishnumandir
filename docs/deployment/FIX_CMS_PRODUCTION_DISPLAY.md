# Fix CMS Content Display in Production

**Last Updated:** 2026-01-27  
**Status:** Implementation Plan - Follow all steps sequentially

## Overview

This guide provides step-by-step instructions to fix CMS content not displaying on the production frontend at `https://vishnumandirtampa.com`.

## Quick Diagnosis

To quickly determine the issue, visit the debug endpoint:

```bash
# Check CMS connectivity from production
curl https://vishnumandirtampa.com/api/debug/cms

# Response will show:
# - Environment variable status (CMS_API_URL_set, CMS_API_TOKEN_set)
# - Connectivity status for each content type
# - Specific error messages if any
# - Average response time
# - Recommended actions
```

**Expected successful response:**
```json
{
  "environment": {
    "cms_api_url_set": true,
    "cms_api_token_set": true,
    "cms_api_url": "https://cms.vishnumandirtampa.com/api"
  },
  "summary": {
    "total_tests": 6,
    "successful": 6,
    "no_content": 0,
    "errors": 0
  },
  "results": [
    {
      "endpoint": "events",
      "status": "success",
      "httpCode": 200,
      "itemCount": 1,
      "totalCount": 5,
      "responseTimeMs": 245
    }
    // ... other content types ...
  ]
}
```

## Step 1: Verify Environment Variables in AWS Amplify

### Symptom
- All CMS content types show as "no-content" or "error"
- Frontend pages don't display events, announcements, priests, etc.

### Solution

1. **Go to AWS Amplify Console**
   - URL: https://console.aws.amazon.com/amplifyapp/
   - Select app: `vishnumandir` (App ID: `d1rp3bwb0j3dq8`)

2. **Navigate to Environment Variables**
   - Click **App Settings** (left sidebar)
   - Click **Environment variables**

3. **Verify Required Variables Exist**

   | Variable | Expected Value | Type |
   |----------|---|---|
   | `CMS_API_URL` | `https://cms.vishnumandirtampa.com/api` | Server-side |
   | `CMS_API_TOKEN` | Your Strapi API token | Server-side |

4. **If Variables Missing**
   - Click **Manage variables**
   - Add missing variables with correct values
   - Click **Save**
   - Trigger new deployment (see Step 5)

5. **Test After Update**
   - Wait for deployment to complete (5-10 minutes)
   - Visit `/api/debug/cms` endpoint
   - Verify all tests pass

### Troubleshooting

**Error: "API connectivity issues detected"**
- Verify `CMS_API_URL` matches exactly: `https://cms.vishnumandirtampa.com/api`
- Include `/api` suffix
- Use HTTPS, not HTTP
- Do NOT include port number (port 1337 is closed from public)

**Error: "Authentication errors (401/403)"**
- Token is invalid or expired
- See Step 2: Update or regenerate token

## Step 2: Test and Fix CMS API Token

### Symptom
- Debug endpoint shows HTTP 401 (Unauthorized) or 403 (Forbidden)
- Error message: "Invalid token" or "Insufficient permissions"

### Solution - Test Token

```bash
# Test token from your local machine
curl -H "Authorization: Bearer YOUR_TOKEN" \
  'https://cms.vishnumandirtampa.com/api/events?populate=*&pagination[limit]=1'
```

**Response interpretation:**
- **200 OK with data:** ✅ Token is working
- **401 Unauthorized:** ❌ Token is invalid or expired
- **403 Forbidden:** ⚠️ Token lacks permissions

### Solution - Fix Token Permissions

If you get **403 Forbidden**, the token needs Full access:

1. **Access Strapi Admin Panel**
   - URL: https://cms.vishnumandirtampa.com/admin
   - Log in with admin credentials

2. **Navigate to API Tokens**
   - Click **Settings** (left sidebar)
   - Click **API Tokens**
   - Find your token in the list

3. **Edit Token Permissions**
   - Click the token name to edit
   - Look for "Token type" dropdown
   - Change from "Custom" to **"Full access"**
   - Click **Save**

4. **Update Amplify Environment Variable**
   - If token was regenerated, copy the new token value
   - Go to AWS Amplify Console
   - Update `CMS_API_TOKEN` with new value
   - Save and trigger redeploy

5. **Verify Fix**
   - Test with curl again (see above)
   - Visit `/api/debug/cms` endpoint
   - Should show "successful": 6

### Alternative: Regenerate Token

If editing doesn't work:

1. Delete the old token from Strapi Admin
2. Create new token:
   - Click **Create new API Token**
   - Name: `frontend-access`
   - Token type: **"Full access"**
   - Click **Save**
   - Copy token value

3. Update Amplify:
   - Go to AWS Amplify Console
   - Update `CMS_API_TOKEN` with new token
   - Save and trigger redeploy

## Step 3: Verify Content is Published

### Symptom
- Debug endpoint shows "no-content" for some content types
- Some pages are empty but others work

### Solution

1. **Access Strapi Admin Panel**
   - URL: https://cms.vishnumandirtampa.com/admin
   - Log in with admin credentials

2. **Check Each Content Type**

   For each content type (Events, Announcements, Puja Services, Priests, Newsletters):
   
   - Click **Content Manager** (left sidebar)
   - Select content type (e.g., "Event")
   - Verify items exist and show **green "Published"** status
   - If item shows "Draft" or no status, click **Publish** button

3. **For Events Specifically**
   - Check event date/time is in the FUTURE
   - Frontend hides past events by filtering `date > today`
   - If event date is in the past, edit and set future date

4. **For Announcements**
   - Check `displayUntil` date is in the FUTURE
   - Announcements with past `displayUntil` are filtered out

### Content Type Checklist

| Content Type | Required Fields | Location |
|---|---|---|
| **Event** | title, date, startTime (future date) | `/calendar/current-events` |
| **Announcement** | title, displayUntil (future date) | Home page |
| **Puja Service** | title, description | `/religious/puja-services` |
| **Priest** | name, profileImage | `/religious/priests` |
| **Newsletter** | title, month, year, pdfFile | `/calendar/newsletter` |

## Step 4: Clear Frontend Cache (ISR Revalidation)

### Symptom
- Content exists in Strapi and debug endpoint shows success
- But changes don't appear on website after publishing

### Explanation
Frontend uses ISR (Incremental Static Regeneration):
- Pages cache for 5 minutes (300 seconds)
- New content fetches automatically in background
- No manual action needed for most cases

### Solution

**Option A: Wait 5 minutes**
- Changes appear automatically within 5 minutes

**Option B: Manual Redeploy (Immediate)**
1. Go to AWS Amplify Console
2. Click **Deployments** tab
3. Find the latest deployment
4. Click **Redeploy this version**
5. Wait for deployment to complete (5-10 minutes)
6. Visit website - changes should appear immediately

**Option C: Developer Console Check**
1. Open browser developer console (F12)
2. Go to your frontend page
3. Check Network tab for API calls
4. Verify `/api/debug/cms` shows successful results
5. Clear browser cache (Ctrl+Shift+Del) and refresh

## Step 5: Test All Frontend Pages

After fixes are applied, verify content appears:

| Page | Expected Content | URL |
|---|---|---|
| Home | Featured events, announcements | `/` |
| Current Events | All upcoming events | `/calendar/current-events` |
| Educational Events | Events filtered by "Educational" category | `/education/events` |
| Puja Services | All puja services from CMS | `/religious/puja-services` |
| Priests | Priest profiles with images | `/religious/priests` |
| Newsletters | Newsletter archive | `/calendar/newsletter` |

## Common Issues & Solutions

### Issue: "Environment variables not set" or blank

**Cause:** Variables not configured in Amplify before build

**Solution:**
1. Set variables in Amplify Console
2. Trigger new build: Amplify → Deployments → Redeploy
3. Build must happen AFTER variables are set

### Issue: "Network timeout" in debug endpoint

**Cause:** 
- CMS server unreachable
- Network connectivity issue
- Firewall blocking access

**Solution:**
```bash
# Test from your machine
ping cms.vishnumandirtampa.com

# Test HTTPS
curl https://cms.vishnumandirtampa.com/api

# Should respond with 401 or similar (not connection refused)
```

### Issue: "Invalid response structure"

**Cause:** CMS API returned unexpected data format

**Solution:**
1. Verify Strapi version is v5.x
2. Check Strapi server is running
3. Verify `CMS_API_URL` ends with `/api`
4. Check token has "Full access" permissions

### Issue: Some content types work, others don't

**Cause:** Token permissions not set for all content types

**Solution:**
1. Change token type to "Full access" in Strapi
2. This enables all content types automatically
3. No need to individually enable each type

## Debugging Commands

### Test from Local Machine

```bash
# 1. Test CMS API directly
curl -H "Authorization: Bearer YOUR_TOKEN" \
  'https://cms.vishnumandirtampa.com/api/events?populate=*'

# 2. Test from production frontend
curl https://vishnumandirtampa.com/api/debug/cms | jq .

# 3. Test specific content type
curl https://vishnumandirtampa.com/api/debug/cms | jq '.results[] | select(.endpoint=="events")'

# 4. Check response times
curl https://vishnumandirtampa.com/api/debug/cms | jq '.results[] | {endpoint, status, responseTimeMs}'
```

### Check Logs

**Frontend Logs (Amplify CloudWatch):**
1. AWS Amplify Console → Deployments
2. Click latest deployment
3. Click "View logs"
4. Search for "[strapi]" to see API calls

**CMS Logs (Lightsail):**
1. SSH into CMS instance
2. Check PM2 logs: `pm2 logs`
3. Check Strapi logs: `tail -f /var/log/strapi.log`

## Related Documentation

- [AMPLIFY_ENV_VARS.md](./AMPLIFY_ENV_VARS.md) - Environment variable details
- [STRAPI_PERMISSIONS_VERIFICATION.md](./STRAPI_PERMISSIONS_VERIFICATION.md) - Token permission setup
- [CMS_TESTING_VALIDATION.md](./CMS_TESTING_VALIDATION.md) - Complete content testing guide
- [CMS_DATA_FLOW.md](./CMS_DATA_FLOW.md) - Data flow documentation

## Support

If issues persist:
1. Run `/api/debug/cms` endpoint and note the exact error
2. Check AWS CloudWatch logs for detailed errors
3. Verify all environment variables are set correctly
4. Ensure Strapi server is running and accessible
5. Check Strapi token has "Full access" permissions
