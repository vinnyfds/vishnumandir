```markdown
# Vishnu Mandir, Tampa: Sitemap & Information Architecture

| **Document Type** | Sitemap & Information Architecture |
| :---------------- | :------------------------------- |
| **Category**      | Design                           |
| **Project**       | Vishnu Mandir, Tampa             |
| **Version**       | 1.0                              |
| **Date**          | October 26, 2023                 |
| **Author**        | AI Technical Writer              |

---

## 1. Introduction

### 1.1. Purpose

This document outlines the Information Architecture (IA) and sitemap for the Vishnu Mandir, Tampa website. The primary goal of this IA is to create a logical, intuitive, and scalable content structure that serves the needs of our primary audience—devotees and their families.

By defining a clear hierarchy and navigation system, we aim to achieve the project's core objectives:
*   **Serve devotees** with easily accessible, accurate information.
*   **Drive participation** in community events and programs.
*   **Enable self-service** for donations and sponsorships.
*   **Create a scalable foundation** for future features like live streaming and member portals.

### 1.2. Guiding Principles

The site's architecture is guided by the following principles, derived from the project goals and desired user experience:

*   **Devotee-Centric:** The structure prioritizes content most critical to a devotee's daily and weekly engagement with the temple (schedules, services, and events).
*   **Task-Oriented:** Navigation is organized around key user actions, such as "Find a Puja," "Sponsor a Service," or "View the Calendar."
*   **Clarity and Serenity:** Page titles, URLs, and labels use clear, simple language that reflects the serene and traditional ethos of the Mandir.
*   **Scalability:** The architecture is designed to grow, allowing new sections, content types, and features to be integrated logically without requiring a major overhaul.

---

## 2. Sitemap

The sitemap represents the complete hierarchical structure of the website. It defines the relationship between pages and informs the main navigation, sub-navigation, and footer links.

### 2.1. Primary Navigation

The primary navigation bar will contain the highest-level entry points into the site's main content areas, aligned with SSVT reference website structure.

*   `/` **Home**
    *   Homepage featuring key announcements, upcoming festival highlights, quick links to schedules and donations, and a "What's Happening Now" section.

*   `/deities` **Deities** (Top-Level)
    *   Main deities listing page with detailed pages for each deity, including significance and imagery.

*   `/religious` **Religious** (with dropdown menu)
    *   `/religious/puja-schedule` **Puja Schedule:** A clear, tabular view of recurring puja timings.
    *   `/religious/puja-services` **Puja Services:** A filterable catalog of available pujas and services (both at the temple and off-site) with descriptions, pricing, and a link to the sponsorship form.
    *   `/religious/prayer-books` **Prayer Books:** A collection of downloadable prayer books, slokas, and other religious materials (PDFs).
    *   `/religious/festivals` **Festivals:** A hub page listing major annual festivals.
        *   `/religious/festivals/[festival-name]` **Festival Detail Page:** A dedicated page for each major festival with its schedule, significance, photo galleries, and sponsorship opportunities.
    *   `/religious/priests` **Priests:** Profiles of the temple priests, their expertise, and contact information.

*   `/cultural` **Cultural** (with dropdown menu)
    *   `/cultural/media` **Media:** Photo and video galleries from cultural events, music, and dance performances.

*   `/education` **Education** (with dropdown menu)
    *   `/education/classes` **Classes:** Details on classes (e.g., language, religion, music), workshops, and educational resources for all ages.
    *   `/education/events` **Events:** Educational events and workshops.
    *   `/education/resources` **Resources:** Educational materials and resources.

*   `/calendar` **Calendar** (with dropdown menu)
    *   `/calendar` **Main Calendar:** An interactive, filterable master calendar that aggregates all events: daily pujas, special pujas, festivals, cultural programs, and educational classes. Users can filter by category.
    *   `/calendar/current-events` **Current Events:** Upcoming events and activities.
    *   `/calendar/newsletter` **Newsletter:** Newsletter archive and subscription.
    *   `/calendar/annual-calendar` **Annual Calendar:** Full year calendar view.

*   `/forms` **Forms** (with dropdown menu)
    *   `/forms/puja-sponsorships` **Puja Sponsorships:** The Puja Sponsorship form.
    *   `/forms/request-facility` **Request Facility:** The Facility Request/Rental form.
    *   `/forms/donation-statement` **Donation Statement:** Request donation statements for tax purposes.
    *   `/forms/change-of-address` **Change of Address:** Update contact information.
    *   `/forms/email-subscription` **Email Subscription:** Manage email subscriptions.
    *   `/forms/all-other-forms` **All Other Forms:** Additional forms and requests.

*   `/recurring-donation` **Recurring-Donation** (Top-Level Link)
    *   Set up recurring donations to support the temple on a regular basis.

*   `/online-puja` **Online-Puja** (Top-Level Link)
    *   Sponsor a puja online (redirects to `/forms/puja-sponsorships`).

*   `/about` **About** (with dropdown menu)
    *   `/about/contact` **Contact:** Address, map, operating hours, and general contact form.
    *   `/about/location` **Location:** Map and directions to the temple.
    *   `/about/volunteer` **Volunteer:** Information on volunteering opportunities and a sign-up form.
    *   `/about/virtual-visit` **Virtual Visit:** Virtual tour of the temple.
    *   `/about/feedback` **Feedback:** Submit feedback and suggestions.
    *   `/about/faq` **FAQ:** Frequently asked questions.
    *   `/about/about` **About:** Mission, vision, and history of the Mandir.

### 2.2. Utility & Call-to-Action (CTA) Navigation

These items will be prominently displayed in the header, separate from the primary navigation, to encourage key user actions.

*   `/support/donate` **Donate:** A primary, high-visibility button linking directly to the donation page.

### 2.3. Footer Navigation

The footer will provide quick access to important pages and administrative information.

*   **Quick Links**
    *   Puja Schedule (`/religious/puja-schedule`)
    *   Calendar (`/calendar`)
    *   Contact Us (`/about/contact`)
    *   Sponsor a Puja (`/forms/puja-sponsorships`)
    *   Facility Rental (`/forms/request-facility`)
*   **Connect**
    *   Social Media Icons (Facebook, YouTube, etc.)
    *   Newsletter Archive (`/calendar/newsletter`)
*   **Legal**
    *   Privacy Policy (`/privacy-policy`)
    *   Terms of Service (`/terms-of-service`)

### 2.4. Form & Transactional Pages

These pages are task-specific and are primarily accessed via CTAs and contextual links, or through the Forms menu.

*   `/support/donate`: Donation page with options for one-time and recurring payments (Stripe integration).
*   `/forms/puja-sponsorships`: The Puja Sponsorship form (moved from `/support/sponsor-a-puja`).
*   `/forms/request-facility`: The Facility Request/Rental form (moved from `/support/facility-rental`).
*   `/auth/login`: Admin login page (via Cognito).

---

## 3. URL Structure Strategy

A clean, hierarchical, and human-readable URL structure is essential for both user experience and Search Engine Optimization (SEO). URLs will follow a consistent pattern based on the sitemap.

*   **Structure:** `/{section}/{subsection}/{detail-page}`
*   **Convention:** Use lowercase letters and hyphens (`-`) to separate words. Avoid special characters and file extensions (e.g., `.html`).

| Page/Content Type            | URL Example                                     |
| ---------------------------- | ----------------------------------------------- |
| Top-Level Section            | `/religious`                                    |
| Subsection Page              | `/religious/puja-services`                      |
| Detail Page (Festival)       | `/religious/festivals/diwali-2024`              |
| Detail Page (Deity)          | `/deities/lord-vishnu`                          |
| Form Page                    | `/forms/puja-sponsorships`                      |
| Dynamic Calendar View        | `/calendar?category=cultural`                   |
| Admin Page (for routing)     | `/admin/dashboard`                              |

---

## 4. Navigation & User Flow

### 4.1. Global Navigation Bar

The main navigation will be persistent across the top of every page, providing consistent access to the site's core sections. The navigation structure is aligned with SSVT reference website.

*   **Logo:** Links to the Homepage (`/`).
*   **Main Links with Dropdowns:**
    *   **Deities** (top-level link)
    *   **Religious** (dropdown: Puja Schedule, Puja Services, Prayer Books, Festivals, Priests)
    *   **Cultural** (dropdown: Media)
    *   **Education** (dropdown: Classes, Events, Resources)
    *   **Calendar** (dropdown: Current Events, Newsletter, Annual Calendar)
    *   **Forms** (dropdown: Puja Sponsorships, Request Facility, Donation Statement, Change of Address, Email Subscription, All Other Forms)
    *   **Recurring-Donation** (top-level link)
    *   **Online-Puja** (top-level link)
    *   **About** (dropdown: Contact, Location, Volunteer, Virtual Visit, Feedback, FAQ, About)
*   **Primary CTA Button:** A visually distinct "Donate" button linking to `/support/donate`.

### 4.2. Cross-Linking Strategy

To create a cohesive user journey and improve content discoverability, we will implement a robust cross-linking strategy.

*   **Festival Pages:** Will link directly to related **Puja Services** and the **Sponsorship Form**.
*   **Puja Services Catalog:** Each service will have a "Sponsor This Puja" button linking to the pre-filled sponsorship form.
*   **Homepage:** The "Upcoming Events" module will link directly to the relevant detail pages within the **Calendar** or **Festival** sections.
*   **Priest Profiles:** Will link to the services they specialize in.

---

## 5. Content Type Definitions (for Headless CMS)

To enable efficient content management via the Headless CMS (Strapi), the following content models (collections) will be defined. This structure allows administrators to manage content without developer intervention.

```json
// Note: This is a conceptual representation of the CMS fields.
// Actual implementation will be done in Strapi.

