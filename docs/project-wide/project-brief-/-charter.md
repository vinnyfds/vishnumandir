```markdown
# Project Brief & Charter: Vishnu Mandir, Tampa Website

| **Document Type** | Project Brief / Charter |
| :---------------- | :---------------------- |
| **Project Name**  | Vishnu Mandir, Tampa  |
| **Category**      | Project-Wide            |
| **Version**       | 1.0                     |
| **Date**          | 2023-10-27              |

---

## 1.0 Executive Summary

This document serves as the foundational charter for the Vishnu Mandir, Tampa website redevelopment project. Its purpose is to align all stakeholders—including temple administration, committee leads, developers, and volunteers—on a unified vision.

The new website will be a central digital hub for the devotee community. It is designed to achieve four primary goals: serve devotees with timely information, drive community participation, enable self-service transactions, and reduce the administrative workload for temple staff.

The Minimum Viable Product (MVP) will prioritize serving devotees with accurate, up-to-date information, specifically focusing on puja schedules, services, and essential event details. Subsequent phases will introduce more advanced transactional and community-building features.

The project will be built on a modern, scalable, and cost-effective serverless architecture using Next.js and AWS Amplify. This approach ensures high performance, security, and a flexible foundation for future growth, such as live streaming and a member portal.

## 2.0 Project Goals & Objectives

The project is guided by four core goals, each with specific, measurable objectives.

1.  **Serve Devotees with Accurate, Up-to-Date Information**
    *   **Objective:** Provide a single source of truth for all temple activities, ensuring all schedules, services, and event information are published and accessible on the website within 24 hours of being finalized.
    *   **Priority:** **High (MVP Focus)**

2.  **Drive Participation and Community Engagement**
    *   **Objective:** Increase awareness and attendance of cultural events, classes, and festivals by making them easily discoverable, shareable, and providing clear registration paths.

3.  **Enable Self-Service Digital Transactions**
    *   **Objective:** Digitize and automate 100% of puja sponsorships and standard donation requests, providing devotees with instant confirmation and reducing the need for in-person visits for these tasks.

4.  **Reduce Administrative Workload**
    *   **Objective:** Empower non-technical staff (Admins, Editors) to publish content, manage events, and review form submissions independently, reducing developer dependency for daily operations by 90%.

## 3.0 Scope of Work

### 3.1 In-Scope (MVP - Q1 Launch)

The MVP is focused on establishing the foundational information and transaction channels essential for serving the community.

**Public-Facing Modules:**
*   **Homepage:** Key announcements, "What's Happening Now," highlights of next major festival, and quick links to high-demand pages (Schedule, Donate, Services).
*   **Temple Information:** Pages for Deities, Mission, Vision, and Leadership.
*   **Religious Information:**
    *   Daily/Weekly Puja Schedule (dynamic calendar view).
    *   Puja Services Catalog (list of services with descriptions and pricing).
    *   Priests information page.
    *   Key Festival landing pages.
*   **Event Calendar:** A centralized calendar displaying all event types (pujas, cultural, educational).
*   **Forms:**
    *   Online Puja Sponsorship Form (replaces paper process).
    *   General Contact Form.
*   **Donations:**
    *   Donation page with one-time and recurring donation options via Stripe.

**Administrative Backend:**
*   **Content Management:** Ability for Admins/Editors to create/update pages, posts, and event entries.
*   **User Role Management:** Pre-configured roles (Admin, Editor, Finance, Event Manager).
*   **Form Submission Management:** A dashboard to view, sort, and export submissions from the Puja Sponsorship form.
*   **Donation Reporting:** Ability for Finance roles to view and export donation records (CSV format).

### 3.2 Phased Rollouts (Post-MVP)

Features to be developed and launched in subsequent phases include:
*   **Cultural & Education Sections:** Full build-out with media galleries and resource libraries.
*   **Advanced Forms:** Facility rental requests with automated routing.
*   **Newsletter Archive:** A searchable archive of past PDF newsletters.
*   **Volunteer Portal:** Dedicated pages for committee communications and postings.
*   **User Accounts:** A personalized member portal for devotees.

### 3.3 Out of Scope (For Initial Project)

The following features are explicitly out of scope for the initial project and MVP launch to ensure focus and timely delivery. They can be considered for future major versions (Year 2-3).
*   Live streaming of pujas or events.
*   A dedicated native mobile application (iOS/Android).
*   Integration with third-party accounting software (e.g., QuickBooks).
*   Integration with third-party email marketing platforms (e.g., Mailchimp).
*   E-commerce functionality beyond donations and sponsorships.

## 4.0 Key Stakeholders & Roles

*   **Primary Audience (Users):**
    *   **Devotees & Families:** Consumers of schedules, service info, and festival updates.
    *   **Event Attendees:** Users seeking information on cultural events and classes.
    *   **Donors & Sponsors:** Users performing financial transactions.
*   **Internal Stakeholders (Admins/Staff):**
    *   **Priests/Temple Staff:** Provide service details and scheduling information.
    *   **Volunteers/Committee Leads:** Coordinate and publish event/committee information.
    *   **Website Administrators:** Manage overall site health, users, and critical content.

## 5.0 Success Metrics & KPIs

Success will be measured against the project goals using the following Key Performance Indicators (KPIs).

| Goal                               | KPI                                                                                             | Measurement Target                                        |
| :--------------------------------- | :---------------------------------------------------------------------------------------------- | :-------------------------------------------------------- |
| 1. Serve Devotees with Information | Website is the first-ranked source on Google for "Vishnu Mandir Tampa schedule". Page load time < 2s. | Achieve within 3 months of launch. Maintain 99% uptime.    |
| 2. Drive Participation             | Month-over-month increase in traffic to `/events` and `/cultural` pages.                          | 10% average monthly growth in first 6 months.              |
| 3. Enable Self-Service             | Number of online puja sponsorships processed per month. Number of new recurring donors per month. | >80% of sponsorships processed online. 20+ new recurring donors in Q2. |
| 4. Reduce Admin Workload           | Time required for an editor to post a new event (from login to publish). Admin support tickets.  | < 5 minutes. Reduction in "how do I update X?" emails by 75%. |

## 6.0 Functional & Non-Functional Requirements

### 6.1 Core Features

*   **Event Calendar (High):** Displays daily pujas, cultural events, and festivals with filtering capabilities.
*   **Recurring Donations (High):** Secure, Stripe-integrated form for one-time and recurring donations.
*   **Puja Sponsorship Forms (High):** Structured online form to automate requests, with email confirmation to devotee and notification to the relevant temple team.
*   **User Role Management (High):** Admin panel for role-based access control (Admin, Editor, Finance, Event Manager).
*   **Newsletter Archives (Medium):** A page to store and display links to past newsletter PDFs.
*   **Mobile Accessibility (Medium):** Ensures a fast, responsive, and intuitive experience on all devices.

### 6.2 Non-Functional Requirements

*   **Performance:** Mobile-first design with a target Google Lighthouse Performance score of 90+.
*   **Scalability:** Architecture must handle significant traffic spikes during major festivals (e.g., Diwali, Navaratri) without performance degradation.
*   **Security:** All transactions must be processed via a PCI-compliant provider (Stripe). PII must be protected, and all data transmission encrypted (HTTPS).
*   **Availability:** Target uptime of 99.9%.
*   **Maintainability:** Codebase and infrastructure must be well-documented to facilitate a smooth handover and long-term maintenance.
*   **Audit Logging:** Admin actions (content creation, deletion, user changes) must be logged for accountability.
*   **SEO:** Site structure and pages must be optimized for search engines.

## 7.0 Technical Architecture & Stack

The project will leverage a Jamstack and serverless architecture for optimal performance, scalability, and cost-efficiency.

| Component         | Technology                               | Rationale                                                                        |
| :---------------- | :--------------------------------------- | :------------------------------------------------------------------------------- |
| **Frontend**      | **Next.js** with **Tailwind CSS**        | Enables fast, SEO-friendly pages via SSG/ISR. Excellent developer experience.      |
| **Backend API**   | **Node.js** with **Express**             | Robust, widely supported framework for building serverless functions.                |
| **Database**      | **PostgreSQL** with **Prisma**           | Provides relational data integrity for reporting. Prisma offers a modern, safe ORM. |
| **Deployment**    | **AWS Amplify**                          | A fully managed CI/CD, hosting, and backend provisioning service for web apps.   |
| **Payments**      | **Stripe**                               | Industry-leading, secure payment processing with excellent developer APIs.       |
| **Content**       | **Headless CMS** (Strapi recommended)    | Decouples content from presentation, empowering editors to manage content easily. |
| **Authentication**| **AWS Cognito**                          | Manages secure admin logins and role-based access.                               |
| **Email**         | **AWS SES (Simple Email Service)**       | Reliable, scalable service for transactional emails (confirmations, notifications). |
| **File Storage**  | **AWS S3 (Simple Storage Service)**      | Stores user uploads, media, and newsletter PDFs securely and cost-effectively.   |

### Architecture Diagram (Conceptual)
```
[Devotee/User Browser] <--> [AWS Amplify (Next.js Frontend on CloudFront)]
          |
          | (API Calls for Forms/Data)
          V
