# Non-Functional Requirements (NFR)

**Project:** Vishnu Mandir, Tampa Website
**Document Type:** Non-Functional Requirements
**Version:** 1.0
**Date:** 2023-10-27

---

## 1. Introduction

### 1.1 Document Purpose
This document outlines the Non-Functional Requirements (NFRs) for the Vishnu Mandir of Tampa website. NFRs define the quality attributes, operational characteristics, and design constraints of the system. They are critical for ensuring the website is performant, secure, reliable, and usable for all target audiences. These requirements supplement the functional requirements, which describe *what* the system does, by defining *how well* the system does it.

### 1.2 Project Overview
The Vishnu Mandir website serves as a central hub for devotees, event attendees, and the wider community. Its primary goals are to provide accurate and timely information (puja schedules, events), foster community participation, enable self-service transactions (donations, sponsorships), and reduce the administrative workload for temple staff. The technical architecture is based on a modern, scalable serverless/Jamstack approach using AWS services.

### 1.3 Scope
This document covers the following NFR categories:
- Performance
- Availability and Reliability
- Security
- Usability and Accessibility
- Maintainability and Supportability
- Compatibility
- Search Engine Optimization (SEO)

These requirements apply to all public-facing website modules, transactional forms, and the administrative back-office.

---

## 2. Performance Requirements

Performance is a critical factor for user retention and satisfaction, especially on mobile devices. The architecture must be optimized for fast load times and responsive interactions, even under heavy load.

### 2.1 Response Time and Load Time
The website must adhere to a mobile-first performance budget to ensure a fast experience for all users.

| Metric | Target | Description |
| --- | --- | --- |
| **Server Response Time (TTFB)** | < 200ms | Time To First Byte for server-rendered or API responses. |
| **Largest Contentful Paint (LCP)**| < 2.5 seconds | Perceived load speed for the main content on a page. |
| **First Input Delay (FID)** | < 100ms | Quantifies the experience users feel when trying to interact with the page. |
| **Cumulative Layout Shift (CLS)** | < 0.1 | Measures visual stability to prevent unexpected layout shifts. |

**Implementation:**
- **Static Site Generation (SSG):** Pages like "Deities," "About Us," and "Puja Services Catalog" will be pre-rendered at build time for instant loading.
- **Incremental Static Regeneration (ISR):** Content-heavy pages that change periodically (e.g., festival pages, schedules) will use ISR to rebuild in the background without requiring a full site deployment.
- **Image Optimization:** All images will be automatically optimized and served in modern formats (e.g., WebP) via a service like AWS S3 + CloudFront or Next.js Image Optimization.

### 2.2 Scalability and Concurrency
The system must automatically scale to handle significant, sudden increases in traffic during major festivals and events without performance degradation or manual intervention.

| Scenario | Concurrent Users (Baseline) | Concurrent Users (Peak) |
| --- | --- | --- |
| **Standard Day** | 200 | 500 |
| **Major Festival/Event** | 500+ | 5,000+ |

**Implementation:**
- The serverless architecture (AWS Lambda, API Gateway) is inherently scalable. Lambda functions will automatically scale to meet the demand of API requests (e.g., form submissions, donations).
- The frontend, hosted on AWS Amplify or S3/CloudFront, leverages a global Content Delivery Network (CDN) to serve static assets from edge locations close to the user, reducing latency and handling high traffic loads efficiently.

---

## 3. Availability and Reliability Requirements

The website must be consistently available to serve the community, especially during critical periods like religious festivals.

### 3.1 Uptime
- The website shall achieve an uptime of **99.9%** (approximately 8.77 hours of downtime per year).
- This excludes scheduled maintenance, which will be communicated in advance and performed during low-traffic hours (e.g., 2 AM - 4 AM EST).

### 3.2 High Availability Strategy
The infrastructure is designed for high availability by default.
- **AWS CloudFront/S3:** These services are inherently fault-tolerant and replicated across multiple AWS Availability Zones (AZs).
- **AWS Lambda:** Functions are stateless and run in a highly available compute environment across multiple AZs.
- **Database:** If using Amazon RDS, it will be configured in a Multi-AZ deployment for automatic failover. If using DynamoDB, it provides built-in high availability and durability.

