# CI/CD Strategy: Vishnu Mandir Website

**Document ID:** VMT-DEL-001  
**Version:** 1.0  
**Date:** 2023-10-27  
**Category:** Delivery  
**Status:** Final

---

## 1.0 Introduction

### 1.1 Purpose

This document defines the Continuous Integration and Continuous Deployment (CI/CD) strategy for the Vishnu Mandir, Tampa website project. The primary goal is to establish a fully automated, reliable, and secure pipeline for building, testing, and deploying the application to AWS. This strategy ensures that every code change is validated and deployed efficiently, enabling rapid delivery of new features and bug fixes while maintaining high quality and availability.

### 1.2 Scope

This strategy covers the entire application lifecycle for the Vishnu Mandir website, including:
*   **Frontend Application:** The Next.js static and server-rendered site.
*   **Backend API:** The Node.js/Express API endpoints for forms, payments, and admin functions, managed as part of the Next.js application.
*   **Database:** The schema migration process for the PostgreSQL database.
*   **Infrastructure:** The deployment process managed by AWS Amplify.

### 1.3 Key Objectives

The CI/CD pipeline is designed to achieve the following objectives:
*   **Automation:** Eliminate manual build and deployment steps to reduce human error.
*   **Velocity:** Enable developers to merge and deploy code changes quickly and confidently.
*   **Reliability:** Ensure every deployment is thoroughly tested, reducing the risk of introducing bugs into production.
*   **Consistency:** Provide a standardized process for all environments (Preview, Staging, Production).
*   **Security:** Integrate security checks for secrets and dependencies directly into the pipeline.

## 2.0 Core Technologies & Architecture

### 2.1 Technology Stack

The CI/CD pipeline is built to support the project's recommended technology stack:
*   **Frontend:** Next.js with Tailwind CSS
*   **Backend:** Node.js with Express (integrated within Next.js API Routes)
*   **Database ORM:** Prisma
*   **Database:** PostgreSQL
*   **CI/CD & Hosting:** AWS Amplify

### 2.2 CI/CD Platform: AWS Amplify

AWS Amplify will serve as the core platform for both hosting and CI/CD. Its native integration with Git providers (e.g., GitHub, Bitbucket) and its managed build environment provide a streamlined, Git-based workflow. Amplify automatically provisions environments, builds the Next.js application, and deploys it globally via the AWS CloudFront CDN.

Key features we will leverage include:
*   **Git-based Workflows:** Connecting branches to distinct cloud environments.
*   **Preview Deployments:** Automatically deploying every pull request to a unique, temporary URL for review.
*   **Managed Builds:** Using a configurable `amplify.yml` file to define build and test commands.
*   **Environment Variables:** Securely managing secrets and configuration per environment.

## 3.0 Branching Strategy

A simplified Gitflow model will be used to manage code and trigger deployments. This strategy provides a clear separation between development, staging, and production states.

*   **`main`**
    *   **Purpose:** This branch represents the live, stable production code.
    *   **Deployment:** A merge into `main` automatically triggers a build and deployment to the **Production** environment.
    *   **Rule:** Only fully tested and approved code from the `develop` branch can be merged into `main`. Direct commits are prohibited.

*   **`develop`**
    *   **Purpose:** This is the primary integration branch where all completed features are merged. It represents the "next release."
    *   **Deployment:** A merge into `develop` automatically triggers a build and deployment to the **Staging** environment for User Acceptance Testing (UAT).
    *   **Rule:** Feature branches are merged into `develop` via pull requests.

*   **`feature/<name>`** or **`fix/<name>`**
    *   **Purpose:** All new features, enhancements, and bug fixes are developed in these branches, which are created from `develop`.
    *   **Deployment:** Pushing a new branch and creating a pull request against `develop` automatically triggers a build and deployment to a temporary **Preview** environment.
    *   **Rule:** Branches should be short-lived and focused on a single task.