[API Gateway] <--> [AWS Lambda Functions (Node.js/Express)]
          |                  |                       |
          | (Auth)           | (Data R/W)            | (Emails)
          V                  V                       V
    [AWS Cognito]      [PostgreSQL on RDS]       [AWS SES]
                               |
                               | (File URLs)
                               V
                           [AWS S3]
```

## 8.0 Design & User Experience (UX)

### 8.1 Brand Identity & Mood
The website's aesthetic will be **spiritual, traditional, serene, and friendly**. It should feel welcoming and authentic, reflecting the cultural and spiritual values of the Vishnu Mandir. Imagery should highlight the temple's heritage, deities, and community.

### 8.2 Color Palette & Typography
*   **Primary:** `#d97706` (Golden Amber)
*   **Secondary:** `#3b82f6` (Royal Blue)
*   **Accent:** `#facc15` (Sunflower Yellow)
*   **Background:** `#fefce8` (Cream White)
*   **Text:** `#1f2937` (Charcoal Gray)

Typography will favor classic, highly-legible serif and sans-serif fonts that complement the traditional mood.

### 8.3 Layout & Responsiveness
*   **Layout:** A modern, clean landing page structure.
*   **Navigation:** A persistent top-navigation bar for easy access to core sections.
*   **Responsiveness:** The site will be fully responsive and mobile-first.
*   **Dark Mode:** Dark mode support will be included to enhance user preference and accessibility.

