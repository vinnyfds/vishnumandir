```markdown
# Architecture Overview: Vishnu Mandir, Tampa

| | |
|---|---|
| **Document Type** | Architecture Overview |
| **Project** | Vishnu Mandir, Tampa |
| **Category** | architecture |
| **Version** | 1.0 |
| **Date** | 2023-10-27 |
| **Author** | Technical Writing Expert |

## 1. Introduction

### 1.1 Purpose

This document provides a comprehensive overview of the proposed technical architecture for the new Vishnu Mandir, Tampa website. It serves as the high-level technical blueprint for the development team, outlining the components, interactions, and design principles required to build a scalable, maintainable, and secure digital platform. The primary goal is to fulfill the project's core objectives: serving devotees, driving community participation, enabling self-service transactions, and reducing the administrative workload for temple staff.

### 1.2 Guiding Principles

The architecture is founded on a modern Jamstack and serverless-first philosophy. This approach was chosen to meet the project's non-functional requirements for performance, scalability, and cost-efficiency.

*   **Performance First:** The site will be exceptionally fast for all users, globally. We will achieve this by pre-building pages and serving them from a Content Delivery Network (CDN).
*   **Scalability & High Availability:** The serverless backend will automatically scale to handle traffic spikes during major festivals without manual intervention or performance degradation.
*   **Enhanced Security:** Decoupling the frontend from the backend reduces the attack surface. Payments and sensitive data are handled by dedicated, secure services.
*   **Lower Cost of Ownership:** By using serverless components and a CDN, we eliminate the need for traditional, always-on servers, paying only for the compute resources we consume.
*   **Developer Experience & Maintainability:** A clear separation of concerns between the frontend (Next.js), backend (Serverless Functions), and content (Strapi) simplifies development, testing, and long-term maintenance.

## 2. System Architecture Diagram

The following diagram illustrates the high-level architecture, showing the relationship between the user, frontend, backend services, and third-party integrations.

```mermaid
graph TD
    subgraph "User's Browser"
        A[Devotee / Admin]
    end

    subgraph "AWS Amplify Platform"
        B[Next.js Frontend <br/>(SSG/ISR Pages on CloudFront CDN)]
        C[API Routes / Serverless Functions <br/>(Node.js + Express)]
        D[AWS Cognito <br/>(Admin Authentication)]
    end

    subgraph "Backend Services (AWS)"
        E[PostgreSQL on RDS <br/>(Managed via Prisma)]
        F[AWS SES <br/>(Email Service)]
        G[AWS S3 <br/>(File Storage for CMS)]
    end

    subgraph "Third-Party Services"
        H[Strapi Headless CMS <br/>(Self-Hosted)]
        I[Stripe API <br/>(Payment Processing)]
    end

    A -- "Views Website" --> B
    B -- "Fetches Dynamic Data / Submits Forms" --> C
    B -- "Fetches Content at Build Time" --> H
    A -- "Admin Login" --> D
    D -- "Secures Routes" --> B
    D -- "Authorizes API Calls" --> C
    C -- "Processes Payments via" --> I
    I -- "Sends Webhooks" --> C
    C -- "Reads/Writes Data" --> E
    C -- "Sends Emails (Receipts, Notifications)" --> F
    H -- "Stores Media Assets" --> G
