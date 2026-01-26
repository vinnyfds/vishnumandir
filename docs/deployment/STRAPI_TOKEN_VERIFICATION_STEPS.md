# Strapi Token Verification Steps

**Last Updated:** 2026-01-26  
**Issue:** API still returning 404 after changing token to Full access

## Critical Steps

### Step 1: Verify Token Value Match

The token value in `.env` must **exactly match** the token value in Strapi:

1. **In Strapi Admin:**
   - Go to Settings → API Tokens
   - Find the "Full Access" token (or token you changed to Full access)
   - Click **"View token"** button
   - Copy the entire token value

2. **Compare with `.env` file:**
   - Open `.env` file
   - Find `CMS_API_TOKEN=...`
   - Compare the value after `=` with the token from Strapi
   - They must match **exactly** (including all characters)

3. **If they don't match:**
   - Update `CMS_API_TOKEN` in `.env` file with the token from Strapi
   - Update `CMS_API_TOKEN` in AWS Amplify Console → Environment Variables
   - Test API again

### Step 2: Restart Strapi Service

After changing token type to "Full access", Strapi may need a restart:

1. **SSH into CMS server:**
   ```bash
   ssh ubuntu@3.93.212.154
   ```

2. **Check Strapi process:**
   ```bash
   pm2 list
   # Look for process named "vishnu-mandir-cms" or similar
   ```

3. **Restart Strapi:**
   ```bash
   pm2 restart vishnu-mandir-cms
   # Or if using different name:
   pm2 restart all
   ```

4. **Wait 30 seconds** for Strapi to fully start

5. **Check logs for errors:**
   ```bash
   pm2 logs vishnu-mandir-cms --lines 20
   ```

6. **Test API again** after restart

### Step 3: Generate New Full Access Token (If Needed)

If token value doesn't match or still doesn't work:

1. **Create new token:**
   - Settings → API Tokens → Create new API Token
   - Name: "Frontend API Token"
   - Token type: **Full access**
   - Token duration: Unlimited
   - Click Save

2. **Copy token value:**
   - Click "View token" immediately after creation
   - Copy the entire token value

3. **Update everywhere:**
   - `.env` file: `CMS_API_TOKEN=<new-token-value>`
   - AWS Amplify Console → Environment Variables → `CMS_API_TOKEN`
   - Save both

4. **Test API:**
   ```bash
   curl -H "Authorization: Bearer <NEW_TOKEN>" \
     'https://cms.vishnumandirtampa.com/api/events?populate=*'
   ```

## Testing

After completing steps above, test:

```bash
./scripts/test-strapi-api.sh
```

**Success:** Returns `{"data":[...]}` or `{"data":[]}`  
**Failure:** Returns `{"data":null,"error":{"status":404}}`

## Common Issues

### Token Value Mismatch

**Symptom:** API returns 404 even with Full access token

**Solution:** Verify token value matches exactly between Strapi and `.env`

### Strapi Not Restarted

**Symptom:** Changed token type but API still 404

**Solution:** Restart Strapi service on server

### Token Not Saved

**Symptom:** Changed token type but dropdown still shows "Custom"

**Solution:** Make sure you clicked "Save" button in Strapi Admin

## Next Steps

If still getting 404 after these steps:
1. Check Strapi server logs for errors
2. Verify content types exist and are published
3. Check Strapi API configuration files
4. Test Public role permissions (without token)
