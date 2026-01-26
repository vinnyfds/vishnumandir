Of course. Here is the comprehensive BRD/FRD document for the Vishnu Mandir, Tampa website project, written in Markdown format.

```markdown
# Business & Functional Requirements Document (BRD/FRD)
## Vishnu Mandir, Tampa - Website Revitalization Project

| | |
|---|---|
| **Document Version** | 1.0 |
| **Status** | Baseline |
| **Date** | 2023-10-27 |
| **Author** | Technical Writer AI |
| **Project Owner** | Vishnu Mandir, Tampa Committee |

---

## 1. Introduction & Business Requirements

### 1.1. Document Purpose
This document outlines the business and functional requirements for the new Vishnu Mandir of Tampa website. It serves as the primary reference for project stakeholders, designers, and developers, translating high-level project goals into specific, actionable requirements for design, development, and testing.

### 1.2. Project Background
The Vishnu Mandir of Tampa requires a new digital platform to better serve its growing community of devotees, attendees, and supporters. The current methods for disseminating information and managing services (e.g., paper forms for puja sponsorships) are inefficient and create a high administrative load. This project aims to create a modern, serene, and highly functional website that acts as the central hub for all temple-related information and activities.

### 1.3. Project Goals & Objectives
The website must achieve the following primary business goals:
1.  **Serve Devotees:** Provide accurate, up-to-date information on puja schedules, priest services, festivals, and temple news.
2.  **Drive Participation:** Promote community engagement through easy discovery of events, classes, and cultural programs.
3.  **Enable Self-Service:** Allow users to perform transactions like recurring donations and puja sponsorships online.
4.  **Reduce Admin Workload:** Empower non-technical staff to manage content, events, forms, and reports independently.

### 1.4. Project Scope

#### 1.4.1. In-Scope (MVP)
Based on stakeholder priorities, the Minimum Viable Product (MVP) will focus on **Goal #1: Serving devotees with accurate, up-to-date information.**
- **Public-Facing Content:**
    - Home Page with announcements and quick links.
    - Daily/Weekly Puja Schedules.
    - Puja Services Catalog (list of services with descriptions and pricing).
    - Static pages: Deities, Temple Info (About Us), Priests, Contact.
- **Core Transactions:**
    - Online Puja Sponsorship Form (replaces the current paper-based process).
    - One-time and Recurring Donation system.
- **Core Admin Functionality:**
    - Basic CMS for managing the content of the pages listed above.
    - Admin dashboard to view and manage puja sponsorship submissions.
    - Admin dashboard to view donation records.

#### 1.4.2. Out-of-Scope (Future Phases)
The following features are planned for subsequent releases to ensure a focused and timely MVP launch:
- Full-fledged member portal with personalized content.
- Live streaming of pujas and events.
- Dedicated mobile application.
- Advanced integrations with accounting software (e.g., QuickBooks).
- Facility rental/request forms.
- Newsletter archive and upload functionality.
- Cultural and Education section content pages.

### 1.5. Target Audiences

| Audience Persona | Primary Needs & Goals |
|---|---|
| **Devotees & Families** | Access puja schedules, learn about services, sponsor pujas, and make donations. |
| **Event Attendees** | Discover cultural events and classes, view event details, and register. |
| **Donors & Sponsors** | Make one-time or recurring donations, receive tax receipts, and see sponsorship opportunities. |
| **Priests/Temple Staff** | View service requests, manage their schedules, and communicate updates. |
| **Admin Team** | Publish content, manage events, process submissions, and pull financial reports. |

### 1.6. Brand & User Experience
The website's design shall be **traditional, serene, and friendly**, reflecting the spiritual and cultural values of the Mandir.
- **Layout:** Modern landing page style with clear, intuitive top navigation.
- **Responsiveness:** Mobile-first design is critical.
- **Color Palette:**
    - **Primary:** `#d97706` (Golden Amber)
    - **Secondary:** `#3b82f6` (Royal Blue)
    - **Accent:** `#facc15` (Sunflower Yellow)
    - **Background:** `#fefce8` (Cream White)
    - **Text:** `#1f2937` (Charcoal Gray)
- **Dark Mode:** The site shall support a dark mode theme.

---

## 2. Functional Requirements

This section details the specific features and functionalities of the website, structured by module.

### 2.1. High-Priority Features (MVP)