```

## 3. Component Breakdown

### 3.1 Frontend

*   **Framework:** **Next.js with React**
    *   **Rationale:** Next.js is the ideal framework for this project, offering a powerful blend of rendering strategies. It enables excellent SEO and performance out-of-the-box.
    *   **Rendering Strategy:**
        *   **Static Site Generation (SSG):** The default for most content pages (Home, Deities, About, Puja Services, Festival info). Pages are pre-built at deployment time for maximum speed and SEO.
        *   **Incremental Static Regeneration (ISR):** Used for pages with content that updates periodically but not in real-time, such as the Puja Schedule or Event Calendar. The server will regenerate these pages in the background after a set time (e.g., every 5-10 minutes), ensuring content is fresh without requiring a full site redeploy.
        *   **Client-Side Rendering (CSR):** Used for interactive, user-specific interfaces like the admin dashboard and donation forms, where data is dynamic and personalized.
*   **Styling:** **Tailwind CSS**
    *   **Rationale:** A utility-first CSS framework that allows for rapid development of a consistent, responsive, and customizable UI that aligns with the "traditional and serene" design mood.
*   **Deployment & Hosting:** **AWS Amplify**
    *   **Rationale:** Amplify provides a seamless, Git-based CI/CD pipeline. It automatically provisions and configures the necessary infrastructure (S3 for hosting, CloudFront for CDN, Lambda for serverless functions) to host a Next.js application efficiently. This simplifies deployment and management significantly.

### 3.2 Backend (API & Business Logic)

*   **Framework:** **Node.js with Express.js (as Serverless Functions)**
    *   **Rationale:** The backend logic for handling form submissions, payment processing, and admin actions will be implemented as API routes within the Next.js application. AWS Amplify automatically deploys these routes as independent AWS Lambda functions connected via API Gateway. This is a "serverless-first" approach that is both scalable and cost-effective.
*   **Key API Endpoints:**
    *   `/api/forms/sponsorship`: Receives puja sponsorship form data, validates it, writes to the database, and triggers an email notification.
    *   `/api/forms/facility-request`: Handles facility rental requests.
    *   `/api/donations/create-checkout-session`: Creates a Stripe Checkout session for one-time or recurring donations.
    *   `/api/webhooks/stripe`: A dedicated endpoint to receive and process webhooks from Stripe (e.g., `checkout.session.completed`) to confirm payments, update the database, and send receipts via SES.
    *   `/api/admin/*`: A group of protected endpoints for admin-only actions, such as fetching reports or managing users.

### 3.3 Database

*   **Engine:** **PostgreSQL**
    *   **Rationale:** While DynamoDB is simpler, the requirement for exporting structured reports (donations, sponsorships) and potential future needs for complex queries make a relational database like PostgreSQL a more robust and flexible choice.
*   **ORM:** **Prisma**
    *   **Rationale:** Prisma provides a type-safe database client and powerful migration system that simplifies database interactions and ensures data integrity. It works seamlessly with Node.js and TypeScript.
*   **Hosting:** **AWS RDS (Relational Database Service)**
    *   **Rationale:** The PostgreSQL database will be hosted on AWS RDS. This managed service handles backups, patching, and scaling, reducing the operational burden on the team. The serverless functions will connect to the RDS instance securely within the AWS VPC.

A sample Prisma schema for sponsorships illustrates the data structure:

```prisma
// prisma/schema.prisma

model PujaSponsorship {
  id              String   @id @default(cuid())
  createdAt       DateTime @default(now())
  devoteeName     String
  email           String
  phone           String?
  pujaServiceName String
  pujaDate        DateTime
  amount          Int // Stored in cents
  notes           String?
  status          String   @default("PENDING") // e.g., PENDING, PAID, COMPLETED
  transactionId   String?  @unique
}

model Donation {
  id              String   @id @default(cuid())
  createdAt       DateTime @default(now())
  donorEmail      String
  amount          Int // Stored in cents
  frequency       String   // "one-time" or "recurring"
  stripeCustomerId String?
  status          String
}
```

### 3.4 Content Management System (CMS)

*   **Platform:** **Strapi (Headless CMS)**
    *   **Rationale:** Strapi provides a powerful and user-friendly interface for non-technical users (Admin, Editor, Finance, Event Manager) to manage all website content. Its headless nature means content is completely decoupled from the presentation layer.
    *   **Content Types:** We will define custom content types in Strapi for:
        *   Events (for the calendar)
        *   Puja Services (for the service catalog)
        *   Pages (for static content like "About Us")
        *   Posts (for announcements)
        *   Festivals
        *   Newsletter PDFs
*   **Role-Based Access Control (RBAC):** Strapi’s built-in RBAC is critical. We will configure roles as specified:
    *   **Admin:** Full control over content and user settings.
    *   **Editor:** Can create and publish content across most types.
    *   **Event Manager:** Limited to creating/managing events and cultural programs.
    *   **Finance:** Can view/export form submissions and donation-related data (if integrated) but not edit website content.
*   **Hosting:** **Self-Hosted**
    *   **Rationale:** Strapi will be self-hosted on a small, cost-effective cloud instance (e.g., AWS EC2 t3.small or DigitalOcean Droplet). This gives us full control over the data, plugins, and configuration. The Next.js frontend will fetch content from the Strapi API during the build process (for SSG) and on the client-side.

### 3.5 Authentication & Authorization

*   **Service:** **AWS Cognito**
    *   **Rationale:** Cognito is a robust, managed service for user authentication. It will be used exclusively for securing the admin section of the website. It provides features like multi-factor authentication (MFA) and integrates seamlessly with AWS Amplify.
    *   **Workflow:**
        1.  An admin user navigates to `/admin/login`.
        2.  The Next.js app redirects them to the Cognito Hosted UI for sign-in.
        3.  Upon successful login, Cognito returns a JWT (JSON Web Token) to the client.
        4.  Subsequent requests from the admin to protected pages or API routes will include this JWT in the Authorization header.
        5.  The Next.js middleware and API functions will validate the token to authorize the request.

### 3.6 Payments

*   **Provider:** **Stripe**
    *   **Rationale:** Stripe offers a best-in-class developer experience, comprehensive documentation, and a secure, PCI-compliant environment for handling payments. Stripe Elements or Stripe Checkout will be used on the frontend for a seamless user experience.
    *   **Workflow (Recurring Donation):**
        1.  User clicks "Donate" and selects a recurring amount.
        2.  Frontend calls `/api/donations/create-checkout-session`.
        3.  The serverless function creates a Stripe Checkout session with `mode: 'subscription'`.
        4.  User is redirected to the Stripe-hosted checkout page.
        5.  After successful payment, Stripe sends a `checkout.session.completed` webhook to `/api/webhooks/stripe`.
        6.  The webhook handler verifies the event, creates a `Donation` record in the PostgreSQL database, and triggers an email receipt via AWS SES.

### 3.7 Ancillary Services

*   **Email:** **AWS Simple Email Service (SES)**
    *   **Rationale:** A highly scalable and cost-effective email service for sending transactional emails, such as donation receipts, puja sponsorship confirmations, and admin notifications. It will be called from our backend Lambda functions.
*   **File Storage:** **AWS S3**
    *   **Rationale:** The Strapi CMS will be configured to use an S3 bucket for storing all media uploads (images, newsletter PDFs, etc.). This ensures that assets are stored durably and can be served efficiently via a CDN.

## 4. Data Flow Diagrams

### 4.1 Puja Sponsorship Workflow (Digital)

This workflow replaces the current manual, paper-based process.

1.  **Submission:** Devotee fills out the Puja Sponsorship form on the website and submits it.
2.  **API Call:** The Next.js frontend sends a POST request with the form data to `/api/forms/sponsorship`.
3.  **Processing:** The serverless function receives the request.
    *   It validates the input data.
    *   It creates a Stripe Checkout session for the specified puja amount.
    *   It creates a `PujaSponsorship` record in the PostgreSQL database with a `PENDING` status.
4.  **Payment:** The devotee is redirected to Stripe to complete the payment.
5.  **Webhook:** Upon successful payment, Stripe sends a webhook to `/api/webhooks/stripe`.
6.  **Confirmation:** The webhook handler function:
    *   Verifies the webhook signature.
    *   Updates the corresponding `PujaSponsorship` record in the database to `PAID` and stores the transaction ID.
    *   Triggers AWS SES to send a confirmation email to the devotee.
    *   Triggers AWS SES to send a notification email to the relevant temple staff/priest.

### 4.2 Content Publishing Workflow (New Event)

1.  **Login:** The `Event Manager` logs into the Strapi admin dashboard.
2.  **Create Content:** They navigate to the "Events" collection and create a new entry, filling in the title, date, description, and image.
3.  **Publish:** They save and publish the event. The content is now available via Strapi's API.
4.  **Trigger Rebuild (Optional):** A webhook can be configured from Strapi to AWS Amplify to trigger a re-build of the site, pre-rendering the new event page.
5.  **ISR Regeneration:** Alternatively, for pages using ISR (like `/calendar`), the Next.js server will automatically detect the new content on the next user request after the revalidation period has passed and regenerate the page in the background.
6.  **View:** The new event appears on the public website for all users.

## 5. Meeting Non-Functional Requirements

*   **Scalability & High Availability:** The serverless nature of AWS Amplify/Lambda and the global distribution of the CloudFront CDN ensure the site can handle massive, sudden traffic spikes during festivals without any degradation in performance.
*   **Performance:** SSG and ISR with a CDN front-end means users receive static HTML files almost instantly. Core Web Vitals will be excellent.
*   **Security:**
    *   **Payments:** Handled by Stripe, ensuring PCI compliance. No credit card data ever touches our servers.
    *   **Admin Access:** Secured by AWS Cognito with enforced MFA.
    *   **Infrastructure:** AWS IAM roles and security groups will be used to enforce the principle of least privilege for all backend services. All traffic is served over HTTPS.
*   **Maintainability & Administration:**
    *   The decoupled architecture allows frontend and backend teams to work independently.
    *   The Strapi CMS empowers non-technical staff to manage content, fulfilling a primary project goal of reducing admin workload.
    *   Admin actions will be logged in the database via API hooks to create an audit trail.

## 6. Future Considerations

This architecture provides a strong and flexible foundation for future growth.

*   **Live Streaming Pujas:** A service like AWS IVS (Interactive Video Service) or Mux can be integrated. The event data would be managed in Strapi, and the stream embedded into a Next.js page.
*   **Dedicated Mobile App:** The existing backend (API, Strapi, Cognito) can be reused to power a native mobile app (React Native, Swift, or Kotlin) with minimal changes.
*   **Full-Fledged Member Portal:** AWS Cognito can be expanded to manage devotee accounts, not just admins. This would enable personalized content, donation history, and other member-specific features. The relational PostgreSQL database is well-suited to handle the user-to-data relationships this would require.

## 7. Deployment & DevOps

The entire deployment process will be managed through **AWS Amplify's CI/CD pipeline**.

1.  The codebase will be stored in a Git repository (e.g., GitHub, GitLab).
2.  The Amplify project will be connected to the `main` branch.
3.  When new code is pushed to the `main` branch, Amplify automatically triggers a new build.
4.  The build process involves:
    *   Installing dependencies (`npm install`).
    *   Fetching content from the Strapi API.
    *   Building the Next.js application (generating static pages).
    *   Deploying the static assets to S3/CloudFront.
    *   Deploying the API routes as Lambda functions.
5.  After a successful deployment, the new version of the site is live. This provides a reliable, repeatable, and automated path from development to production.
```