# CMS Content Troubleshooting Guide

## Quick Checklist

Use this checklist to diagnose why CMS content isn't appearing on the frontend:

- [ ] Content exists in Strapi (visit `/admin` and check)
- [ ] Content is **PUBLISHED** (not just saved as draft)
- [ ] Content passes filters (events are future, announcements not expired)
- [ ] CMS API is reachable (visit `/api/debug/cms`)
- [ ] Environment variables are set in Amplify
- [ ] Less than 5 minutes have passed (ISR cache refresh)
- [ ] Checked browser cache (hard refresh with Ctrl+Shift+R)

## Common Issues & Solutions

### Issue 1: "Content exists in Strapi but not showing on frontend"

**Diagnosis:**

1. Visit `https://yourdomain.com/api/debug/cms`
2. Look at `results` → find the content type (e.g., `announcements`)
3. Check `status`: should be `"success"` with `itemCount > 0`

**Possible Causes:**

#### 1a. Content is not Published

**Symptoms:**
- `/api/debug/cms` shows `itemCount: 0` but Strapi has content
- Content exists but marked as "Draft"

**Fix:**
1. Go to Strapi Admin Panel
2. Find your content (e.g., Announcements)
3. Click the content item
4. Find "Publish" button (top right)
5. Click "Publish"
6. Wait 5 minutes or call `/api/revalidate` to refresh cache

#### 1b. Environment Variables Not Set

**Symptoms:**
- `/api/debug/cms` shows `cms_api_token_set: false`
- API calls fail with 401 Unauthorized

**Fix:**
1. Go to AWS Amplify Console → App Settings → Environment Variables
2. Verify these variables are set:
   - `CMS_API_URL=https://cms.vishnumandirtampa.com/api`
   - `CMS_API_TOKEN=<your-api-token-here>`
3. Redeploy/rebuild the application
4. Wait for deployment to complete
5. Hard refresh browser (Ctrl+Shift+R)

#### 1c. Content Filtered by Dates

**Symptoms:**
- Events don't appear on home page
- Announcements don't appear on home page
- `/api/debug/cms` shows content exists

**Fix:** Check content filters

**For Events:**
- Event must have a **future date** AND **future time**
- Combine date and startTime to determine if event is in the future
- Example: Jan 28, 2026 at 3:00 PM is future if today is Jan 28, 2026 at 2:00 PM

**For Announcements:**
- Announcement must have `displayUntil` set to **null** OR a **future date**
- If `displayUntil` is in the past, announcement is hidden
- Check Strapi: Announcements → click item → look for `displayUntil` field

**Verify with:**
1. Visit `https://yourdomain.com/api/debug/content`
2. Look at `details → announcements → raw` or `details → events → raw`
3. Check `displayUntil` dates or event `date` and `startTime`
4. Compare with today's date shown at bottom

**How to fix in Strapi:**
1. Edit the content
2. Change date/time to future OR
3. Set `displayUntil` to a future date OR
4. Clear `displayUntil` (set to empty) for announcements
5. Publish changes
6. Call revalidation or wait 5 minutes

### Issue 2: "Content appeared then disappeared"

**Symptoms:**
- Changed event date from Jan 27 → Jan 28, content appeared
- Changed event date back to Jan 27, content stayed visible
- Content is stale/cached

**Cause:** ISR cache showing old version

**Fix:** Trigger cache revalidation

**Option A: Manual Revalidation**
```bash
curl -X POST "https://yourdomain.com/api/revalidate?secret=YOUR_SECRET&path=/"
```

**Option B: Wait 5 minutes** - Cache automatically refreshes

**Option C: Redeploy**
1. Go to AWS Amplify Console
2. Click "Deployments"
3. Click "Redeploy this version"
4. Wait for deployment to complete

### Issue 3: "Content appears on one page but not another"

**Symptoms:**
- Event appears in `/api/debug/cms` but not on home page
- Event appears on `/calendar/current-events` but not home
- Announcement appears on `/calendar/announcements` but not home

**Cause:** Different pages use different filters or fetch strategies

**Content Display Locations:**

**Events:**
- `/` (home) - Shows featured events (future only, limited to 6)
- `/calendar/current-events` - Shows all future events
- `/education/events` - Shows educational events only
- Condition: `isFutureEvent()` - date AND time must be future

**Announcements:**
- `/` (home) - Shows current announcements only (displayUntil must be null or future)
- `/calendar/announcements` - Shows ALL announcements (current + past)
- Condition: `displayUntil` - must be null OR in future

