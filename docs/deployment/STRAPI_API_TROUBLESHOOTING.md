# Strapi API Troubleshooting Guide

**Last Updated:** 2026-01-26  
**Status:** Active Issue - API Returning 404

## Current Issue

The Strapi API is returning `404 Not Found` for all content type endpoints:
- `/api/events` → 404
- `/api/puja-services` → 404
- `/api/priests` → 404
- `/api/announcements` → 404
- `/api/newsletters` → 404

## Verification Steps

### Step 1: Verify Content Type Names in Strapi

The API endpoint must match the exact content type name in Strapi:

1. **Access Strapi Admin:** `https://cms.vishnumandirtampa.com/admin`
2. **Check Content Types:**
   - Go to Content Manager
   - Look at the left sidebar - note the exact names (singular vs plural)
   - Common names: `Event`, `Puja Service`, `Priest`, `Announcement`, `Newsletter`
3. **API Endpoint Format:**
   - Content type `Event` → API endpoint: `/api/events` (pluralized)
   - Content type `Puja Service` → API endpoint: `/api/puja-services` (kebab-case, pluralized)

### Step 2: Verify API Token Permissions

1. **Access API Tokens:**
   - Settings → API Tokens
   - Find your token (matches `CMS_API_TOKEN` in `.env`)
   - Click edit/pencil icon

2. **Check Permissions Section:**
   - Look for each content type listed
   - For each content type, verify:
     - ✅ `find` is checked/enabled
     - ✅ `findOne` is checked/enabled
   - **Important:** Make sure you click **Save** after enabling permissions

3. **Verify Token Type:**
   - Token type should be `Full access` OR `Custom` with specific permissions
   - If `Read-only`, it should still work for `find` and `findOne`

### Step 3: Verify Public Role Permissions (Alternative)

If using Public role instead of API token:

1. **Access Public Role:**
   - Settings → Users & Permissions Plugin → Roles → Public
   - Click edit/pencil icon

2. **Check Permissions:**
   - Under each content type (Event, Puja Service, etc.)
   - Enable `find` and `findOne`
   - Click **Save**

### Step 4: Test API Directly

After configuring permissions, test with curl:

```bash
# Replace <TOKEN> with your actual CMS_API_TOKEN
curl -H "Authorization: Bearer <TOKEN>" \
  'https://cms.vishnumandirtampa.com/api/events?populate=*'
```

**Expected Response (Success):**
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "Event Title",
        "category": "Educational",
        ...
      }
    }
  ],
  "meta": { ... }
}
```

**Current Response (Error):**
```json
{
  "data": null,
  "error": {
    "status": 404,
    "name": "NotFoundError",
    "message": "Not Found"
  }
}
```

## Common Issues

### Issue 1: Permissions Not Saved

**Symptom:** Configured permissions but still getting 404

**Solution:**
- Make sure you clicked **Save** after enabling permissions
- Refresh the Strapi admin page and verify permissions are still enabled
- Try logging out and back into Strapi admin

### Issue 2: Wrong Content Type Name

**Symptom:** API endpoint doesn't match Strapi content type

**Solution:**
- Check exact content type name in Content Manager
- Strapi pluralizes content types automatically:
  - `Event` → `/api/events`
  - `Puja Service` → `/api/puja-services` (spaces become hyphens)
- Verify the API endpoint matches the pluralized, kebab-case version

### Issue 3: API Token Mismatch

**Symptom:** Token in `.env` doesn't match token in Strapi

**Solution:**
- Verify `CMS_API_TOKEN` in `.env` matches the token value in Strapi
- Generate a new token if needed:
  1. Settings → API Tokens → Create new API Token
  2. Set permissions
  3. Copy the token value
  4. Update `CMS_API_TOKEN` in `.env` and AWS Amplify

### Issue 4: Strapi Version Differences

**Symptom:** Permissions configured but still 404

**Solution:**
- Strapi v5 has different permission structure than v4
- Make sure you're configuring permissions in the correct location:
  - **API Tokens:** Settings → API Tokens → Edit token → Permissions tab
  - **Public Role:** Settings → Users & Permissions Plugin → Roles → Public → Permissions

## Testing Checklist

- [ ] Content type names verified in Strapi Content Manager
- [ ] API token permissions configured (find + findOne for each content type)
- [ ] Permissions saved in Strapi admin
- [ ] API token value matches `CMS_API_TOKEN` in `.env`
- [ ] Tested API endpoint with curl (returns data, not 404)
- [ ] Verified content is published (has `publishedAt` date)

## Next Steps

1. **Verify content type names** in Strapi Content Manager
2. **Double-check API token permissions** are saved
3. **Test API endpoint** with curl command above
4. **If still 404:** Check Strapi logs on the server for more details

## Server-Side Debugging

If you have SSH access to the CMS server:

```bash
# Check Strapi logs
pm2 logs vishnu-mandir-cms

# Or if using systemd
journalctl -u strapi -f
```

Look for permission-related errors or 404 errors in the logs.
