Of course. Here is the comprehensive Project README document, tailored for the Vishnu Mandir, Tampa website development project.

---

# Vishnu Mandir, Tampa - Website Development

This repository contains the source code for the Vishnu Mandir, Tampa website. The project is a modern, scalable web application built on a Jamstack architecture to serve the temple's community, manage events, and process donations and service requests efficiently.

This document provides all the necessary information for a developer to set up the development environment, understand the architecture, and contribute to the project.

## Table of Contents

- [Project Goals](#project-goals)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Setup](#database-setup)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Coding Standards & Conventions](#coding-standards--conventions)
- [Key Features & Implementation](#key-features--implementation)
  - [Authentication (Admin)](#authentication-admin)
  - [Content Management (Headless CMS)](#content-management-headless-cms)
  - [Payments & Forms](#payments--forms)
- [Deployment](#deployment)
- [Brand & Design Guidelines](#brand--design-guidelines)
- [Contributing](#contributing)
- [Platform-Specific (Cursor IDE)](#platform-specific-cursor-ide)

## Project Goals

The primary goal of this website is to serve as a central hub for the Vishnu Mandir community. The key objectives are:

1.  **Serve Devotees**: Provide accurate, up-to-date information on puja schedules, priest services, festivals, and temple news. This is the **top priority for the MVP**.
2.  **Drive Participation**: Promote events, classes, and cultural programs to foster community engagement.
3.  **Enable Self-Service**: Allow devotees to make recurring donations, sponsor pujas, and submit facility requests online.
4.  **Reduce Admin Workload**: Empower temple staff to manage content, events, and forms without developer intervention.

## Tech Stack

The project utilizes a modern, serverless-friendly technology stack chosen for performance, scalability, and maintainability.

| Category       | Technology                                 | Purpose                                                       |
| :------------- | :----------------------------------------- | :------------------------------------------------------------ |
| **Frontend**   | [Next.js](https://nextjs.org/)             | React framework for Server-Side Generation (SSG) and ISR.     |
| **Styling**    | [Tailwind CSS](https://tailwindcss.com/)   | Utility-first CSS framework for rapid UI development.         |
| **Backend**    | [Node.js](https://nodejs.org/) / [Express](https://expressjs.com/) | API for handling forms, payments, and admin functions.        |
| **Database**   | [PostgreSQL](https://www.postgresql.org/)  | Relational database for structured data.                      |
| **ORM**        | [Prisma](https://www.prisma.io/)           | Next-generation ORM for Node.js and TypeScript.               |
| **Deployment** | [AWS Amplify](https://aws.amazon.com/amplify/) | Hosting for the Next.js frontend and Node.js backend.         |
| **Payments**   | [Stripe](https://stripe.com/)              | Payment processing for donations and sponsorships.            |
| **CMS**        | [Strapi](https://strapi.io/) (Headless)    | Content management for pages, events, and schedules.          |
| **Auth**       | [AWS Cognito](https://aws.amazon.com/cognito/) | User management and authentication for admin roles.           |
| **Email**      | [AWS SES](https://aws.amazon.com/ses/)     | Transactional emails for confirmations and notifications.     |

## Getting Started

Follow these instructions to set up your local development environment.

### Prerequisites

Ensure you have the following software installed on your machine:

-   [Node.js](https://nodejs.org/) (v18.x or later; **Node 20–24** for Strapi CMS)
-   [pnpm](https://pnpm.io/) (or `yarn` / `npm`)
-   [Git](https://git-scm.com/)
-   [PostgreSQL](https://www.postgresql.org/download/) (running locally or accessible)
-   [Docker](https://www.docker.com/products/docker-desktop/) (optional, for running PostgreSQL in a container)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-repo/vishnu-mandir-tampa.git
    cd vishnu-mandir-tampa
    ```

2.  **Install dependencies:**
    This project is structured as a monorepo. Install dependencies from the root directory.
    ```bash
    pnpm install
    ```

### Environment Variables

The application requires environment variables for configuration.

1.  **Create an environment file:**
    Copy the example file to create your local configuration.
    ```bash
    cp .env.example .env.local
    ```

2.  **Populate `.env.local`:**
    Fill in the values for your local setup. You will need API keys from Stripe and credentials for your local database.

    ```ini
    # .env.local

    # PostgreSQL Database
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

    # Stripe API Keys
    STRIPE_SECRET_KEY="sk_test_..."
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
    STRIPE_WEBHOOK_SECRET="whsec_..."

    # Headless CMS (Strapi)
    CMS_API_URL="http://localhost:1337/api"
    CMS_API_TOKEN="..."

    # AWS Cognito (for Admin Auth)
    COGNITO_USER_POOL_ID="..."
    COGNITO_CLIENT_ID="..."
    NEXT_PUBLIC_COGNITO_REGION="us-east-1"

    # NextAuth.js Secret
    NEXTAUTH_SECRET="your-random-secret-string"
    NEXTAUTH_URL="http://localhost:3000"
    ```

### Database Setup

1.  **Start your PostgreSQL server.** If using Docker, you can use a `docker-compose.yml` file to manage the service.

2.  **Run Prisma migrations:**
    This command will create the database schema based on the models defined in `prisma/schema.prisma`.
    ```bash
    npx prisma migrate dev
    ```

3.  **(Optional) Seed the database:**
    If seed data is available, populate your database with initial roles, test events, etc.
    ```bash
    npx prisma db seed
    ```

### Running the Application

Start the development servers for the frontend, backend, and optionally the CMS.

1.  **Start the Next.js Frontend:**
    ```bash
    pnpm run dev:frontend
    ```
    The application will be available at `http://localhost:3000`.

2.  **Start the Backend API:**
    ```bash
    pnpm run dev:backend
    ```

3.  **Start the Headless CMS (Strapi):**
    ```bash
    pnpm run dev:cms
    ```
    The Strapi admin panel will be available at [http://localhost:1337/admin](http://localhost:1337/admin). On first run, you will be prompted to **register the first administrator user**. Use that account to log in thereafter.

    For full setup (database, RBAC, API token), see [CMS Setup](./cms-setup.md).

4.  **Run everything (frontend + backend + CMS):**
    ```bash
    pnpm run dev:all
    ```

## Project Structure

The codebase is organized to separate concerns and facilitate maintainability. This structure is also optimized for use with AI-powered development tools like Cursor.

```
.
├── .cursorrules          # Rules and context for the Cursor AI
├── .github/              # GitHub Actions, issue templates
├── prisma/               # Prisma schema, migrations, and seed scripts
│   └── schema.prisma
├── public/               # Static assets (images, fonts, logos)
├── src/
│   ├── app/              # Next.js 13+ App Router
│   │   ├── (admin)/      # Admin-only routes (protected)
│   │   ├── (public)/     # Publicly accessible routes
│   │   │   ├── calendar/
│   │   │   ├── donate/
│   │   │   └── layout.tsx
│   │   └── api/          # API routes (forms, webhooks)
│   ├── components/       # Reusable React components (UI, layout)
│   ├── lib/              # Shared utilities, helpers, constants
│   ├── styles/           # Global styles, Tailwind config
│   └── types/            # TypeScript type definitions
├── .env.local            # Local environment variables (untracked)
├── .env.example          # Example environment variables
├── changelog.md          # Log of AI-generated and significant changes
├── next.config.js        # Next.js configuration
└── package.json
```

-   **`/src/app`**: Core of the application using Next.js App Router. Route groups `(admin)` and `(public)` separate authenticated and unauthenticated layouts.
-   **`/src/app/api`**: Serverless functions for handling backend logic like form submissions and Stripe webhooks.
-   **`/src/components`**: Shared, reusable components. Sub-directories like `ui/` for primitive components and `sections/` for page-level components are encouraged.
-   **`/prisma`**: All database-related files. `schema.prisma` is the single source of truth for database models.
-   **`/cms`**: Strapi headless CMS (events, puja services, pages, etc.). Run with `pnpm run dev:cms`. See [CMS Setup](./cms-setup.md).

## Coding Standards & Conventions

To maintain code quality and consistency, we adhere to the following standards:

-   **Formatting**: [Prettier](https://prettier.io/) is used for automatic code formatting.
-   **Linting**: [ESLint](https://eslint.org/) is used to catch errors and enforce style rules.
-   **Naming**:
    -   Components: `PascalCase` (e.g., `EventCalendar.tsx`)
    -   Files/Folders: `kebab-case` (e.g., `puja-schedule/`)
    -   Variables/Functions: `camelCase`
-   **Commit Messages**: We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification. This helps in generating automated changelogs and understanding the history. Example: `feat(donations): add recurring donation option`.

**Run checks locally before committing:**
```bash
# Run linter
yarn lint

# Fix linting and formatting issues automatically
yarn format
```

## Key Features & Implementation

### Authentication (Admin)

Admin authentication is handled by **AWS Cognito** and integrated via **NextAuth.js**.

-   **Flow**: An administrator visits an admin-only route. NextAuth.js middleware intercepts the request, redirects to a Cognito-hosted login page, and upon successful authentication, establishes a session.
-   **Roles**: Role-based access control (RBAC) is managed within the application. User roles (Admin, Editor, Finance, Event Manager) are fetched from the database after login and used to protect specific API routes and UI components.

### Content Management (Headless CMS)

All dynamic content (event details, puja schedules, articles, etc.) is managed in **Strapi**, a self-hosted Headless CMS located in the `cms/` directory.

-   **Running**: `pnpm run dev:cms` (or `cd cms && pnpm develop`). Admin at [http://localhost:1337/admin](http://localhost:1337/admin), API at [http://localhost:1337/api](http://localhost:1337/api).
-   **First run**: Register the first admin user at `/admin`, then use that account to log in.
-   **Data Fetching**: The Next.js frontend fetches content from Strapi's REST API during the build (SSG) or on-demand (ISR/SSR), using `CMS_API_URL` and `CMS_API_TOKEN`.
-   **Setup**: See [CMS Setup](./cms-setup.md) for database, RBAC (Editor, Event Manager, Finance roles), and API token configuration.

### Payments & Forms

**Stripe** is used for all payment processing to ensure security and PCI compliance.

-   **Recurring Donations**:
    1.  A user selects a donation amount and frequency on the frontend.
    2.  The client-side code calls Stripe to create a Checkout Session.
    3.  The user is redirected to the secure Stripe Checkout page.
    4.  Upon completion, a `checkout.session.completed` webhook is sent from Stripe to our `/api/webhooks/stripe` endpoint.
    5.  The webhook handler verifies the event, creates a transaction record in the PostgreSQL database, and triggers an email confirmation via AWS SES.

-   **Puja Sponsorship Forms**:
    1.  A user fills out the sponsorship form on the website.
    2.  On submission, the form data is sent to a dedicated API route (e.g., `/api/sponsorships`).
    3.  The API route validates the data, creates a record in the database, and uses AWS SES to send a notification to the relevant temple staff and a confirmation to the devotee.

## Deployment

The application is deployed on **AWS Amplify**, which provides a Git-based workflow for continuous deployment.

1.  **Branching**: Pushing to the `main` branch triggers a production deployment. Pushing to a `develop` or `staging` branch triggers a deployment to a corresponding preview environment.
2.  **Build Settings**: Amplify is configured to detect the Next.js application and automatically apply the correct build and deployment settings for SSG, ISR, and API routes.
3.  **Environment Variables**: All secrets (`DATABASE_URL`, `STRIPE_SECRET_KEY`, etc.) must be configured in the Amplify Console under **Environment variables**. Do not commit them to the repository.

## Brand & Design Guidelines

To maintain a consistent and appropriate visual identity, all development should adhere to these guidelines.

-   **Mood**: Spiritual, traditional, serene, friendly, cultural.
-   **Color Scheme**:
    -   **Primary**: `#d97706` (Golden Amber)
    -   **Secondary**: `#3b82f6` (Royal Blue)
    -   **Accent**: `#facc15` (Sunflower Yellow)
    -   **Background**: `#fefce8` (Cream White)
    -   **Text**: `#1f2937` (Charcoal Gray)
-   **Layout**:
    -   Landing page style with clear calls-to-action.
    -   Top navigation bar.
    -   Fully responsive for mobile, tablet, and desktop.
    -   Dark Mode support should be implemented.

## Contributing

We welcome contributions! Please follow this process:

1.  **Create an Issue**: Before starting work, create a GitHub issue to describe the feature or bug.
2.  **Fork & Branch**: Fork the repository and create a new branch from `main` with a descriptive name (e.g., `feat/add-live-stream-banner` or `fix/donation-form-validation`).
3.  **Develop**: Make your changes, adhering to the coding standards.
4.  **Test**: Ensure your changes work as expected and do not break existing functionality. Add tests if applicable.
5.  **Submit a Pull Request (PR)**: Push your branch to your fork and open a PR against the `main` branch of the original repository.
6.  **Review**: The PR will be reviewed by the maintainers. Please be responsive to feedback. Once approved, it will be merged.

## Platform-Specific (Cursor IDE)

This project is optimized for development with [Cursor](https://cursor.sh/), an AI-first code editor.

-   **`.cursorrules`**: This file at the root of the project contains high-level context, project goals, and coding standards. It helps the AI generate more accurate and consistent code. Please keep it updated with any major architectural changes.

-   **`changelog.md`**: Use this file to document all significant changes, especially those generated or heavily assisted by AI. This provides a clear audit trail of the project's evolution. Entry format should be simple: `YYYY-MM-DD - [Brief Description of Change] - (AI-assisted)`.

-   **File Structure**: The project's file structure is intentionally clear and modular to help the AI understand the codebase and locate relevant files within its context window. When adding new features, follow the existing patterns.