# CMS Data Flow Directions

This document details which content flows from Strapi CMS to the frontend (display content) and which flows from the frontend to Strapi/PostgreSQL (form submissions, read-only).

## Content Flow FROM Strapi TO Frontend (Display Content)

These content types are **created and managed in Strapi** and **displayed on the frontend**. Admins can create, edit, publish, and delete these items directly in Strapi.

### 1. Event (`/api/events`)

- **Created by:** Admin, Editor in Strapi CMS
- **Displayed on:** 
  - `/` (home page - featured events)
  - `/calendar/current-events` (all published events)
  - `/education/events` (educational category events)
  - Event detail pages (future implementation)
- **Frontend API:** `GET /api/events?filters[...]=...&populate=*`
- **Fields:** 
  - `title` - Event name
  - `slug` - URL-friendly identifier
  - `date` - ISO date string (YYYY-MM-DD)
  - `startTime` - Start time (HH:mm:ss)
  - `endTime` - End time (HH:mm:ss)
  - `category` - "Religious" | "Cultural" | "Educational" | "Festival"
  - `description` - Rich text (JSON)
  - `location` - Event location
  - `registrationLink` - Optional registration URL
  - `image` - Featured event image (StrapiMedia)
  - `publishedAt` - Publication status
  - `createdAt`, `updatedAt` - Timestamps
- **Editable in Strapi:** Yes (create, update, delete, publish/unpublish)
- **Display Logic:** 
  - Only published events are fetched
  - Filtered by category on frontend (client-side filtering for v5 compatibility)
  - Sorted by date ascending
  - Images displayed using Next.js Image component with `getStrapiImageUrl()`

### 2. Announcement (`/api/announcements`)

- **Created by:** Admin, Editor in Strapi CMS
- **Displayed on:** `/` (home page announcements section)
- **Frontend API:** `GET /api/announcements?sort=publishedAt:desc&populate=*`
- **Fields:**
  - `title` - Announcement title
  - `content` - Rich text (JSON)
  - `displayUntil` - Optional expiration date (ISO date)
  - `level` - "Info" | "High-Priority"
  - `publishedAt` - Publication status
  - `createdAt`, `updatedAt` - Timestamps
- **Editable in Strapi:** Yes (create, update, delete, publish/unpublish)
- **Display Logic:**
  - Only published announcements shown
  - Filtered by expiration date (client-side: only show if no displayUntil or displayUntil > now)
  - Sorted by publication date descending (newest first)
  - Respects "High-Priority" level for visual distinction

### 3. Newsletter (`/api/newsletters`)

- **Created by:** Admin, Editor in Strapi CMS
- **Displayed on:** `/calendar/newsletter` (newsletter archive)
- **Frontend API:** `GET /api/newsletters?sort=publicationDate:desc&populate=*`
- **Fields:**
  - `title` - Newsletter name/title
  - `publicationDate` - ISO date string
  - `file` - PDF file upload (StrapiMedia)
  - `publishedAt` - Publication status
  - `createdAt`, `updatedAt` - Timestamps
- **Editable in Strapi:** Yes (create, update, delete, publish/unpublish)
- **Display Logic:**
  - Only published newsletters shown
  - Sorted by publication date descending (newest first)
  - PDF files downloaded using `getStrapiFileUrl()`

### 4. Priest (`/api/priests`)

- **Created by:** Admin, Editor in Strapi CMS
- **Displayed on:** `/religious/priests` (priest directory)
- **Frontend API:** `GET /api/priests?sort=name:asc&populate=*`
- **Fields:**
  - `name` - Priest's full name
  - `title` - Priest's title (e.g., "Head Priest", "Brahmin")
  - `bio` - Biography (Rich text, JSON)
  - `profileImage` - Profile photo (StrapiMedia)
  - `publishedAt` - Publication status
  - `createdAt`, `updatedAt` - Timestamps
- **Editable in Strapi:** Yes (create, update, delete, publish/unpublish)
- **Display Logic:**
  - Only published priests shown
  - Sorted by name ascending (alphabetical)
  - Profile images displayed using Next.js Image component

### 5. Puja Service (`/api/puja-services`)

- **Created by:** Admin, Editor in Strapi CMS
- **Displayed on:** `/religious/puja-services` (puja services catalog)
- **Frontend API:** `GET /api/puja-services?sort=name:asc&populate=*`
- **Fields:**
  - `name` - Service name (e.g., "Abhisheka Puja")
  - `slug` - URL-friendly identifier
  - `description` - Service description (Rich text, JSON)
  - `price` - Service cost (decimal number, stored in cents)
  - `location` - "In Temple" | "Off-site"
  - `notes` - Additional notes
  - `image` - Service photo (StrapiMedia)
  - `relatedPriests` - Linked priest profiles (relation field)
  - `publishedAt` - Publication status
  - `createdAt`, `updatedAt` - Timestamps