#### 2.1.1. Puja Schedule

*   **Description:** A central, easily accessible calendar displaying all daily, weekly, and special puja timings. This is the most critical feature for serving devotees.
*   **User Story:** "As a devotee, I want to view the puja schedule for today and the upcoming week on my phone so I can plan my visit to the temple."
*   **Functional Requirements:**
    *   **FR-PS-01:** The system shall display a list or calendar view of pujas, filterable by day, week, and month.
    *   **FR-PS-02:** Each schedule entry must include the Puja Name, Date, Start Time, and End Time.
    *   **FR-PS-03:** The schedule must be prominently linked from the main navigation and the home page.
    *   **FR-PS-04:** The data for the schedule shall be managed by an `Admin` or `Editor` role via the admin dashboard.
    *   **FR-PS-05:** The schedule shall be displayed in the user's local timezone (Eastern Time) with the timezone clearly indicated.
*   **Acceptance Criteria:**
    *   A non-technical admin can add, edit, or delete a puja entry in the schedule.
    *   Changes made in the admin panel are reflected on the public website immediately (or after a cache invalidation).
    *   The schedule is readable and usable on a standard mobile device screen.

#### 2.1.2. Puja Sponsorship Form

*   **Description:** An online form that automates the current paper-based process for sponsoring a puja. This streamlines the experience for devotees and reduces the administrative workload.
*   **User Story:** "As a donor, I want to sponsor a puja for my family's anniversary online, pay for it securely, and receive an immediate confirmation email, so I don't have to visit the temple in person just to fill out a form."
*   **Functional Requirements:**
    *   **FR-SF-01:** The system shall present a web form with the following fields:
        *   Sponsor's Full Name (Required)
        *   Email Address (Required, for confirmation)
        *   Phone Number (Required)
        *   Puja to Sponsor (Required, dropdown list populated from the Puja Services catalog)
        *   Preferred Date of Puja (Required, date picker)
        *   Names for Sankalpam (Optional, text area)
        *   File Upload (Optional, for photos or specific documents)
    *   **FR-SF-02:** Upon form submission, the system shall integrate with Stripe to process the payment associated with the selected puja service.
    *   **FR-SF-03:** After successful payment, the system shall automatically send a confirmation email to the sponsor's email address via AWS SES. The email will contain the sponsorship details and a payment receipt.
    *   **FR-SF-04:** After successful submission, the system shall send a notification email to a designated temple admin/finance email address (e.g., `pujas@vishnumandirtampa.org`).
    *   **FR-SF-05:** All sponsorship submissions must be stored in the database and be viewable by `Admin` and `Finance` roles in the admin dashboard.
*   **Acceptance Criteria:**
    *   A user can successfully complete the form, pay via Stripe, and receive a confirmation email.
    *   An admin receives an email notification of the new sponsorship.
    *   The new sponsorship record appears in the admin dashboard with all submitted details and a "Paid" status.
    *   The form displays clear validation errors if required fields are missed.

#### 2.1.3. Donations (One-Time & Recurring)

*   **Description:** A secure and simple interface for devotees to make one-time or recurring financial contributions to the temple.
*   **User Story:** "As a supporter of the temple, I want to set up a monthly $51 donation easily so I can contribute consistently without having to remember to do it each month."
*   **Functional Requirements:**
    *   **FR-DN-01:** The system shall provide a donation form with options for donation frequency: "One-Time" and "Monthly."
    *   **FR-DN-02:** The form shall include pre-set amount buttons (e.g., $21, $51, $101, $251) and a field for a custom amount.
    *   **FR-DN-03:** All payments shall be processed securely via the Stripe payment gateway.
    *   **FR-DN-04:** For recurring donations, the system shall leverage Stripe's subscription capabilities to manage the billing cycle.
    *   **FR-DN-05:** Upon successful donation, the system shall send an automated tax-deductible receipt to the donor's email address via AWS SES.
    *   **FR-DN-06:** All donation records (including donor info, amount, frequency, and transaction ID) must be stored in the database and be accessible for export by `Admin` and `Finance` roles.
*   **Acceptance Criteria:**
    *   A user can make a one-time donation and receive a receipt.
    *   A user can set up a monthly recurring donation and receive a receipt for the initial payment.
    *   An admin with `Finance` role can view a list of all donations and export it as a CSV file.

