Of course. Here is the comprehensive Testing Strategy document for the Vishnu Mandir, Tampa project, created in Markdown format.

---

```markdown
# Vishnu Mandir, Tampa - Testing Strategy

| **Document Type** | Testing Strategy |
| --- | --- |
| **Project** | Vishnu Mandir, Tampa |
| **Category** | Delivery |
| **Version** | 1.0 |
| **Date** | 2023-10-27 |
| **Status** | Final |

## 1. Introduction

### 1.1. Document Purpose

This document outlines the comprehensive testing strategy for the Vishnu Mandir, Tampa website project. Its purpose is to define the approach, methodologies, tools, and responsibilities for ensuring the delivery of a high-quality, reliable, and secure digital platform. The strategy covers all testing levels, from low-level unit tests for individual functions to high-level end-to-end tests for critical user journeys, aligning with the project's primary goals of serving devotees, enabling transactions, and reducing administrative overhead.

### 1.2. Project Overview

The Vishnu Mandir project aims to create a modern, serene, and highly functional website using a serverless Jamstack architecture (Next.js, AWS Lambda, PostgreSQL). The site will serve as a central hub for devotees and the community, providing puja schedules, event information, and enabling self-service transactions like donations and puja sponsorships. A key component is a robust admin panel for temple staff to manage content and operations efficiently.

### 1.3. Scope of Testing

#### In Scope

*   **Frontend Application (Next.js):** All React components, pages, utility functions, and state management.
*   **Backend Services (AWS Lambda/API Gateway):** All API endpoints, business logic, and integrations with other AWS services (SES, S3, Cognito).
*   **Database Interactions (Prisma/PostgreSQL):** Data integrity, queries, and schema validation.
*   **Third-Party Integrations:** Payment processing (Stripe) and authentication (Cognito).
*   **Critical User Journeys:** Donation, puja sponsorship, event registration, and admin workflows.
*   **Non-Functional Requirements:** Performance under load, security, accessibility (a11y), and cross-browser compatibility.

#### Out of Scope

*   **Third-Party Platform Internals:** Testing the internal functionality of Stripe, AWS, or the Headless CMS. Our testing will be limited to the integration points.
*   **Live Production Environment:** Automated destructive testing will not be performed on the live production environment. Load testing will be conducted against a production-like staging environment.
*   **Hardware and Network Infrastructure:** Testing is focused on the application layer.

## 2. Quality Goals and Metrics

Our testing efforts are designed to validate the primary project goals.

| Project Goal | Quality Attribute | Key Performance Indicator (KPI) |
| --- | --- | --- |
| **Serve Devotees** | **Accuracy & Reliability** | All content (schedules, services) renders correctly from the CMS. 0 critical/high bugs related to information display at launch. |
| **Enable Transactions** | **Security & Integrity** | 100% of donation and sponsorship transactions are processed successfully and securely. Stripe webhook handlers are fully resilient. |
| **Drive Participation** | **Usability & Accessibility** | Critical user flows (e.g., finding an event) are intuitive. Lighthouse Accessibility score > 90. |
| **Reduce Admin Workload** | **Functionality & Efficiency** | All admin roles (Admin, Editor, Finance) function as per specifications. Key reports (CSV exports) are generated correctly. |
| **General Quality** | **Maintainability & Performance** | Unit test coverage > 80% for new code. Core Web Vitals (LCP, FID, CLS) in the "Good" range. |

## 3. Testing Levels and Types

We will employ a multi-layered testing approach, often referred to as the "Testing Pyramid," to ensure quality at every stage of development.

### 3.1. Unit Testing

Unit tests form the foundation of our quality strategy, verifying the smallest pieces of code in isolation.

*   **Scope:** Individual React components, utility functions, and AWS Lambda function handlers.
*   **Tools:**
    *   **Frontend:** [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).
    *   **Backend:** [Jest](https://jestjs.io/).
*   **Execution:** Run automatically via pre-commit hooks and in the CI/CD pipeline on every commit.
*   **Responsibility:** Developers.

**Example: Testing a React Component**
```javascript
// __tests__/PujaServiceCard.test.js
import { render, screen } from '@testing-library/react';
import PujaServiceCard from '../components/PujaServiceCard';

describe('PujaServiceCard', () => {
  it('renders service name and price correctly', () => {
    const service = { name: 'Archana', price: 21.00 };
    render(<PujaServiceCard service={service} />);

    expect(screen.getByText('Archana')).toBeInTheDocument();
    expect(screen.getByText('$21.00')).toBeInTheDocument();
  });
});
```

**Example: Testing a Lambda Handler**
```javascript
// __tests__/sponsorshipHandler.test.js
import { handler } from '../lambda/sponsorshipHandler';