## 9.0 Project Governance & Operations

### 9.1 Content Management Workflow
*   **Daily/Weekly Pujas:** An "Editor" or "Priest" role can update schedules. An approval step may be required by a head priest or designated "Admin" before publishing.
*   **Cultural Events & Classes:** An "Event Manager" can create and submit event details. A review by the cultural committee lead (acting as an "Admin") is required before publishing to the main calendar.
*   **General Content:** An "Editor" can modify informational pages, with changes logged in the audit trail.

### 9.2 Roles & Responsibilities

*   **Admin:** Full access. Can manage users, approve content, and access all site settings.
*   **Editor:** Can create and manage content (pages, posts, events) but cannot publish major events without approval.
*   **Event Manager:** Can create and manage entries in the event calendar.
*   **Finance:** Can view and export donation and sponsorship reports but cannot modify content.

### 9.3 Post-Launch Support & Maintenance
While the internal team possesses AWS and CMS experience, a long-term maintenance and support partner will be considered to ensure high availability, security patching, and on-call support during critical festival periods.

## 10.0 Assumptions, Risks, and Dependencies

*   **Assumptions:**
    *   All new content (text, images, PDFs) will be provided in a web-ready format by the temple content team prior to the start of development sprints.
    *   Key stakeholders will be available for timely feedback and approvals during the project lifecycle.
*   **Risks:**
    *   **Content Bottleneck:** Delays in receiving content can impact the project timeline. (Mitigation: Establish a clear content delivery schedule).
    *   **Volunteer Availability:** Reliance on volunteers for content updates post-launch may lead to inconsistencies. (Mitigation: Create clear documentation and training materials for all admin roles).
*   **Dependencies:**
    *   **Stripe Account:** A functional Stripe account must be set up and configured for the temple.
    *   **Domain & DNS:** Access to the domain registrar and DNS settings is required for launch.

## 11.0 Development Environment & Standards (Cursor IDE)

To optimize for AI-assisted development and maintain high code quality, the project will adhere to standards compatible with the Cursor IDE.

*   **Project Structure:** Files and folders will be structured logically to maximize the AI's context window and understanding of the codebase.
*   **Naming Conventions:** Clear, descriptive, and consistent naming for files, components, variables, and functions will be used to help the AI learn the project's patterns.
*   **Changelog:** An `changelog.md` file will be maintained at the root of the project to track significant changes, especially those generated or modified by AI.
*   **Cursor Rules:** A `.cursorrules` file will be included in the project root to provide persistent context and coding instructions to the AI.

### Example `.cursorrules` File
```
# .cursorrules - Vishnu Mandir Tampa Website

## General Context
- This is a Next.js 14 (App Router) project for the Vishnu Mandir Tampa website.
- Frontend: Tailwind CSS for styling.
- Backend: Serverless functions via Next.js API Routes, deployed on AWS Amplify.
- Database: PostgreSQL with Prisma ORM.
- State Management: React Context or Zustand for simple state; avoid Redux.
- Authentication: Admin auth is handled by AWS Cognito.

## Coding Standards
- Use TypeScript for all new components and functions.
- Follow functional component patterns with React Hooks.
- All components must be responsive and mobile-first.
- Write docblocks for all exported functions and complex logic.
- For API routes, include robust error handling and return standardized JSON responses: `{ success: boolean, data: any | null, error: string | null }`.
- All environment variables must be prefixed with `NEXT_PUBLIC_` for client-side access or kept server-side otherwise.
```
```