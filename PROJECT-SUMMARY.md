# Vishnu  Mandir, Tampa

## Project Overview

- **Website Type**: other
- **Development Platform**: Cursor IDE
- **Description**: ## Project goals (what the site must achieve)

1. **Serve devotees with accurate, up-to-date info**

* Daily/weekly **puja schedules**, priest/services info, festival pages, and “what’s happening now” updates. ([SSVT][1])

2. **Drive participation + community**

* Promote **events/classes/cultural programs**, newsletters, and resources; make it easy to discover and share. ([SSVT][1])

3. **Enable self-service transactions**

* **Recurring donations**, **puja sponsorships**, and facility requests / forms, with email confirmations and admin tracking. ([SSVT][1])

4. **Reduce admin workload**

* Admins can publish content, manage events, manage form submissions, and pull reports without a developer.

---

## Target audiences

* **Devotees & families** (primary): schedules, services, festivals, donation/sponsorship.
* **Event attendees**: cultural events, classes, registrations, reminders. ([SSVT][2])
* **Priests/temple staff**: service listings, requests, schedules, communications. ([SSVT][3])
* **Donors & sponsors**: recurring donations, sponsorship info, tax receipts. ([SSVT][1])
* **Volunteers/committee leads**: coordinator pages, communications, postings (SSVT has coordinator/contact style content). ([SSVT][4])

---

## Specific requirements (based on ssvt.org complexity)

### A) Public website modules

* **Home**: announcements, highlights, next major festival(s), quick links.
* **Deities / Temple info** section. ([SSVT][1])
* **Religious**:

  * **Puja schedule**
  * **Puja services** (catalog style list with pricing/notes) ([SSVT][3])
  * Prayer books / resources
  * Festivals / priests pages ([SSVT][1])
* **Cultural**:

  * upcoming cultural events + media pages ([SSVT][2])
* **Education**:

  * classes, events, resources ([SSVT][1])
* **Calendar**:

  * current events, annual calendar, newsletter archive ([SSVT][1])
* **Forms**:

  * puja sponsorships
  * facility request ([SSVT][1])

### B) Transactions & forms

* Donations:

  * one-time + recurring
  * email receipt + admin notification
* Sponsorships / service requests:

  * structured form fields, file uploads optional, automated routing to the right inbox/team.

### C) Admin (must-have)

* Role-based access: Admin, Editor, Finance, Event Manager
* Manage: pages/posts, event calendar, newsletter uploads, form submissions
* Export reports (CSV): donations, sponsorships, requests

### D) Non-functional requirements

* Mobile-first, fast load, SEO
* High availability during festivals (traffic spikes)
* Secure payments + PII protection
* Audit log for admin actions

---

## Suggested AWS architecture (better approach than “single EC2 website”)

Because this is mostly content + some forms/payments, the cleanest path is **Jamstack + serverless** (cheaper, faster, easier to scale) rather than a heavy always-on backend.

### Frontend

**Option 1 (recommended): Next.js + SSG/ISR**

* Host on **AWS Amplify** *or* **S3 + CloudFront**
* Use SSG/ISR for pages like “Puja Services”, “Deities”, “About”, etc. (very fast + SEO)

### Backend (serverless)

* **API Gateway + Lambda** for:

  * form submissions (facility request, sponsorship)
  * admin-only APIs (if you don’t rely purely on CMS)
* **DynamoDB** (simple) *or* **RDS Postgres** (if you need relational reporting)
* **S3** for newsletter PDFs/media uploads
* **SES** for email confirmations + staff notifications
* **Cognito** for admin login (and optionally member accounts)

### Payments

* **Stripe** (or your preferred provider)
* Stripe webhooks → API Gateway/Lambda → store transaction + send receipt

### Content management

Pick one:

* **Headless CMS** (recommended): Strapi self-hosted


---

## Complexity comparison to ssvt.org

Based on the visible site structure (multiple content categories, event calendar, newsletters, puja service catalog, sponsorship/forms), this is **medium complexity**:

* Not just a brochure site
* But also not a full e-commerce system ([SSVT][1])

The main complexity is **content operations + calendar + payments + admin workflows**, not hardcore backend logic.

---


## Tech Stack

### Frontend
- Framework: Next.js
- Styling: Tailwind CSS
- State Management: React Query
- Routing: Next.js native routing

### Backend
- Runtime: Node.js
- Framework: Express
- Database: PostgreSQL
- ORM: Prisma

### Deployment
- Platform: AWS Amplify
- CI/CD: GitHub Actions

## Color Scheme

| Color | Hex | Name |
|-------|-----|------|
| Primary | #d97706 | Golden Amber |
| Secondary | #3b82f6 | Royal Blue |
| Accent | #facc15 | Sunflower Yellow |
| Background | #fefce8 | Cream White |
| Text | #1f2937 | Charcoal Gray |

**Design Mood**: spiritual, traditional, serene, friendly, cultural

## Core Features

- **Event Calendar** (high): Displays daily puja schedules, cultural events, and upcoming festivals
- **Recurring Donations** (high): Allows devotees to easily set up recurring donations via Stripe
- **Puja Sponsorship Forms** (high): Automates sponsorship requests with structured fields for a streamlined experience
- **User Role Management** (high): Admin panel for role-based access control (Admin, Editor, Finance, Event Manager)
- **Newsletter Archives** (medium): Stores and displays previous newsletters for devotees
- **Mobile Accessibility** (medium): Ensures fast, responsive, and easy use across devices

## Generated Documents

This package contains all generated documentation organized by category:
- `docs/` - All documentation files organized by category
- `.cursorrules` - Cursor IDE configuration
- `CHANGELOG.md` - Project changelog
- `.cursor/memory.json` - Cursor memory configuration



---
Generated by Web Doc AI on 2026-01-25