describe('Sponsorship Lambda Handler', () => {
  it('returns a 400 error if email is missing', async () => {
    const event = {
      body: JSON.stringify({ name: 'Test User', puja: 'Special Puja' }),
    };
    const response = await handler(event);

    expect(response.statusCode).toBe(400);
    const body = JSON.parse(response.body);
    expect(body.message).toContain('Email is required');
  });
});
```

### 3.2. Integration Testing

Integration tests verify that different parts of the application work together as expected.

*   **Scope:**
    *   Frontend components interacting with API hooks.
    *   API endpoints interacting with the database via Prisma.
    *   Inter-service communication (e.g., API Gateway -> Lambda -> SES).
*   **Tools:**
    *   **Frontend:** Jest and React Testing Library (with mock API responses).
    *   **Backend:** [Supertest](https://github.com/visionmedia/supertest) with a test-specific database instance.
*   **Execution:** Run in the CI/CD pipeline on every pull request.
*   **Responsibility:** Developers.

**Example: Testing an API Endpoint**
```javascript
// __tests__/sponsorshipApi.test.js
import request from 'supertest';
import app from '../app'; // Your Express app
import { prisma } from '../lib/prisma';

// Clean up the test database after each test
afterAll(async () => {
  await prisma.sponsorshipRequest.deleteMany({});
  await prisma.$disconnect();
});