{
  "Event": {
    "title": "Text (string, required)",
    "slug": "UID (autogenerated from title)",
    "date": "Date (required)",
    "startTime": "Time (required)",
    "endTime": "Time",
    "category": "Enum (required, one of: 'Religious', 'Cultural', 'Educational', 'Festival')",
    "description": "Rich Text (Markdown)",
    "image": "Media (Image)",
    "location": "Text (string, default: 'Vishnu Mandir, Tampa')",
    "registrationLink": "URL (string, optional)"
  },
  "PujaService": {
    "name": "Text (string, required)",
    "slug": "UID (autogenerated from name)",
    "description": "Rich Text (Markdown)",
    "price": "Number (decimal, required)",
    "location": "Enum (required, one of: 'In Temple', 'Off-site')",
    "notes": "Text (string, optional, e.g., 'Devotee to bring fruits')",
    "image": "Media (Image, optional)",
    "relatedPriests": "Relation (Many-to-Many with 'Priest' model)"
  },
  "Priest": {
    "name": "Text (string, required)",
    "title": "Text (string, e.g., 'Head Priest')",
    "bio": "Rich Text (Markdown)",
    "profileImage": "Media (Image)"
  },
  "Announcement": {
    "title": "Text (string, required)",
    "content": "Rich Text (Markdown)",
    "displayUntil": "Date",
    "level": "Enum (one of: 'Info', 'High-Priority')"
  },
  "Newsletter": {
    "title": "Text (string, required, e.g., 'October 2023 Newsletter')",
    "publicationDate": "Date (required)",
    "file": "Media (PDF, required)"
  },
  "Page": {
    "title": "Text (string, required)",
    "slug": "UID (e.g., 'about-us', 'privacy-policy')",
    "content": "Rich Text (Markdown, with components for complex layouts)"
  }
}
```

This structured approach ensures content is reusable, easily managed through an admin interface, and can be seamlessly delivered to the Next.js frontend via API.
```