![Branching Strategy Diagram](https://nv-assets.netlify.app/images/git-flow.png)

## 4.0 Pipeline Configuration & Stages

The CI/CD pipeline is defined in stages, with each stage performing specific tasks. The process varies slightly depending on the target branch.

### 4.1 Feature Branch Pipeline (Pull Request -> Preview)
This pipeline is triggered when a pull request is opened against the `develop` branch. Its purpose is to provide fast feedback and a live environment for review.

*   **Trigger:** Push to a `feature/*` or `fix/*` branch and open a pull request.
*   **Stages:**
    1.  **Provision:** AWS Amplify provisions a build container.
    2.  **Lint & Format:** Code is checked for quality and style consistency (`eslint`, `prettier`).
    3.  **Unit Test:** Component and function-level tests are executed (`jest`).
    4.  **Build:** The Next.js application is built (`next build`).
    5.  **Deploy to Preview:** The built application is deployed to a unique URL (e.g., `pr-123.develop.amplifyapp.com`). The URL is posted as a comment on the pull request.

### 4.2 Develop Branch Pipeline (Merge -> Staging)
This pipeline is triggered upon merging a pull request into the `develop` branch. It deploys to a stable environment for final testing and UAT.

*   **Trigger:** Merge commit to the `develop` branch.
*   **Stages:**
    1.  **Provision:** AWS Amplify provisions a build container.
    2.  **Lint & Format:** Run static analysis checks.
    3.  **Unit Test:** Run all unit tests.
    4.  **Integration Test:** Run tests that verify interactions between API routes and database logic.
    5.  **E2E Test:** Run critical-path end-to-end tests using Cypress (e.g., submitting a donation, filling a puja form).
    6.  **Build & Migrate:** Build the Next.js application and apply any pending database migrations using Prisma.
    7.  **Deploy to Staging:** Deploy the application to the persistent Staging environment.

### 4.3 Main Branch Pipeline (Merge -> Production)
This is the final pipeline that deploys the application to the live audience. It is triggered only after the Staging version has been approved.

*   **Trigger:** Merge commit from `develop` to the `main` branch.
*   **Stages:**
    1.  **Provision:** AWS Amplify provisions a build container.
    2.  **Lint & Format:** Run all static analysis checks.
    3.  **Unit & Integration Tests:** Run the full test suite to ensure no regressions.
    4.  **E2E Tests:** Run the complete E2E test suite against the production build configuration.
    5.  **Security Scan:** Perform an audit of package dependencies (`npm audit --production`).
    6.  **Build & Migrate:** Build the Next.js application for production and apply any pending database migrations.
    7.  **Deploy to Production:** Deploy the application to the Production environment, making it live for all users.

## 5.0 AWS Amplify Build Configuration (`amplify.yml`)

The `amplify.yml` file, placed in the root of the repository, defines the exact commands for the build process. It allows for different commands based on the phase (build, test, deploy) and branch.

Here is the reference configuration for this project:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci # Use ci for faster, deterministic installs
        - npx prisma generate # Generate Prisma Client
        - 'if [ "${AWS_BRANCH}" = "main" ] || [ "${AWS_BRANCH}" = "develop" ]; then npx prisma migrate deploy; fi' # Apply migrations only on staging/prod
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
test:
  phases:
    preTest:
      commands:
        - npm ci
        - npm run lint
    test:
      commands:
        - npm run test:ci # Runs Jest in CI mode
        # Example for adding E2E tests on specific branches
        - 'if [ "${AWS_BRANCH}" = "main" ] || [ "${AWS_BRANCH}" = "develop" ]; then npm run cypress:run; fi'
  artifacts:
    baseDirectory: cypress/videos # Save videos of failed E2E tests
    files:
      - '**/*.mp4'
```

### 5.1 Environment Variables

All secrets, API keys, and environment-specific configurations will be managed through the **Environment variables** section in the AWS Amplify Console. **Under no circumstances should secrets be committed to the Git repository.**

Key variables will include:
*   `DATABASE_URL`: PostgreSQL connection string (different for staging and prod).
*   `STRIPE_SECRET_KEY`: Stripe API secret key.
*   `STRIPE_PUBLIC_KEY`: Stripe public key.
*   `STRIPE_WEBHOOK_SECRET`: Secret for verifying Stripe webhooks.
*   `ADMIN_EMAIL_RECIPIENTS`: Comma-separated list of emails for form notifications.
*   `NEXTAUTH_SECRET`: Secret for session encryption.
*   `NEXT_PUBLIC_*`: Any public-facing variables needed by the frontend.

## 6.0 Testing Strategy

A multi-layered testing approach is essential for ensuring application quality.

| Test Type             | Framework/Tool              | Scope                                                                          | Pipeline Stage      |
| --------------------- | --------------------------- | ------------------------------------------------------------------------------ | ------------------- |
| **Static Analysis**   | ESLint, Prettier            | Code style, syntax errors, and formatting.                                     | All                 |
| **Unit Testing**      | Jest, React Testing Library | Individual React components, utility functions, and Next.js API route handlers.  | All                 |
| **Integration Testing**| Jest, Supertest             | Interactions between API routes and the Prisma/database layer.                 | `develop`, `main`   |
| **End-to-End (E2E)**  | Cypress                     | Critical user journeys: Puja sponsorship, recurring donation, admin login.     | `develop`, `main`   |
| **Dependency Scan**   | `npm audit`                 | Known vulnerabilities in third-party packages.                                 | `main`              |

## 7.0 Deployment & Environments

AWS Amplify will manage three distinct environment types, each tied to the branching strategy.

*   **Production Environment (`main`)**
    *   **URL:** `https://www.vishnumandirtampa.org` (via custom domain)
    *   **Purpose:** The live website accessible to the public.
    *   **Access:** Public.

*   **Staging Environment (`develop`)**
    *   **URL:** `https://develop.your-amplify-domain.com`
    *   **Purpose:** A stable environment for temple staff and stakeholders to perform User Acceptance Testing (UAT) on new features before they go live. It connects to a separate staging database.
    *   **Access:** Password protected via Amplify's access control.

*   **Preview Environments (`feature/*`)**
    *   **URL:** `https://pr-XXX.develop.your-amplify-domain.com` (ephemeral)
    *   **Purpose:** Automatically generated for each pull request, allowing developers and reviewers to test changes in isolation before merging.
    *   **Access:** Password protected via Amplify's access control.

## 8.0 Monitoring, Rollbacks, and Security

### 8.1 Monitoring & Logging

All application and server-side logs generated by the Next.js application will be automatically streamed to **AWS CloudWatch Logs**. This provides a centralized location for debugging issues in any environment. Key metrics (e.g., 4xx/5xx error rates, response times) are available in the Amplify Console.

### 8.2 Rollbacks

AWS Amplify maintains a history of all deployments. If a critical issue is discovered in production, a rollback can be performed with a single click in the Amplify Console. The problematic deployment will be deactivated, and the previously active, stable version will be reinstated instantly.

### 8.3 Database Migrations with Prisma

Database schema changes are managed using Prisma Migrate. The workflow is as follows:
1.  A developer creates a new migration file locally using `npx prisma migrate dev`.
2.  This file is committed to the feature branch along with the code changes.
3.  When the code is merged into `develop` or `main`, the `preBuild` phase in the `amplify.yml` pipeline executes `npx prisma migrate deploy`.
4.  This command applies any new, unapplied migration files to the target database (Staging or Production), ensuring the schema is always in sync with the application code. This process is non-interactive and designed for CI/CD environments.