describe('POST /api/sponsorship', () => {
  it('should create a new sponsorship request and return 201', async () => {
    const response = await request(app)
      .post('/api/sponsorship')
      .send({
        name: 'Devotee Name',
        email: 'devotee@example.com',
        pujaId: 1,
        date: '2024-01-01',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data.email).toBe('devotee@example.com');
  });
});
```

### 3.3. End-to-End (E2E) Testing

E2E tests simulate real user journeys from start to finish, ensuring the entire application flow works correctly.

*   **Scope:** Critical user paths that define the website's success.
*   **Tool:** [Cypress](https://www.cypress.io/).
*   **Execution:** Run in the CI/CD pipeline against the staging environment before any deployment to production.
*   **Responsibility:** QA / Development Team.

**Critical Paths for E2E Testing:**

1.  **Recurring Donation Flow:**
    *   **Given** a user is on the donation page
    *   **When** they select a donation amount, choose the "Monthly" frequency, and fill in their payment details via the Stripe element
    *   **And** they submit the form
    *   **Then** they should be redirected to a "Thank You" page
    *   **And** they should receive a confirmation email via SES
    *   **And** a new recurring donation record should be created in the database.

2.  **Puja Sponsorship Flow:**
    *   **Given** a user is on the Puja Services page
    *   **When** they click "Sponsor this Puja" on a service
    *   **And** they fill out the sponsorship form with their details and desired date
    *   **And** they submit the form and complete payment
    *   **Then** they should see a confirmation message
    *   **And** an admin should receive an email notification
    *   **And** the request should appear in the admin panel's "Sponsorships" section.

3.  **Admin Content Update Flow:**
    *   **Given** an admin with the 'Editor' role is logged in
    *   **When** they navigate to the Events calendar and create a new event
    *   **And** they publish it
    *   **Then** the new event should immediately appear on the public-facing website calendar.

4.  **Admin User Management:**
    *   **Given** a super-admin is logged in
    *   **When** they create a new user with the 'Finance' role
    *   **Then** that new user should be able to log in and only see finance-related sections (e.g., donation reports) of the admin panel.

### 3.4. User Acceptance Testing (UAT)

UAT is the final phase of testing, where stakeholders validate that the system meets business requirements.

*   **Scope:** Stakeholders will test the application on the staging environment to confirm it meets their needs.
*   **Process:** A UAT plan with specific test cases and checklists will be provided to the UAT participants (e.g., "Verify you can create a cultural event," "Confirm the donation report format is correct").
*   **Responsibility:** Temple Admins, Finance Managers, Event Managers, and other designated staff.

### 3.5. Performance and Load Testing

This ensures the site remains fast and available, especially during high-traffic events like major festivals.

*   **Scope:** Key pages (Homepage, Calendar) and API endpoints (donations, form submissions).
*   **Tools:** [k6](https://k6.io/) or an AWS-native solution like Artillery on Lambda.
*   **Scenarios:**
    *   **Spike Test:** Simulate a sudden surge of users accessing the homepage and calendar just before a major festival.
    *   **Stress Test:** Gradually increase the load on the donation API to identify its breaking point.
*   **Goal:** Ensure API response times remain under 500ms and the site remains available under a load of 500 concurrent users.

### 3.6. Security Testing

*   **Scope:** Authentication, authorization (role-based access), payment data (PII), and protection against common web vulnerabilities (OWASP Top 10).
*   **Process:**
    *   **Automated Scanning:** Use `npm audit` and GitHub's Dependabot to scan for known vulnerabilities in dependencies.
    *   **Code Review:** Manually review all code related to authentication (Cognito), authorization, and payment processing (Stripe webhooks).
    *   **Penetration Testing (Optional):** A focused manual penetration test on the staging environment before initial launch.

### 3.7. Accessibility and Cross-Browser Testing

*   **Scope:** Ensuring the site is usable by people with disabilities and works across modern browsers.
*   **Tools:**
    *   **Accessibility:** [Axe DevTools](https://www.deque.com/axe/) for automated checks, manual keyboard navigation testing.
    *   **Cross-Browser:** [BrowserStack](https://www.browserstack.com/) or similar to test on the latest versions of Chrome, Firefox, Safari, and Edge (including mobile versions).
*   **Goal:** WCAG 2.1 AA compliance.

## 4. Test Environments

| Environment | URL/Access | Purpose | Data |
| --- | --- | --- | --- |
| **Local Development** | `localhost:3000` | Development and unit/integration testing. | Seeded, synthetic data. No real user data. |
| **Staging** | `staging.vishnumandirtampa.org` | E2E testing, UAT, performance testing, and stakeholder review. | Anonymized production data or realistic synthetic data. Connected to Stripe in test mode. |
| **Production** | `www.vishnumandirtampa.org` | Live user-facing website. | Real user and transactional data. |

## 5. Test Automation and CI/CD

Automation is key to maintaining quality and development velocity. We will use AWS Amplify's CI/CD capabilities, which integrate with our GitHub repository.

**Proposed CI/CD Pipeline (on Pull Request to `main`):**
1.  **Trigger:** Developer opens a pull request.
2.  **Build:** Amplify pulls the code and installs dependencies.
3.  **Lint:** Run ESLint to check for code style issues.
4.  **Unit & Integration Tests:** Run `npm test` to execute all Jest tests.
5.  **Build Application:** Run `npm run build` to ensure the Next.js app builds successfully.
6.  **Deploy to Preview:** Amplify deploys the PR to a temporary preview environment.
7.  **E2E Tests:** Cypress E2E tests are run against the preview environment.
8.  **Report:** Results are reported back to the GitHub pull request. A merge is blocked if any step fails.

## 6. Defect Management

All defects will be tracked as issues in our project's GitHub repository.

*   **Tool:** GitHub Issues.
*   **Process:**
    1.  **Discovery:** Anyone (developer, QA, stakeholder) can create a new issue.
    2.  **Triage:** The project lead reviews the issue, assigns a priority/severity, and assigns it to a developer.
    3.  **Resolution:** The developer fixes the bug and creates a pull request.
    4.  **Verification:** The fix is tested in the Staging environment.
    5.  **Closure:** Once verified, the issue is closed.

**Severity Levels:**

| Severity | Description | Resolution Time Goal |
| --- | --- | --- |
| **1 - Critical** | Blocks a critical user path (e.g., donations fail), data loss, or major security vulnerability. No workaround. | Within 4 business hours. |
| **2 - High** | Severely impacts a major feature, but a workaround exists. | Within 2 business days. |
| **3 - Medium** | Minor feature is not working as expected or a noticeable UI/UX issue. | Within 1 sprint. |
| **4 - Low** | Cosmetic issue, typo, or suggestion for improvement. | At team's discretion. |

## 7. Roles and Responsibilities

| Role | Testing Responsibilities |
| --- | --- |
| **Developers** | Write and maintain unit and integration tests for their code. Fix bugs assigned to them. Perform code reviews. |
| **QA / Test Lead** | Define and maintain the E2E test suite (Cypress). Execute performance and security tests. Triage bug reports. |
| **Project Lead** | Oversee the entire testing process, prioritize bugs, and make the final go/no-go decision for releases. |
| **Stakeholders (Temple Staff)** | Participate in UAT, provide feedback, and confirm that the application meets business requirements. |

## 8. Development Environment and Tooling

To ensure consistency and leverage AI for improved productivity, the development team will use **Cursor IDE**. The project repository will include specific configuration to optimize this workflow.

*   **.cursorrules File:** A `.cursorrules` file will be maintained at the root of the repository. It will contain high-level project context, coding standards, and architectural principles. This provides persistent context to the AI, ensuring generated code and suggestions adhere to our project's standards.
*   **changelog.md:** All significant changes, especially those generated or modified by AI, will be logged in `changelog.md`. This creates an audit trail and helps the team track the evolution of the codebase.
*   **Clear Naming and Structure:** The file and folder structure is designed to be self-documenting, which provides a clear context for both human developers and AI tools, leading to more accurate and relevant code generation.
```