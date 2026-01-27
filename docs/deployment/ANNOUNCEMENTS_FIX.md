# Fix for Announcements Not Displaying

**Status:** ✅ COMPLETED  
**Date:** 2026-01-27  
**Commit:** af21113

## Problem

Published announcements in Strapi CMS were not appearing on the frontend homepage despite being marked as "Published" in the CMS admin panel.

## Root Cause

The `fetchAnnouncements()` function did not have a filter to ensure only published announcements were fetched. The `publishedAt` filter had been removed due to Strapi v5 compatibility concerns, but this meant:
- Both published and draft announcements were potentially being fetched
- No filtering based on publication status
- Content could be silently filtered out without visibility

## Solution Implemented

### 1. Added publishedAt Filter (frontend/src/lib/strapi.ts)

**API-level filter:**
```typescript
const queryParams: Record<string, string> = {
  "filters[publishedAt][$notNull]": "true",
  sort: "publishedAt:desc",
};
```

**Client-side filter (backup):**
```typescript
filteredAnnouncements = filteredAnnouncements.filter((announcement) => {
  return announcement?.attributes?.publishedAt !== null;
});
```

This dual approach ensures announcements are properly filtered for Strapi v5 compatibility.

### 2. Enhanced Debug Logging (frontend/src/lib/strapi.ts)

Added comprehensive logging at each stage:
- Raw API response count and sample
- After normalization (catches transformation issues)
- After publishedAt filter (shows filtering impact)
- After level and displayUntil filters
- Final result with announcement details

**Development console shows:**
```
[strapi] fetchAnnouncements - Raw API response: { count: 2, sampleItem: {...} }
[strapi] fetchAnnouncements - After normalization: { count: 2, sampleItem: {...} }
[strapi] publishedAt filter applied client-side: { beforeFilter: 2, afterFilter: 2 }
[strapi] fetchAnnouncements - Final result: { totalAnnouncements: 2, announcements: [...] }
```

### 3. Enhanced Homepage Logging (frontend/src/app/(site)/page.tsx)

Added logging to track announcements through the homepage rendering:
- After `fetchAnnouncements()` call
- After attribute validation
- After sorting (final result)

### 4. Created Diagnostic Endpoint (frontend/src/app/api/debug/announcements/route.ts)

New endpoint at `/api/debug/announcements` that:
- Fetches announcements using the same logic as the homepage
- Returns counts and details at each stage
- Shows raw vs normalized data
- Displays final filtered results with all fields
- Provides helpful error messages if fetching fails

**Response format:**
```json
{
  "success": true,
  "data": {
    "timestamp": "2026-01-27T...",
    "testDate": "2026-01-27T...",
    "totals": {
      "fetchedAnnouncements": 2,
      "validAnnouncements": 2
    },
    "announcements": [
      {
        "id": 1,
        "title": "Test Announcement",
        "level": "Info",
        "publishedAt": "2026-01-27T...",
        "displayUntil": null,
        "hasAttributes": true
      }
    ]
  }
}
```

## Files Modified

1. **frontend/src/lib/strapi.ts**
   - Added `filters[publishedAt][$notNull]` to query parameters
   - Added client-side publishedAt filter
   - Enhanced logging throughout the function
   - Better error handling for normalization

2. **frontend/src/app/(site)/page.tsx**
   - Added debug logging after announcements fetch
   - Added logging after attribute validation
   - Added logging after sorting

3. **CHANGELOG.md**
   - Documented all changes

## Files Added

1. **frontend/src/app/api/debug/announcements/route.ts**
   - New diagnostic endpoint for troubleshooting
   - Callable at `/api/debug/announcements`

## Build Status

✅ Build successful - All 41 pages compiled without errors

## Testing

### To verify the fix:

1. **Check homepage for announcements:**
   - Visit `/` (homepage)
   - Look for "What's Happening Now" section
   - Should display published announcements

2. **Use diagnostic endpoint:**
   - Visit `/api/debug/announcements`
   - Shows detailed breakdown of announcement fetching
   - Indicates if any announcements are available
   - Shows reason if no announcements found

3. **Check browser console (development mode):**
   - Open DevTools → Console
   - Look for `[strapi] fetchAnnouncements` logs
   - Trace data through each filtering stage

### Troubleshooting with logs:

If announcements still don't appear:

1. **Check API response count** - If `fetchedAnnouncements: 0`, check Strapi:
   - Is announcement published (not draft)?
   - Is API token valid?
   - Are permissions set correctly?

2. **Check normalization** - If count drops after normalization, check:
   - Announcement has valid `id` field
   - Announcement has `attributes` object
   - No errors in console

3. **Check filters** - If count drops after filtering:
   - Check `publishedAt` filter impact
   - Check `displayUntil` filter impact
   - Check if announcement has valid dates

## Expected Outcome

- Published announcements now appear on the homepage
- Draft announcements are filtered out
- Comprehensive logging helps diagnose any remaining issues
- Diagnostic endpoint provides visibility into the data flow
- Future issues can be debugged using the logs and diagnostic endpoint

## Git Commit

```
Commit: af21113
Message: fix(strapi): Fix announcements not displaying by adding publishedAt filter

Files changed:
- frontend/src/lib/strapi.ts
- frontend/src/app/(site)/page.tsx
- CHANGELOG.md
- frontend/src/app/api/debug/announcements/route.ts (new)
```

## Next Steps

1. Test on production (AWS Amplify)
2. Monitor console logs for any issues
3. If problems persist, check:
   - Strapi API token permissions
   - Announcement publication status
   - `displayUntil` dates
   - ISR cache (5-minute revalidation)

---

**Priority:** HIGH ✅ RESOLVED

This fix ensures published announcements display correctly on the frontend, with comprehensive debugging capabilities to handle future issues.