### 2.2. Admin Dashboard & Content Management

*   **Description:** A secure, password-protected backend interface for temple staff to manage the website's content, users, and transactions without developer intervention.
*   **User Story:** "As an Event Manager, I want to log in and add a new cultural event to the calendar, including its description and date, without needing to write any code."
*   **Functional Requirements:**
    *   **FR-AD-01:** The system shall provide a secure login portal for administrative users, managed by AWS Cognito.
    *   **FR-AD-02 (User Role Management):** The system shall support role-based access control (RBAC). An `Admin` can create, edit, and assign users to the following roles:
        *   **Admin:** Full access to all site settings, content, users, and reports.
        *   **Editor:** Can create, edit, and publish content (pages, posts, events) but cannot manage users or access financial reports.
        *   **Event Manager:** Can only create, edit, and publish content within the Event Calendar.
        *   **Finance:** Can view and export donation and sponsorship reports but cannot edit site content or manage users.
    *   **FR-AD-03 (Content Management):** The dashboard shall provide a user-friendly interface (WYSIWYG editor via Headless CMS) for managing all public-facing pages (Home, About, etc.).
    *   **FR-AD-04 (Submission Management):** The dashboard shall display all Puja Sponsorship form submissions in a sortable, filterable table.
    *   **FR-AD-05 (Reporting):** `Admin` and `Finance` users must be able to export donation and sponsorship data to a CSV file. The export must include fields like Name, Email, Amount, Date, and Type (Donation/Sponsorship).
    *   **FR-AD-06 (Audit Log):** The system shall maintain an audit log of all major actions performed by admin users (e.g., content published, user role changed, settings modified).

---

## 3. Data Requirements

The following outlines the primary data models required for the application.

### 3.1. Puja Service Model
Used to populate the Puja Services catalog and sponsorship form dropdown.