**Fix:**
1. Verify content exists in `/api/debug/cms`
2. Check `/api/debug/content` for filtering details
3. Confirm content passes appropriate filter for the page
4. Manually revalidate if needed

### Issue 4: "API is unreachable"

**Symptoms:**
- `/api/debug/cms` shows error
- Response time is very slow (>10 seconds)
- Error mentions timeout or connection refused

**Cause:** CMS server unreachable from frontend

**Fix:**

1. **Verify CMS_API_URL is correct:**
   ```
   CMS_API_URL should be: https://cms.vishnumandirtampa.com/api
   ```

2. **Check CMS is running:**
   - Visit `https://cms.vishnumandirtampa.com/admin` in browser
   - If not accessible, Strapi server is down

3. **Check network connectivity:**
   - Frontend may not have network access to CMS
   - Contact AWS/infrastructure team

4. **Verify CMS_API_TOKEN is valid:**
   - Go to Strapi Admin → Settings → API Tokens
   - Check token hasn't expired
   - Regenerate if expired
   - Update in Amplify environment variables

## Advanced Troubleshooting

### Enable Debug Logging

**For Development:**
```bash
# Set NODE_ENV to development to see verbose logs
export NODE_ENV=development
```

**Check terminal output:**
- Look for `[strapi]` logs showing raw API responses
- Look for `[HomePage]` logs showing fetch and filter results

### Test Each Layer

**Layer 1: CMS API**
```bash
curl "https://cms.vishnumandirtampa.com/api/announcements?populate=*" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Layer 2: Frontend Fetching**
```
Visit https://yourdomain.com/api/debug/cms
Shows: Total items in each content type
```

**Layer 3: Frontend Display**
```
Visit https://yourdomain.com/api/debug/content
Shows: Raw data + filtered data + reasons for filtering
```

### Check ISR Cache Status

**How long until cache refreshes:**
- Pages cache for 5 minutes (`revalidate = 300`)
- If you changed content, cache will refresh automatically in 5 minutes
- OR manually trigger with `/api/revalidate` endpoint

**Check which content appears where:**
- Home page (`/`) fetches announcements and events
- Announcement archive (`/calendar/announcements`) fetches ALL announcements
- Different filters apply to different pages

## Verification Workflow

### After Adding New Content

1. **In Strapi Admin:**
   - ✅ Create content item
   - ✅ Fill in all required fields
   - ✅ Set dates correctly (future for events)
   - ✅ Click "Save" then "Publish"

2. **Verify in API:**
   - Visit `/api/debug/cms`
   - Look for your content type (e.g., `announcements`)
   - `status` should be `"success"`
   - `itemCount` should be > 0

3. **Verify in Content Debug:**
   - Visit `/api/debug/content`
   - Find your content in `details.announcements.raw` or `details.events.raw`
   - Check filters applied to it
   - Verify it's in the correct section (current vs expired)

4. **Check Frontend:**
   - Visit home page (`/`)
   - Or visit appropriate page for content type
   - Content should appear (or within 5 minutes)

### After Changing Content

1. **Make change in Strapi** (update date, title, etc.)
2. **Click "Save" and "Publish"**
3. **Immediately revalidate cache:**
   ```bash
   curl -X POST "https://yourdomain.com/api/revalidate?secret=YOUR_SECRET&path=/"
   ```
4. **Hard refresh browser** (Ctrl+Shift+R)
5. Content should appear within seconds

### If Content Still Missing

1. Check `/api/debug/cms` - Is API working?
2. Check `/api/debug/content` - Is content filtered out?
3. Check Strapi Admin - Is content published?
4. Check dates - Are they correctly set?
5. Check environment variables - Are they correct?
6. Manual cache revalidation or full redeploy

## Performance Tips

- **Check ISR cache frequently** - Pages are cached for 5 minutes
- **Set up Strapi webhooks** - Automatic cache revalidation when content changes
- **Test in production** - Use `/api/debug/*` endpoints to diagnose issues
- **Monitor Amplify logs** - Check CloudWatch for errors

## Support Information

**When reporting an issue, include:**
- What content type (announcement, event, etc.)
- What page it should appear on
- Screenshot of Strapi showing the content
- Output of `/api/debug/cms`
- Output of `/api/debug/content`
- Timestamp when issue occurred

## References

- Diagnostic Endpoints: `/api/debug/cms`, `/api/debug/content`, `/api/debug/forms`
- Cache Revalidation: `/api/revalidate?secret=SECRET&path=/`
- Strapi Webhook: `/api/webhooks/strapi`
- Cache Invalidation Guide: `docs/deployment/CACHE_INVALIDATION.md`