### 3.3 Backup and Recovery
A robust backup and recovery plan is required to prevent data loss.

- **Recovery Time Objective (RTO): 4 hours.** The maximum acceptable time for the website and its services to be restored after a disaster.
- **Recovery Point Objective (RPO): 24 hours.** The maximum acceptable amount of data loss, measured in time.

**Implementation:**
- **Database:** Amazon RDS or DynamoDB will have automated daily backups and Point-In-Time Recovery (PITR) enabled, allowing restoration to any second within the retention period (e.g., 7 days).
- **Uploaded Assets:** All user-uploaded content (e.g., newsletter PDFs, form attachments) stored in S3 will have versioning enabled to protect against accidental deletion or overwrites.
- **Infrastructure as Code (IaC):** The AWS Amplify configuration or custom IaC (e.g., CloudFormation, Terraform) scripts will be version-controlled in Git, allowing for rapid re-deployment of the entire infrastructure if necessary.

---

## 4. Security Requirements

Protecting devotee information and financial transactions is of the utmost importance. The system must adhere to security best practices at all levels.

### 4.1 Data Protection and Privacy
- **Encryption in Transit:** All communication between the client (browser) and the server must be encrypted using **TLS 1.2 or higher**. The site will enforce HTTPS-only access.
- **Encryption at Rest:** All stored Personally Identifiable Information (PII), such as names, email addresses, and phone numbers, must be encrypted at rest in the database (DynamoDB or RDS).
- **PII Handling:** The system must not log sensitive PII in general application logs. Any data exports (e.g., CSVs of donors) must be accessible only to authorized roles (e.g., 'Finance').

### 4.2 Authentication and Authorization
- **Admin Authentication:** Administrative access will be managed by **AWS Cognito**, which provides features like Multi-Factor Authentication (MFA), password policies, and secure user session management.
- **Role-Based Access Control (RBAC):** The system will implement a strict RBAC model to ensure users can only perform actions and access data appropriate for their role. The defined roles are:
    - **Admin:** Full control over the system, including user management.
    - **Editor:** Can create, edit, and publish content (pages, posts, events).
    - **Finance:** Can access and export donation and sponsorship reports.
    - **Event Manager:** Can manage the event calendar and cultural program pages.

### 4.3 Secure Transactions
- **PCI Compliance:** The application will **not** store, process, or transmit any credit card numbers. All payment processing will be delegated to **Stripe**, a certified PCI DSS Level 1 Service Provider.
- **Integration Method:** Payment forms will use **Stripe.js (Elements)** on the frontend to securely send payment information directly to Stripe's servers. The backend will interact with Stripe via secure tokens and API calls to create charges and manage subscriptions.
- **Webhook Security:** Webhooks received from Stripe (e.g., `payment_intent.succeeded`) must be verified using the webhook signing secret to ensure they are legitimate.

### 4.4 Audit and Logging
- An immutable audit trail of critical administrative actions must be maintained for accountability and security analysis.
- **Actions to be logged:**
    - User login success/failure.
    - Content creation, modification, or deletion (e.g., a puja schedule update).
    - User role/permission changes.
    - Generation/export of financial or PII-related reports.
- **Log Contents:** Each audit log entry must include a timestamp, the responsible user's ID, the action performed, the target resource, and the originating IP address.
- **Implementation:** Audit logs can be implemented using a dedicated DynamoDB table with a stream connected to a Lambda for alerting on suspicious activity, or by structuring logs sent to AWS CloudWatch Logs.

---

## 5. Usability and Accessibility Requirements

The website must be intuitive, easy to navigate, and accessible to all users, including those with disabilities.

