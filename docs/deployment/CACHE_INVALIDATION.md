# Cache Invalidation Guide

## Overview

Next.js uses **Incremental Static Regeneration (ISR)** to cache pages and API responses. By default, pages cache for 5 minutes (`revalidate = 300`). When content changes in Strapi, the frontend cache doesn't automatically update—you need to manually trigger revalidation.

This guide explains how to invalidate the cache when content changes.

## Problem Statement

**Before Fix:**
- Change event date in Strapi from Jan 28 (future) to Jan 27 (past)
- Event filters it out (past date)
- BUT frontend cache still shows the old event (cache shows stale HTML)
- User sees content that should be hidden
- Must wait 5 minutes for cache to expire OR manually clear it

**After Fix:**
- Use revalidation endpoint or Strapi webhook
- Cache clears immediately
- New/updated content appears within seconds
- Deleted/expired content disappears immediately

## Solution 1: Manual Revalidation API (Recommended for Testing)

### Endpoint

```
POST /api/revalidate?secret=YOUR_SECRET&path=/calendar/announcements
```

### Setup

1. **Set environment variable** in Amplify Console:
   ```
   REVALIDATION_SECRET=your-secure-random-string
   ```
   Generate a secure secret:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Usage Examples:**
   ```bash
   # Revalidate specific page
   curl -X POST "https://yourdomain.com/api/revalidate?secret=YOUR_SECRET&path=/calendar/announcements"

   # Revalidate home page
   curl -X POST "https://yourdomain.com/api/revalidate?secret=YOUR_SECRET&path=/"

   # Revalidate multiple pages
   curl -X POST "https://yourdomain.com/api/revalidate?secret=YOUR_SECRET&path=/calendar"
   ```

3. **Response:**
   ```json
   {
     "success": true,
     "message": "Cache revalidated for path: /calendar/announcements",
     "revalidatedPath": "/calendar/announcements",
     "timestamp": "2026-01-28T18:02:45.033Z"
   }
   ```

### When to Use

- **Testing:** Verify content updates work immediately
- **Emergency:** Quickly remove stale/sensitive content
- **On-Demand:** After major content changes

### Error Handling

**Invalid Secret:**
```json
{
  "success": false,
  "error": "Invalid or missing revalidation secret"
}
```

**Missing Path:**
```json
{
  "success": false,
  "error": "Path parameter required (e.g., ?path=/calendar/announcements)"
}
```

## Solution 2: Strapi Webhook Integration (Recommended for Production)

### Setup

1. **Set environment variable** in Amplify Console:
   ```
   STRAPI_WEBHOOK_SECRET=your-webhook-secret
   ```

2. **Configure Strapi webhook:**
   - Go to Strapi Admin Panel → Settings → Webhooks
   - Click "Create new webhook"
   - Fill in:
     - **Name:** "Frontend Revalidation"
     - **URL:** `https://yourdomain.com/api/webhooks/strapi`
     - **Events to trigger:** Publish, Unpublish, Update
     - **Headers:**
       - Name: `X-Webhook-Secret`
       - Value: `your-webhook-secret` (same as STRAPI_WEBHOOK_SECRET)
   - Save webhook

3. **Supported Content Types:**
   - `announcement` → Revalidates `/`, `/calendar/announcements`, `/calendar`
   - `event` → Revalidates `/`, `/calendar/current-events`, `/calendar`
   - `newsletter` → Revalidates `/calendar/newsletter`, `/calendar`
   - `puja-service` → Revalidates `/religious/puja-services`
   - `priest` → Revalidates `/religious/priests`
   - `puja-schedule` → Revalidates `/religious/puja-schedule`

### How It Works

1. You publish/update content in Strapi
2. Strapi sends webhook to `https://yourdomain.com/api/webhooks/strapi`
3. Frontend verifies webhook signature
4. Frontend revalidates affected pages automatically
5. Users see updated content within seconds

### Testing Webhook

1. In Strapi webhook settings, find "Events" section
2. Click "Send test event"
3. Check Amplify logs: CloudWatch or Amplify Console logs
4. Look for: `[webhook:strapi] Received webhook:`

### Security

- Webhooks are verified using `X-Webhook-Secret` header
- Only requests with correct secret are processed
- Invalid signatures are rejected (401 response)

