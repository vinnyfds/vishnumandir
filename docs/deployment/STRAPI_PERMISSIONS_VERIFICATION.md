# Strapi API Permissions Verification Guide

**Last Updated:** 2026-01-26  
**Purpose:** Verify and configure Strapi API permissions for frontend content access

## Problem

Content published in Strapi CMS is not appearing on the frontend website. This is usually caused by:

1. **API Token lacking proper permissions** - Token doesn't have `find`/`findOne` access
2. **Public role permissions not configured** - Anonymous API access is blocked
3. **Content not published** - Items saved as draft instead of published
4. **Past event dates** - Events with past dates are filtered out by frontend

## Solution: Verify and Configure Permissions

### Method 1: Check API Token Permissions (Recommended)

This is the fastest and most reliable method.

#### Step 1: Access Strapi Admin Panel

1. Go to https://cms.vishnumandirtampa.com/admin
2. Log in with your credentials
3. Navigate to **Settings** (bottom left gear icon) → **API Tokens**

#### Step 2: Check Token Type

1. Find the API token used for frontend (check `CMS_API_TOKEN` in environment variables)
2. Click the token to edit
3. Look at the **Token type** field

**If Token type is "Full access":**
- ✅ Skip to "Method 2" (verify content is published)
- Full access grants all permissions automatically

**If Token type is "Custom":**
- ⚠️ Permissions may be limited - proceed to Step 3

#### Step 3: Enable Required Permissions (if Custom token)

For Custom token type, enable these permissions for each content type:

**Required Content Types:**
- [ ] Event
- [ ] Announcement  
- [ ] Newsletter
- [ ] Priest
- [ ] Puja Service

**Required Permissions per content type:**
- [ ] `find` - List all items
- [ ] `findOne` - Get single item by ID

**How to enable:**

1. Under each content type section, check boxes for:
   - ✓ **find**
   - ✓ **findOne**
   
   Leave create, update, delete unchecked (frontend only needs read access)

2. Click **Save** button at top right

3. Verify changes saved (should see green success message)

### Method 2: Configure Public Role (Alternative)

If you prefer allowing unauthenticated access (less secure but simpler):

#### Step 1: Access Public Role Permissions

1. In Strapi Admin: Settings → Users & Permissions → Roles
2. Click **Public** (not Authenticated)

#### Step 2: Enable Find Permissions

For each content type (Event, Announcement, Newsletter, Priest, Puja Service):

1. Look for the content type in the permissions list
2. Check boxes for:
   - ✓ **find**
   - ✓ **findOne**

3. Click **Save** at top right

**Note:** This allows anyone to read the CMS API without authentication. Good for public content, but less secure.

### Method 3: Change Custom Token to Full Access

Quickest solution if individual permissions are not visible:

#### Step 1: Edit Token

1. Settings → API Tokens → Click your token
2. Find **Token type** dropdown (currently "Custom")

#### Step 2: Change to Full Access

1. Click dropdown and select **"Full access"**
2. Click **Save** at top right
3. Verify token type changed

**Note:** Full access grants all permissions including create/update/delete. For production, it's better to use Custom token with minimal permissions. But for testing/development, this works fine.

## Verification

### Quick Test: Use Debug Endpoint

Test if permissions are working by accessing the debug endpoint:

```bash
# Local development
curl http://localhost:3000/api/debug/cms

# Production
curl https://vishnumandirtampa.com/api/debug/cms
```

**Expected Response:**
```json
{
  "timestamp": "2026-01-26T...",
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
      "totalCount": 1
    },
    ...
  ]
}
```

### Manual Test: Curl Command

Test a specific endpoint:

```bash
curl -H "Authorization: Bearer YOUR_API_TOKEN" \
  'https://cms.vishnumandirtampa.com/api/events?populate=*'
```

**Expected response:**
- ✅ Status 200 with data: `{"data":[...]}`
- ❌ Status 403: Permission denied (token lacks permissions)
- ❌ Status 404: Token/endpoint not found (invalid token or URL)

### Run Test Script

Use the provided test script for comprehensive validation:

```bash
cd /path/to/project
./scripts/test-cms-frontend-integration.sh
```

This will:
- Test all content type endpoints
- Check response structures
- Report any permission issues
- Suggest fixes

## Troubleshooting

### Error: "Forbidden" or "Permission Denied"

**Solution:**
1. Verify token is correct in environment variables
2. Check token has `find` and `findOne` permissions enabled
3. Try changing token to "Full access" type
4. Restart Strapi server: `pm2 restart vishnu-mandir-cms`

### Error: "Unauthorized" or "Invalid Token"

**Solution:**
1. Verify CMS_API_TOKEN is correct
2. Check token hasn't expired
3. Create new token in Strapi if needed
4. Update environment variables

### Error: "Not Found" on endpoint

**Solution:**
1. Verify endpoint names are correct:
   - events (not event)
   - announcements (not announcement)
   - newsletters (not newsletter)
   - puja-services (not pujaservice or puja_services)
   - priests (not priest)
2. Verify CMS_API_URL is correct (should end with /api)

### Content not showing on frontend despite API working

**Solution:**
1. **Verify content is Published:**
   - Go to Content Manager → Event (or other type)
   - Click the item
   - Look for "Save" vs "Publish" buttons
   - Must click "Publish" to make visible to API
   
2. **Verify future date/time:**
   - Events with past dates are hidden
   - Check event date is today or in future
   - Check event time is in future
   
3. **Verify category matches:**
   - /education/events only shows events with category = "Educational"
   - /calendar/current-events shows all categories
   - Check event category field

4. **Clear ISR cache:**
   - Frontend caches pages for 5 minutes (ISR)
   - New content appears within 5 minutes
   - Or force revalidation by redeploying frontend

## Permissions Matrix

### Public Role (Unauthenticated)

| Content Type | find | findOne | create | update | delete |
|--------------|------|---------|--------|--------|--------|
| Event | ✓ | ✓ | ✗ | ✗ | ✗ |
| Announcement | ✓ | ✓ | ✗ | ✗ | ✗ |
| Newsletter | ✓ | ✓ | ✗ | ✗ | ✗ |
| Priest | ✓ | ✓ | ✗ | ✗ | ✗ |
| Puja Service | ✓ | ✓ | ✗ | ✗ | ✗ |
| Page | ✓ | ✓ | ✗ | ✗ | ✗ |

### API Token Type

| Token Type | Recommended For | Permissions |
|-----------|-----------------|-------------|
| Full access | Development/Testing | All operations |
| Custom | Production/Frontend | Minimal (read-only via find/findOne) |

## Next Steps

1. ✅ Verify permissions using steps above
2. ✅ Run test script to confirm
3. ✅ Create test content in Strapi
4. ✅ Verify content appears on frontend
5. ✅ Check `/api/debug/cms` endpoint
6. ✅ Redeploy frontend if needed

## Related Documentation

- [API Contracts](../architecture/api-contracts.md)
- [CMS Content Display Fix](./FIX_CMS_CONTENT_DISPLAY.md)
- [Strapi Full Access Token Solution](./STRAPI_FULL_ACCESS_TOKEN_SOLUTION.md)
- [Amplify Environment Variables](./AMPLIFY_ENV_VARS.md)