- **Editable in Strapi:** Yes (create, update, delete, publish/unpublish)
- **Display Logic:**
  - Only published services shown
  - Sorted by name ascending (alphabetical)
  - Links to related priests shown when available

### 6. Page (`/api/pages`)

- **Created by:** Admin, Editor in Strapi CMS
- **Displayed on:** Dynamic pages (currently not used, reserved for future expansion)
- **Frontend API:** `GET /api/pages?filters[slug][$eq]=slug-name&populate=*`
- **Fields:**
  - `title` - Page title
  - `slug` - URL-friendly identifier
  - `content` - Page content (Rich text, JSON)
  - `publishedAt` - Publication status
  - `createdAt`, `updatedAt` - Timestamps
- **Editable in Strapi:** Yes (create, update, delete, publish/unpublish)
- **Display Logic:**
  - Only published pages shown
  - Fetched by slug for dynamic routing

---

## Content Flow FROM Frontend TO Strapi (Form Submissions, Read-Only)

These content types are **submitted from frontend forms** and **stored in Strapi for admin viewing/export**. They are **read-only in Strapi** - admins cannot edit them directly, only view and export them.

**Important:** The **source of truth** for form submissions is **PostgreSQL**. Strapi stores read-only copies synced from PostgreSQL via the backend API.

### 1. Puja Sponsorship (`/api/puja-sponsorships`)

- **Source:** Frontend form at `/forms/puja-sponsorships` (user submits sponsorship request)
- **Backend Processing:** 
  - Form submitted to `POST /api/v1/forms/sponsorship` (backend API)
  - Data saved to PostgreSQL first (source of truth)
  - Asynchronously synced to Strapi for admin viewing
- **Storage:** 
  - **Primary:** PostgreSQL (puja_sponsorships table)
  - **Secondary:** Strapi CMS (read-only copy for admin interface)
- **Admin Access:** Strapi admin panel at `/content-manager/collection-types/plugin::content-manager.puja-sponsorship`
- **Fields:**
  - `pujaId` - Associated puja service
  - `sponsorName` - Sponsor's full name
  - `sponsorEmail` - Contact email
  - `sponsorPhone` - Contact phone
  - `requestedDate` - Requested sponsorship date
  - `location` - "In Temple" | "Off-site"
  - `notes` - Sponsor notes/preferences
  - `status` - "pending" | "confirmed" | "completed"
  - `transactionId` - Payment transaction reference
  - `postgresId` - Link to PostgreSQL record
- **Editable in Strapi:** No (read-only, synced from PostgreSQL)
- **Admin Actions:** View, export CSV, update status via backend API (not directly in Strapi)
- **Data Flow Diagram:**
  ```
  Frontend Form → Backend API (POST /api/v1/forms/sponsorship) → PostgreSQL (primary)
                                                                  ↓ (async sync)
                                                                Strapi CMS (read-only view)
  ```

### 2. Facility Request (`/api/facility-requests`)

- **Source:** Frontend form at `/forms/request-facility` (user requests facility booking)
- **Backend Processing:**
  - Form submitted to `POST /api/v1/forms/facility-request` (backend API)
  - Data saved to PostgreSQL first (source of truth)
  - Asynchronously synced to Strapi for admin viewing
- **Storage:**
  - **Primary:** PostgreSQL (facility_requests table)
  - **Secondary:** Strapi CMS (read-only copy for admin interface)
- **Admin Access:** Strapi admin panel at `/content-manager/collection-types/plugin::content-manager.facility-request`
- **Fields:**
  - `requesterName` - Requester's full name
  - `requesterEmail` - Contact email
  - `requesterPhone` - Contact phone
  - `eventType` - Type of event (e.g., "Wedding", "Birthday")
  - `eventName` - Event title
  - `eventDate` - Requested event date
  - `startTime` - Start time (HH:mm:ss)
  - `endTime` - End time (HH:mm:ss)
  - `numberOfGuests` - Expected attendee count
  - `details` - Event description
  - `requirements` - Special requirements/accommodations
  - `status` - "pending" | "approved" | "denied"
  - `transactionId` - Request reference ID
  - `postgresId` - Link to PostgreSQL record
- **Editable in Strapi:** No (read-only, synced from PostgreSQL)
- **Admin Actions:** View, export CSV, update status via backend API
- **Data Flow Diagram:**
  ```
  Frontend Form → Backend API (POST /api/v1/forms/facility-request) → PostgreSQL (primary)
                                                                       ↓ (async sync)
                                                                     Strapi CMS (read-only view)
  ```

### 3. Form Submission (`/api/form-submissions`)

- **Source:** Multiple frontend forms:
  - `/forms/donation-statement` (donation inquiry)
  - `/forms/change-of-address` (member address update)
  - `/forms/email-subscription` (newsletter signup)
- **Backend Processing:**
  - Form submitted to corresponding backend endpoint:
    - `POST /api/v1/forms/donation-statement`
    - `POST /api/v1/forms/change-of-address`
    - `POST /api/v1/forms/email-subscription`
  - Data saved to PostgreSQL first (source of truth)
  - Asynchronously synced to Strapi for admin viewing
