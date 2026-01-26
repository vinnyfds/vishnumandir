# Fix CMS Content Display Issues

## Root Cause Analysis

The frontend code is working correctly, but content isn't showing because:

### Issue 1: Event Category Doesn't Match Filter
- **Current**: Event category = "Religious"
- **Expected for `/education/events`**: Category = "Educational"
- **Solution**: Edit the event in Strapi and change category to "Educational"

### Issue 2: Event Time is in the Past
- **Current**: Date: 2026-01-26, Time: 00:45:00 (12:45 AM)
- **Current Server Time**: 2026-01-26 18:55:15 (6:55 PM)
- **Problem**: Event at 12:45 AM has already passed
- **Solution**: Change start time to a future time (e.g., 19:00 or 20:00 today, or any time tomorrow)

### Issue 3: Missing Content Types
- **Puja Services**: 0 items (need to create)
- **Announcements**: 0 items (need to create)
- **Newsletters**: 0 items (need to create)

## How to Fix

### Step 1: Fix the Event in Strapi

1. **Go to Strapi Admin**: https://cms.vishnumandirtampa.com/admin
2. **Navigate to**: Content Manager → Event → "test 1"
3. **Change Category**:
   - Find "Category" field
   - Change from "Religious" to "Educational"
4. **Change Start Time**:
   - Find "Start Time" field
   - Change from "00:45:00" to "19:00:00" (or any future time)
   - Example: To make it show today at 7 PM, enter "19:00:00"
   - Or set date to tomorrow and any time
5. **Click "Save" and "Publish"**

### Step 2: Create Educational Event (Optional)

After fixing the first event, create a new one with:
- **Title**: "Temple Workshop"
- **Category**: "Educational"
- **Date**: Tomorrow or later
- **Start Time**: Any future time (e.g., 18:00:00)
- **Description**: Some educational content
- **Publish**: Yes

### Step 3: Add Other Content (Optional)

**Puja Services** (for `/religious/puja-services`):
1. Content Manager → Puja Service
2. Create new entry with name, description, price
3. Publish

**Announcements** (for home page):
1. Content Manager → Announcement
2. Create new entry with title, message
3. Publish

**Newsletters** (for `/calendar/newsletter`):
1. Content Manager → Newsletter
2. Create new entry with title, PDF file upload
3. Publish

## Verification

After making changes:

1. **Frontend should update automatically** (within 5 minutes via ISR)
2. **Or manually test with script**:
   ```bash
   cd /path/to/project
   ./scripts/diagnose-cms-connection.sh
   ```

3. **Pages to check**:
   - https://vishnumandirtampa.com/ (home page - announcements & events)
   - https://vishnumandirtampa.com/education/events (educational events)
   - https://vishnumandirtampa.com/religious/puja-services (puja services)
   - https://vishnumandirtampa.com/calendar/current-events (all upcoming events)

## Why Content Isn't Showing

The frontend code **correctly filters content** based on:
1. **Category** (events must match the page's category filter)
2. **Publication status** (items must be published with `publishedAt` set)
3. **Date/Time** (events must have a future date/time to appear)

The event exists in Strapi but is filtered out because:
- ❌ Category is "Religious" (not "Educational")
- ❌ Time 00:45:00 is past (it's now 18:55:00)

## Summary

✅ **What's working**: Frontend code, API, environment variables, deployment  
❌ **What's not working**: Content metadata doesn't match filters and event time is past

**Fix**: Edit event in Strapi to match category and set future time