## Solution 3: Content Filters (Developer-Controlled)

### Issue

Content filtering happens client-side in `page.tsx`:

```typescript
// Home page filters events by future date
const upcomingEvents = allEvents.filter((event) =>
  isFutureEvent(event.attributes.date, event.attributes.startTime)
);

// Announcements filtered by displayUntil
const currentAnnouncements = announcements.filter((a) => {
  const displayUntil = a.attributes?.displayUntil;
  if (!displayUntil) return true;
  return new Date(displayUntil) > new Date();
});
```

### Solution

Check current filtering in:
- **Home page:** `frontend/src/app/(site)/page.tsx`
- **Events:** `isFutureEvent()` function in `frontend/src/lib/strapi-utils.ts`
- **Announcements:** `displayUntil` check in `frontend/src/lib/strapi.ts`

## Solution 4: Reduce ISR Revalidation Time (Quick Fix)

### Problem
- Default: 5 minutes (`revalidate = 300`)
- Content takes up to 5 minutes to appear after changes

### Solution
- Change `revalidate = 300` to `revalidate = 60` (1 minute)
- Pros: Faster content updates
- Cons: More frequent API calls, higher load

### Implementation

```typescript
// frontend/src/app/(site)/page.tsx
export const revalidate = 60; // 1 minute instead of 5 minutes
```

## Troubleshooting

### Content still not appearing after revalidation?

1. **Check content in Strapi:**
   ```bash
   curl "https://cms.vishnumandirtampa.com/api/announcements" \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```

2. **Check Strapi API endpoint:**
   Visit `https://yourdomain.com/api/debug/cms` to verify content is fetched correctly

3. **Check content display page:**
   Visit `https://yourdomain.com/api/debug/content` to see raw data vs filtered data

4. **Manual cache clear:**
   1. Rebuild/redeploy from Amplify Console
   2. OR: Call revalidation endpoint with correct secret

### Webhook not triggering?

1. **Verify webhook URL:**
   - Should be: `https://yourdomain.com/api/webhooks/strapi`
   - Check HTTPS (not HTTP)
   - Verify domain is correct

2. **Check webhook secret:**
   - Strapi header value must match `STRAPI_WEBHOOK_SECRET` env var
   - Both must be identical (copy-paste carefully)

3. **Check Amplify logs:**
   - Go to Amplify Console → Monitoring
   - Look for `[webhook:strapi]` logs
   - Verify webhook requests are received

4. **Test webhook manually:**
   ```bash
   curl -X POST "https://yourdomain.com/api/webhooks/strapi" \
     -H "Content-Type: application/json" \
     -H "X-Webhook-Secret: your-secret" \
     -d '{
       "event": "entry.publish",
       "model": "announcement",
       "entry": {}
     }'
   ```

## Best Practices

1. **Use Strapi webhook in production** - automatic, no manual intervention
2. **Use revalidation API for testing** - easy to verify cache clearing works
3. **Monitor webhook logs** - ensure automatic revalidation is working
4. **Test after Strapi updates** - verify webhooks still work after CMS updates
5. **Reduce revalidate time during high-traffic** - balances freshness vs performance

## Environment Variables Required

### For Manual Revalidation
```bash
REVALIDATION_SECRET=your-secure-random-string
```

### For Strapi Webhook
```bash
STRAPI_WEBHOOK_SECRET=your-webhook-secret
```

### Both (Recommended)
```bash
REVALIDATION_SECRET=revalidation-secret-here
STRAPI_WEBHOOK_SECRET=webhook-secret-here
```

## ISR Revalidation Paths

When revalidation is triggered, the following paths are automatically refreshed:

- **Home page:** `/`
- **Calendar hub:** `/calendar`
- **Announcements archive:** `/calendar/announcements`
- **Current events:** `/calendar/current-events`
- **Newsletter:** `/calendar/newsletter`
- **Religious pages:** `/religious/puja-services`, `/religious/priests`, `/religious/puja-schedule`

## References

- [Next.js ISR Documentation](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)
- [Next.js revalidatePath](https://nextjs.org/docs/app/api-reference/functions/revalidatePath)
- [Strapi Webhooks Documentation](https://docs.strapi.io/user-docs/latest/settings/webhooks)
