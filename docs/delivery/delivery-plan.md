```markdown
# Delivery Plan: Vishnu Mandir, Tampa

| | |
|---|---|
| **Document Type** | Delivery Plan |
| **Project** | Vishnu Mandir, Tampa Website |
| **Category** | delivery |
| **Version** | 1.0 |
| **Date** | 2023-10-27 |
| **Author** | Technical Writer |

## 1. Overview

This document outlines the phased delivery plan and rollout strategy for the new Vishnu Mandir website. The primary objective of this strategy is to launch a Minimum Viable Product (MVP) that rapidly delivers on the highest-priority project goal: **serving devotees with accurate, up-to-date information.**

Following the MVP launch, subsequent phases will iteratively introduce features for community engagement, self-service transactions, and administrative automation. This phased approach mitigates risk, accelerates time-to-value, and allows for feedback to inform later stages of development, ensuring the final product is robust, scalable, and perfectly aligned with the Mandir's needs.

## 2. Rollout Strategy & Phasing

The project will be delivered in three distinct phases, each with a clear strategic goal. This ensures a focused and manageable development cycle.

*   **Phase 1: Minimum Viable Product (MVP) — Foundational Information**
    *   **Goal:** Establish the website as the single source of truth for core temple information, focusing on the primary needs of devotees. This phase prioritizes content delivery, performance, and reliability.

*   **Phase 2: Community Engagement & Self-Service**
    *   **Goal:** Enable digital participation and simplify key transactions. This phase introduces interactive elements like forms, event calendars, and initial online payment capabilities.

*   **Phase 3: Administrative Automation & Future Growth**
    *   **Goal:** Reduce the manual workload for temple staff and build a scalable foundation for future features. This phase focuses on advanced payment models, reporting, and enhanced security.

## 3. Phase 1: Minimum Viable Product (MVP) - Core Information

The MVP is tightly scoped to launch the site quickly with the most critical information for the devotee audience. All features in this phase are content-focused and do not require complex backend transaction logic.

### 3.1. Features & Scope

| Category | Feature | Description |
|---|---|---|
| **Public Website** | **Homepage** | Displays key announcements, highlights for the next major festival, and quick links to core content like schedules and services. |
| | **Deities / Temple Info** | Static pages detailing the temple's deities, mission, vision, and leadership. |
| | **Puja Schedule** | A clear, easy-to-read daily/weekly puja schedule. This will be a content-managed page. |
| | **Puja Services List** | A catalog-style page listing available puja services with descriptions and pricing. This is informational only; sponsorship forms will be in Phase 2. |
| | **Priests Page** | Information about the temple priests. |
| **Admin & Content**| **Headless CMS** | Strapi CMS will be configured to allow Admins and Editors to manage all content for the pages listed above. |
| | **Basic User Roles**| Roles for `Admin` and `Editor` will be configured in the CMS to control content publishing permissions. |
| **Non-Functional**| **Core Architecture** | The site will be built with Next.js and deployed on AWS Amplify, leveraging Static Site Generation (SSG) and Incremental Static Regeneration (ISR) for optimal performance and SEO. |
| | **Mobile-First Design**| The layout will be fully responsive and optimized for a seamless experience on mobile devices. |

### 3.2. Technical Implementation

*   **Frontend:** Next.js application hosted on **AWS Amplify**.
*   **Content Fetching:** Static pages (Deities, About) will use **Static Site Generation (SSG)** at build time. The Puja Schedule page will use **Incremental Static Regeneration (ISR)** to refresh content periodically (e.g., every hour) without a full site redeployment.
*   **Content Management:** A self-hosted **Strapi (Headless CMS)** instance will serve content via its API. This provides a user-friendly interface for temple staff to update schedules, announcements, and page content.
*   **Backend:** No custom backend (API Gateway/Lambda) is required for this phase, simplifying the initial deployment and reducing complexity.

### 3.3. Go-Live Criteria for Phase 1

*   All public-facing MVP pages are built and populated with final content.
*   The Strapi CMS is deployed and accessible to designated temple staff.
*   `Admin` and `Editor` roles are configured and tested.
*   Staff members designated as `Editors` are trained on how to update core content (schedules, announcements).
*   The website passes mobile responsiveness and performance tests on major browsers and devices.

---

## 4. Phase 2: Community Engagement & Self-Service

This phase builds upon the MVP's foundation by introducing interactive features that allow users to engage with the temple digitally and perform key transactions online.

### 4.1. Features & Scope

| Category | Feature | Description |
|---|---|---|
| **Public Website** | **Full Event Calendar** | A comprehensive calendar displaying cultural events, classes, and festivals, with filtering capabilities. |
| | **Puja Sponsorship Form**| An online form for devotees to request puja sponsorships. The form submission will trigger email notifications. |
| | **Facility Request Form**| An online form for requesting use of temple facilities. |
| **Transactions** | **One-Time Donations** | Integration with Stripe to securely accept one-time donations online. |
| **Backend** | **Serverless Functions** | **API Gateway** and **AWS Lambda** functions will be developed to process form submissions and donations. |
| | **Database** | **DynamoDB** will be used to store all form submissions (sponsorships, facility requests) for administrative tracking. |
| | **Email Notifications** | **Amazon SES** will be configured to send automated email confirmations to users upon form submission and notifications to the relevant temple staff inboxes. |
| **Admin & Content**| **Event Manager Role** | A new `Event Manager` role will be created in the CMS to manage the cultural and educational events in the calendar. |
| | **Form Submission Viewer** | A simple, secure admin view to see submitted forms. |

### 4.2. Technical Implementation

*   **Form Handling:** The frontend forms will submit data to a new endpoint in **API Gateway**, which triggers an **AWS Lambda** function.
*   **Lambda Logic:** The function will validate the input, store the submission data in a **DynamoDB** table, and use **Amazon SES** to send confirmation/notification emails.
*   **Payment Processing:** The donation flow will use the Stripe React SDK on the frontend to tokenize payment information. A dedicated Lambda function will handle the `charge` creation via the Stripe API.

### 4.3. Go-Live Criteria for Phase 2

*   End-to-end flows for Puja Sponsorship, Facility Request, and One-Time Donations are fully tested.
*   Email notifications are correctly routed and formatted.
*   Form submissions are successfully stored in DynamoDB and accessible to admins.
*   The new `Event Manager` role functions as expected.

---

## 5. Phase 3: Administrative Automation & Future Growth

The final phase focuses on optimizing administrative workflows and implementing features that enhance scalability and prepare the platform for future capabilities like live streaming.

### 5.1. Features & Scope

| Category | Feature | Description |
|---|---|---|
| **Transactions** | **Recurring Donations** | Integration with **Stripe Billing** to allow devotees to set up monthly or annual recurring donations. |
| **Public Website** | **Newsletter Archives** | A page where PDF versions of past newsletters can be uploaded and displayed for download. |
| **Admin & Auth** | **Secure Admin Login** | **Amazon Cognito** will be implemented to provide secure, managed authentication for all admin and staff users. |
| | **Finance Role & Reporting**| A `Finance` role with permissions to view financial data. A feature to export donation and sponsorship records as a CSV file will be created. |
| | **Audit Logging** | A system to log key administrative actions (e.g., content published, settings changed) for accountability. |
| **Infrastructure**| **Media Storage** | **Amazon S3** will be configured to store user-uploaded media like newsletter PDFs. |

### 5.2. Technical Implementation

*   **Recurring Payments:** This requires a more advanced Stripe integration to manage subscriptions, customers, and payment plans. **Stripe Webhooks** will be used to listen for events like successful renewals or payment failures, triggering Lambda functions to update records.
*   **Reporting:** A new Lambda function will be created that can be invoked by a `Finance` user. This function will query DynamoDB (or an RDS database if relational needs grow) and generate a CSV file, providing a secure download link.
*   **Authentication:** The admin panel will be integrated with **Amazon Cognito** for user authentication, removing the need for CMS-native user management and providing a more robust security posture.
*   **Audit Trail:** An `Audit` Lambda function will be triggered by key events (or called from other functions) to log actions with timestamps and user details into a dedicated DynamoDB table.

### 5.3. Go-Live Criteria for Phase 3

*   The recurring donation lifecycle (creation, payment, cancellation) is fully tested.
*   Admin login via Cognito is secure and reliable.
*   CSV reports are generated accurately.
*   Audit logs are being created for key admin actions.

## 6. High-Level Timeline

This timeline provides an estimated duration for each phase, assuming all prerequisite content and stakeholder availability are met.

| Phase | Key Activities | Estimated Duration |
|---|---|---|
| **Phase 1 (MVP)** | Environment Setup, Core UI/UX, CMS Configuration, Content Population, Testing & Launch | 4-6 Weeks |
| **Phase 2** | Backend API/Lambda Dev, Form Building, Stripe (1-Time) Integration, Testing & Release | 4-5 Weeks |
| **Phase 3** | Stripe Billing Integration, Reporting Feature, Cognito Auth, Audit Log, Testing & Release | 3-4 Weeks |
| **Total** | **End-to-End Project Delivery** | **11-15 Weeks** |

## 7. Deployment & Go-Live Strategy

We will follow a modern Git-based CI/CD workflow using AWS Amplify's built-in capabilities. This ensures a stable, predictable, and automated deployment process.

### 7.1. Environment Strategy

The project will use three distinct environments tied to Git branches:

*   **`development` Branch:** Deploys to a development environment. This is used for daily work-in-progress and feature development.
*   **`staging` Branch:** Deploys to a staging environment. This is used for User Acceptance Testing (UAT) and stakeholder review before a public release. It will connect to a staging version of the CMS and Stripe in test mode.
*   **`main` Branch:** Deploys to the production environment. Merging into this branch is a protected action and signifies a public release.

### 7.2. Go-Live Checklist (Phase 1 Launch)

1.  [ ] **Content Freeze:** All MVP content provided by Vishnu Mandir team is finalized and loaded into the staging CMS.
2.  [ ] **UAT Sign-off:** Stakeholders complete a final review of the `staging` site and provide official sign-off.
3.  [ ] **Domain & DNS:** DNS records for the production domain are configured and ready for the cutover to AWS Amplify.
4.  [ ] **Production Deployment:** The `staging` branch is merged into `main`, triggering the final production build and deployment.
5.  [ ] **Smoke Testing:** The development team conducts a post-launch check on the live site to confirm all critical paths are functional.
6.  [ ] **Handover:** Admin credentials and training documentation are handed over to the temple staff.

## 8. Post-Launch Support & Maintenance

Our goal is to ensure the website remains secure, performant, and reliable long after launch.

*   **Initial Hypercare Period (2 Weeks Post-Launch):** The development team will be on high alert to rapidly address any bugs or critical issues discovered after the Phase 1 launch.
*   **Ongoing Maintenance:** A long-term maintenance plan will be established to handle:
    *   Regular software updates (Next.js, CMS, AWS services).
    *   Security monitoring and patching.
    *   Performance monitoring via AWS CloudWatch, with alarms set for unusual traffic spikes or errors.
*   **Support Partnership:** As discussed, a support agreement can be arranged for ongoing technical assistance, feature enhancements, and general operational support, complementing the in-house team's capabilities.
```