- **Storage:**
  - **Primary:** PostgreSQL (form_submissions table)
  - **Secondary:** Strapi CMS (read-only copy for admin interface)
- **Admin Access:** Strapi admin panel at `/content-manager/collection-types/plugin::content-manager.form-submission`
- **Fields:**
  - `formType` - "donation-statement" | "change-of-address" | "email-subscription"
  - `email` - Submitter's email address
  - `name` - Submitter's name
  - `payload` - Form-specific data stored as JSON:
    - For donation-statement: `{ message, amount }`
    - For change-of-address: `{ oldAddress, newAddress }`
    - For email-subscription: `{ subscriptionType, preferences }`
  - `transactionId` - Form submission reference ID
  - `postgresId` - Link to PostgreSQL record
- **Editable in Strapi:** No (read-only, synced from PostgreSQL)
- **Admin Actions:** View, export CSV
- **Data Flow Diagram:**
  ```
  Frontend Form → Backend API (POST /api/v1/forms/*) → PostgreSQL (primary)
                                                        ↓ (async sync)
                                                      Strapi CMS (read-only view)
  ```

---

## Overall Data Flow Architecture

```
┌──────────────────────────────────┐
│   Strapi CMS                     │
│   (Content Management)           │
│ - Event                          │
│ - Announcement                   │
│ - Newsletter                     │
│ - Priest                         │
│ - Puja Service                   │
│ - Page                           │
└──────────────┬───────────────────┘
               │
               │ GET /api/events, /priests, etc.
               │ (Read-only for frontend display)
               │ Populate: images, rich text, relations
               │
               ▼
┌──────────────────────────────────┐
│   Next.js Frontend               │
│   (Presentation Layer)           │
│ - /education/events              │
│ - /religious/priests             │
│ - /religious/puja-services       │
│ - /calendar/newsletter           │
│ - / (home page)                  │
└──────────────┬───────────────────┘
               │
               │ POST /api/v1/forms/
               │ (Form submissions)
               │
               ▼
┌──────────────────────────────────┐
│   Express.js Backend API         │
│   (Business Logic & Sync)        │
└──────────────┬────────┬──────────┘
               │        │
               │        └──────────────────────┐
               │                               │
               ▼                               ▼
     ┌─────────────────┐           ┌──────────────────────┐
     │   PostgreSQL    │           │  Strapi CMS          │
     │   (Primary DB)  │ ◄─────────│  (Sync/Read-only)    │
     │                 │  async    │                      │
     │ - Form          │  sync via │ - Puja Sponsorship   │
     │   Submissions   │  backend  │ - Facility Request   │
     │ - Donations     │  service  │ - Form Submissions   │
     │ - etc.          │           │                      │
     └─────────────────┘           └──────────────────────┘
```

### Data Flow Summary

**Display Content (Read-Only on Frontend):**
- Strapi CMS → Next.js Frontend (via fetch in Server Components)
- Admins manage content directly in Strapi
- Frontend fetches and displays published content
- Images and files served from Strapi media

**Form Submissions (Write-Only from Frontend):**
- Next.js Frontend → Express Backend API (POST request)
- Backend stores data in PostgreSQL (source of truth)
- Backend asynchronously syncs data to Strapi (for admin viewing)
- Admins view/export submissions from Strapi admin panel
- Edits to submissions go through backend API, not directly in Strapi

---

## Key Points

1. **Separate Responsibilities:**
   - Strapi: Content management and display data
   - PostgreSQL: Form submission data (source of truth)
   - Frontend: Presentation and user interaction
   - Backend: Business logic and data sync

2. **Source of Truth:**
   - Display content (Events, Announcements, etc.): **Strapi CMS**
   - Form submissions (Sponsorships, Requests, etc.): **PostgreSQL**

3. **Admin Workflow:**
   - Manage display content: Log into Strapi admin panel, create/edit/publish content
   - View form submissions: Open Strapi admin panel, view read-only submissions, export CSV
   - Update submission status: Use backend API (status updates don't happen in Strapi UI directly)

4. **Frontend Workflow:**
   - Fetch display content: Server Components call `fetchEvents()`, `fetchPriests()`, etc.
   - Submit forms: Forms POST to `/api/v1/forms/*` endpoints
   - ISR revalidation: Content changes in Strapi trigger frontend rebuild every 5-60 minutes

5. **Strapi Sync Service:**
   - Location: `backend/src/services/strapi.service.ts`
   - Runs asynchronously after PostgreSQL write
   - Non-blocking: Sync failures don't fail the original request
   - Provides read-only data for admin interface only

6. **Performance Considerations:**
   - Display content: Cached via ISR (5-60 minute intervals)
   - Images: Optimized via Next.js Image component
   - Form submissions: Real-time PostgreSQL writes, eventual consistency with Strapi

---

**Last Updated:** 2026-01-27  
**Version:** 1.0.0