### 5.1 User Interface (UI) and Experience (UX)
- **Aesthetic:** The design shall be **traditional, serene, and friendly**, reflecting the spiritual nature of the Mandir. It will use the specified color palette (Golden Amber, Royal Blue, Cream White).
- **Responsiveness:** The layout must be fully responsive and follow a **mobile-first design** philosophy, providing an optimal experience on devices ranging from small mobile phones to large desktop monitors.
- **Navigation:** The primary navigation must be clear, consistent, and easy to use, allowing users to find key information (schedules, events, donations) within a maximum of three clicks.
- **Dark Mode:** The website shall offer an optional dark mode to improve readability in low-light conditions and reduce eye strain.

### 5.2 Accessibility
- The website must conform to the **Web Content Accessibility Guidelines (WCAG) 2.1 Level AA**. This includes, but is not limited to:
    - Providing text alternatives (`alt` text) for all non-decorative images.
    - Ensuring all functionality is operable via a keyboard.
    - Maintaining a color contrast ratio of at least 4.5:1 for normal text.
    - Using proper semantic HTML5 elements (`<nav>`, `<main>`, `<article>`, etc.) and ARIA roles where necessary.

---

## 6. Maintainability and Supportability Requirements

The system should be easy to manage, update, and troubleshoot by both developers and non-technical temple administrators.

### 6.1 Code and Content Management
- **Code Standards:** The codebase will adhere to industry best practices, using tools like ESLint and Prettier for consistent formatting and quality. Naming conventions will be clear and predictable to support AI-assisted development tools like Cursor.
- **Content Management:** The Headless CMS (e.g., Strapi) must provide an intuitive, non-technical interface for temple staff (e.g., 'Editor' role) to publish announcements, update schedules, and manage event pages without developer assistance.

### 6.2 System Monitoring and Alerting
- **Monitoring:** Key system metrics will be monitored using **AWS CloudWatch**, including Lambda function invocations/errors, API Gateway latency/errors, and database performance.
- **Alerting:** Automated alerts will be configured to notify the development/support team of critical issues, such as:
    - A spike in Lambda function errors.
    - Payment processing webhook failures.
    - Sustained high CPU utilization on the database.

---

## 7. Compatibility Requirements

### 7.1 Browser Support
The website must be fully functional and render correctly on the latest two major versions of the following web browsers:
- Google Chrome
- Mozilla Firefox
- Apple Safari
- Microsoft Edge

### 7.2 Device Support
The website must support a wide range of devices, with a primary focus on mobile.
- **Mobile:** iOS and Android smartphones.
- **Tablet:** iPads and Android tablets.
- **Desktop:** Windows and macOS.

---

## 8. SEO Requirements

The website must be technically optimized for search engines to ensure high visibility for queries related to temple schedules, events, and services.

### 8.1 Technical SEO
- **Crawlability:** The site will generate and maintain an up-to-date `sitemap.xml` and a `robots.txt` file to guide search engine crawlers.
- **Indexing:** The use of Next.js with SSG/ISR ensures that all public pages are served as static HTML, which is easily indexed by search engines.
- **Structured Data:** The site will use **Schema.org** structured data (in JSON-LD format) to provide rich context to search engines. This is especially important for:
    - `Organization`: For the temple itself.
    - `Event`: For puja schedules, cultural events, and festivals.
    - `WebPage`: For standard content pages.

**Example: JSON-LD for a Cultural Event**
```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Diwali Cultural Program",
  "startDate": "2024-11-01T18:00:00-04:00",
  "endDate": "2024-11-01T21:00:00-04:00",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "eventStatus": "https://schema.org/EventScheduled",
  "location": {
    "@type": "Place",
    "name": "Vishnu Mandir, Tampa",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Mandir Lane",
      "addressLocality": "Tampa",
      "postalCode": "33601",
      "addressRegion": "FL",
      "addressCountry": "US"
    }
  },
  "image": [
    "https://www.vishnumandirtampa.org/images/diwali-2024.jpg"
   ],
  "description": "Join us for an evening of music, dance, and celebration for Diwali, the festival of lights.",
  "organizer": {
    "@type": "Organization",
    "name": "Vishnu Mandir, Tampa",
    "url": "https://www.vishnumandirtampa.org"
  }
}
```