```typescript
// Prisma Schema Example for PujaService
model PujaService {
  id          String   @id @default(cuid())
  name        String   @unique
  description String
  price       Float
  isAvailable Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### 3.2. Puja Schedule Entry Model
Used for the public-facing puja schedule.

```typescript
// Prisma Schema Example for PujaScheduleEntry
model PujaScheduleEntry {
  id        String   @id @default(cuid())
  pujaName  String
  startTime DateTime
  endTime   DateTime
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### 3.3. Sponsorship Request Model
Stores data from the Puja Sponsorship form.

```typescript
// Prisma Schema Example for SponsorshipRequest
model SponsorshipRequest {
  id              String   @id @default(cuid())
  sponsorName     String
  sponsorEmail    String
  sponsorPhone    String
  pujaServiceId   String   // Foreign key to PujaService
  pujaDate        DateTime
  sankalpamNames  String?
  attachmentUrl   String?
  amountPaid      Float
  transactionId   String   @unique // Stripe Charge ID
  status          String   // e.g., "Paid", "Confirmed"
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

### 3.4. Donation Model
Stores data for all one-time and recurring donations.

```typescript
// Prisma Schema Example for Donation
model Donation {
  id              String   @id @default(cuid())
  donorName       String
  donorEmail      String
  amount          Float
  frequency       String   // "OneTime" or "Monthly"
  stripeCustomerId String?  // For recurring
  stripeSubId     String?  // For recurring
  transactionId   String   @unique
  createdAt       DateTime @default(now())
}
```

---

## 4. Non-Functional Requirements

| Category | Requirement |
|---|---|
| **Performance** | **NFR-01:** Pages must achieve a Google PageSpeed Insights score of 85+ for mobile. Time to Interactive (TTI) should be under 3 seconds on a standard 4G connection. |
| **Scalability** | **NFR-02:** The architecture must handle traffic spikes of at least 10x normal traffic during major festivals without degradation in performance, leveraging AWS serverless auto-scaling. |
| **Security** | **NFR-03:** All data transmission must be encrypted via HTTPS. Personally Identifiable Information (PII) must be encrypted at rest. The application must be protected against common web vulnerabilities (OWASP Top 10). |
| **Security** | **NFR-04:** All payment processing must be handled by a PCI-compliant provider (Stripe). No sensitive credit card information shall be stored on the application servers. |
| **Availability** | **NFR-05:** The website shall maintain a 99.9% uptime, excluding scheduled maintenance windows. |
| **Usability** | **NFR-06:** The website must be fully responsive and provide an optimal user experience on devices ranging from mobile phones to desktop monitors. |
| **Accessibility** | **NFR-07:** The website shall adhere to WCAG 2.1 Level AA accessibility standards. |
| **Maintainability** | **NFR-08:** The codebase must follow the standards defined in the `.cursorrules` file, with clear documentation and consistent naming conventions to facilitate long-term maintenance. |

---

## 5. Appendices

### Appendix A: `.cursorrules` File Content
This file should be created at the root of the project to guide AI-assisted development in Cursor IDE.

```
# .cursorrules

## About the project
- This is a website for the Vishnu Mandir of Tampa, a Hindu temple.
- The site's primary goals are to provide information (puja schedules), enable online transactions (donations, sponsorships), and be easy for temple staff to manage.
- The aesthetic should be traditional, spiritual, and serene.
- Key Users: Devotees, Donors, Temple Admins.

## Tech Stack
- Frontend: Next.js 14+ (App Router) with TypeScript and Tailwind CSS.
- Backend API: Node.js with Express and TypeScript, deployed as serverless Lambda functions via API Gateway.
- Database: PostgreSQL, accessed via Prisma ORM.
- Deployment: AWS Amplify for CI/CD and hosting.
- Auth: AWS Cognito for admin users.
- Payments: Stripe SDK.
- Emails: AWS SES.
- CMS: Strapi (Headless).

## Coding Standards
- **Language**: Use TypeScript for all frontend and backend code. Enforce strict type checking.
- **Styling**: Use Tailwind CSS for all styling. Do not write custom CSS files unless absolutely necessary for a complex animation.
- **Components**: Create reusable React components for UI elements. Follow a clear props interface definition for each component.
- **State Management**: For simple client-side state, use React's built-in `useState` and `useContext` hooks. For complex global state, consider Zustand.
- **API Routes**: In Next.js, structure API routes logically under `app/api/`. All routes should include request validation (e.g., using Zod) and proper error handling.
- **Prisma**: Use Prisma for all database interactions. Do not write raw SQL queries. Define all models in `prisma/schema.prisma`.
- **Naming**: Use camelCase for variables and functions. Use PascalCase for component and type names.
- **Linting/Formatting**: Adhere to the rules defined in `.eslintrc.json` and `.prettierrc`. Always run the linter before committing.
- **Comments**: Write JSDoc comments for all functions, components, and types explaining their purpose, parameters, and return values.

## Prompting Guidance for AI
- When asked to create a new component, also create a Storybook file for it.
- When creating an API endpoint, include input validation, authentication checks, and structured JSON responses for success and error states.
- When modifying the database schema, remember to generate a new Prisma migration file (`npx prisma migrate dev --name <migration_name>`).
```

### Appendix B: `changelog.md` Initial Content

```markdown
# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0-alpha] - 2023-10-27

### Added
- **AI [Setup]**: Initialized project structure and documentation.
- **AI [Docs]**: Created the first version of the BRD/FRD document to outline project goals, scope, and technical requirements.
- **AI [Config]**: Generated the `.cursorrules` file to establish coding standards and project context for AI-assisted development.
- **AI [Config]**: Created this `changelog.md` file for tracking changes.
```

### Appendix C: Glossary of Terms

| Term | Definition |
|---|---|
| **BRD** | Business Requirements Document. A high-level document outlining the project goals and business needs. |
| **FRD** | Functional Requirements Document. A detailed document specifying the functions, features, and behaviors the system must perform. |
| **MVP** | Minimum Viable Product. The version of the new website with just enough features to be usable by early customers who can then provide feedback for future product development. |
| **Puja** | A Hindu worship ritual of devotional service and prayer. |
| **Sankalpam** | A declaration of intent to perform a specific ritual or puja, often including the names of the sponsors and their family. |
| **Jamstack** | A modern web development architecture based on client-side JavaScript, reusable APIs, and prebuilt Markup. |
| **SSG/ISR** | Static Site Generation / Incremental Static Regeneration. Next.js features for pre-building pages at build time or on-demand for high performance. |
| **Headless CMS** | A content management system where the content repository ("body") is separated from the presentation layer ("head"). |
| **AWS** | Amazon Web Services. A cloud computing platform providing a wide range of services. |

```