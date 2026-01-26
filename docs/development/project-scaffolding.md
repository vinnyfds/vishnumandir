# Project Scaffolding: Vishnu Mandir, Tampa

**Document Type:** Project Scaffolding  
**Document Purpose:** Category: development  
**Project:** Vishnu Mandir, Tampa

---

## 1.0 Introduction

This document outlines the complete project scaffolding, directory structure, and initial setup procedures for the Vishnu Mandir, Tampa website. Its purpose is to provide a clear and standardized foundation for development, ensuring consistency, maintainability, and scalability.

This scaffolding is designed to support the recommended technology stack: a Next.js frontend, a Node.js (Express) backend, a PostgreSQL database with the Prisma ORM, and deployment via AWS Amplify. The structure supports all specified features, including content pages, event calendars, donation/sponsorship forms, and a role-based admin dashboard.

## 2.0 Development Environment Setup

All developers must configure their local environment to match the project's technology stack.

1.  **Node.js:** Install Node.js version `20.x` or higher. We recommend using a version manager like `nvm`.
    ```bash
    nvm install 20
    nvm use 20
    ```
2.  **Package Manager:** This project will use `pnpm` for efficient dependency management in the monorepo-style structure.
    ```bash
    npm install -g pnpm
    ```
3.  **Database:** Install and run a local PostgreSQL instance. Docker is the recommended method.
    ```bash
    # Create a docker-compose.yml file in the project root (see below)
    # Then run:
    docker-compose up -d
    ```
    **`docker-compose.yml`:**
    ```yaml
    version: '3.8'
    services:
      db:
        image: postgres:15
        restart: always
        environment:
          POSTGRES_USER: mandir_admin
          POSTGRES_PASSWORD: your_strong_password_here
          POSTGRES_DB: vishnu_mandir_tampa
        ports:
          - "5432:5432"
        volumes:
          - postgres_data:/var/lib/postgresql/data
    
    volumes:
      postgres_data:
    ```

4.  **IDE:** Use a modern IDE with strong TypeScript support. This project is optimized for **Cursor IDE**. Install the recommended extensions for Prettier, ESLint, and Prisma.

## 3.0 Project Initialization & Scaffolding Steps

Follow these steps to create the project structure from a clean directory.

1.  **Create Project Root:**
    ```bash
    mkdir vishnu-mandir-tampa
    cd vishnu-mandir-tampa
    ```

2.  **Initialize `pnpm` Workspace:**
    ```bash
    pnpm init
    # Create a pnpm-workspace.yaml file
    ```
    **`pnpm-workspace.yaml`:**
    ```yaml
    packages:
      - 'frontend'
      - 'backend'
    ```

3.  **Scaffold Frontend (Next.js):**
    ```bash
    # From the project root
    pnpm create next-app@latest frontend --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
    ```
    *Choose `No` for `Would you like to customize the default import alias?` to keep `@/*`.*

4.  **Scaffold Backend (Node.js/Express):**
    ```bash
    # From the project root
    mkdir backend
    cd backend
    pnpm init
    pnpm add express cors dotenv morgan
    pnpm add -D typescript ts-node nodemon @types/node @types/express @types/cors @types/morgan
    # Create tsconfig.json and initial src directory
    npx tsc --init --rootDir src --outDir dist --esModuleInterop --resolveJsonModule --lib es2020 --module commonjs --allowJs true --noImplicitAny true
    mkdir src
    touch src/server.ts
    cd ..
    ```

5.  **Initialize Prisma:**
    ```bash
    # From the project root
    pnpm add -D prisma
    pnpm add @prisma/client
    npx prisma init --datasource-provider postgresql
    ```
    *This creates a `prisma` directory and a `.env` file. Update the `.env` file with your database connection string.*

6.  **Install Common Dependencies:**
    *   **Frontend UI:** Install headless UI libraries for accessible components.
        ```bash
        cd frontend
        pnpm add @headlessui/react @heroicons/react
        cd ..
        ```
    *   **Date Management:**
        ```bash
        # From the project root, install in both workspaces
        pnpm add date-fns -r
        ```

7.  **Initial Commit:**
    ```bash
    git init
    # Create a .gitignore file in the root (see detailed structure below)
    git add .
    git commit -m "Initial commit: Project scaffolding and tech stack setup"
    ```

## 4.0 Platform-Specific Configuration (Cursor IDE)

To optimize AI-assisted development within Cursor, the following files will be created in the project root.

### 4.1 `.cursorrules`

This file provides context to the AI about the project's architecture, goals, and coding standards.

```
# .cursorrules - Vishnu Mandir Tampa Project

# Project Context
Project: Vishnu Mandir, Tampa
Description: A content and community-focused website for a Hindu temple. The primary goals are to provide accurate information to devotees (schedules, services), drive community participation (events, classes), enable self-service transactions (donations, sponsorships), and reduce the administrative workload for temple staff.
Website Type: Religious/Community Organization

# Tech Stack
- Monorepo: Yes, using pnpm workspaces (frontend, backend)
- Frontend: Next.js 14+ with App Router (`/frontend/src/app`)
- UI Library: Tailwind CSS, Headless UI
- State Management: React Context, SWR/React Query for data fetching
- Backend: Node.js with Express.js (`/backend/src`)
- Database: PostgreSQL
- ORM: Prisma (`/prisma/schema.prisma`)
- Deployment: AWS Amplify

# Design System
- Layout: Top navigation, responsive, supports dark mode.
- Mood: Spiritual, traditional, serene, friendly, cultural.
- Colors:
  - Primary: #d97706 (Golden Amber)
  - Secondary: #3b82f6 (Royal Blue)
  - Accent: #facc15 (Sunflower Yellow)
  - Background: #fefce8 (Cream White)
  - Text: #1f2937 (Charcoal Gray)

# Coding Rules & Conventions
1.  **File Naming:** Use kebab-case for all files and folders (e.g., `puja-schedule.tsx`, `event-calendar.tsx`).
2.  **Component Structure:** Create components in `/frontend/src/components`. Use sub-folders for organization (e.g., `ui`, `forms`, `calendar`). Every component should be in its own folder with an `index.ts` file for exports.
3.  **API Routes:** All backend API logic is in the `/backend` workspace. Define routes in `/backend/src/api/` and corresponding logic in `/backend/src/controllers/`.
4.  **Database Schema:** The single source of truth for data models is `/prisma/schema.prisma`. When generating code that interacts with the database, always refer to this schema.
5.  **Types:** Use TypeScript everywhere. Define shared types in a `/packages/types` directory if needed, or within the relevant workspace (`frontend/src/types` or `backend/src/types`).
6.  **Environment Variables:** Access environment variables via `process.env`. Never hardcode secrets. All variables must be documented in the root `.env.example`.
7.  **Commit Messages:** Follow Conventional Commits format (e.g., `feat:`, `fix:`, `docs:`, `chore:`).
```

### 4.2 `changelog.md`

A log to track significant AI-generated changes, promoting transparency and review.

```md
# Changelog

All notable changes to this project will be documented in this file. This includes significant changes made with the assistance of AI.

## [Unreleased]

### Added
-

### Changed
-

### Fixed
-

---
*This changelog helps track the evolution of the codebase, particularly when using AI-assisted generation for features, components, or refactoring.*
```

## 5.0 Environment Variables

Create a `.env.example` file in the project root. Local development will use a `.env` file, which should not be committed to version control.

**`.env.example`**
```env
# PostgreSQL Database
# Used by Prisma for migrations and the backend for connections
DATABASE_URL="postgresql://mandir_admin:your_strong_password_here@localhost:5432/vishnu_mandir_tampa"

# Backend API
# Port for the Express server
BACKEND_PORT=4000

# Frontend API Proxy
# The URL of the backend API that the Next.js app will call
NEXT_PUBLIC_API_URL="http://localhost:4000"

# Authentication (AWS Cognito or similar)
# Replace with your Cognito User Pool details
COGNITO_USER_POOL_ID=
COGNITO_CLIENT_ID=
COGNITO_REGION=

# Payment Gateway (Stripe)
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email Service (AWS SES)
AWS_SES_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
SENDER_EMAIL_ADDRESS="no-reply@vishnumandirtampa.org"
ADMIN_EMAIL_ADDRESS="admin@vishnumandirtampa.org" # For notifications
```

## 6.0 Naming Conventions

-   **Files & Folders:** `kebab-case` (e.g., `puja-services`, `event-calendar.tsx`).
-   **React Components:** `PascalCase` (e.g., `EventCard`, `DonationForm`).
-   **API Endpoints:** RESTful, plural nouns (e.g., `/api/v1/events`, `/api/v1/donations`).
-   **Database Tables:** `PascalCase` and singular (Prisma convention, e.g., `model User`, `model Event`).
-   **CSS Classes (Tailwind):** Use standard Tailwind utility classes. For custom components, use a consistent prefix, e.g., `vm-card-title` if creating custom CSS.

## 7.0 Complete Project Folder Structure

This structure represents the complete project scaffolding, incorporating all requirements and best practices.

```
vishnu-mandir-tampa/
├── .cursorrules            # AI coding rules and project context
├── .env                    # Local environment variables (ignored by Git)
├── .env.example            # Template for environment variables
├── .gitignore              # Specifies intentionally untracked files
├── backend/                # Node.js / Express API Workspace
│   ├── dist/               # Compiled TypeScript output
│   ├── src/
│   │   ├── api/            # API route definitions
│   │   │   ├── auth.routes.ts
│   │   │   ├── donations.routes.ts
│   │   │   ├── events.routes.ts
│   │   │   ├── forms.routes.ts
│   │   │   ├── index.ts    # Main router combining all sub-routes
│   │   │   └── users.routes.ts
│   │   ├── config/
│   │   │   ├── corsOptions.ts
│   │   │   └── index.ts
│   │   ├── controllers/    # Route handler logic
│   │   │   ├── auth.controller.ts
│   │   │   ├── donation.controller.ts
│   │   │   ├── event.controller.ts
│   │   │   ├── facilityRequest.controller.ts
│   │   │   └── pujaSponsorship.controller.ts
│   │   ├── middleware/
│   │   │   ├── auth.middleware.ts      # Checks for valid JWT/session
│   │   │   ├── error.middleware.ts     # Global error handler
│   │   │   ├── role.middleware.ts      # Checks for user role (Admin, Finance)
│   │   │   └── validation.middleware.ts
│   │   ├── services/       # Business logic decoupled from controllers
│   │   │   ├── email.service.ts    # Wrapper for AWS SES
│   │   │   ├── payment.service.ts  # Wrapper for Stripe API
│   │   │   └── report.service.ts   # Logic for generating CSV reports
│   │   ├── types/          # Backend-specific TypeScript types
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   ├── logger.ts
│   │   │   └── prisma.client.ts    # Singleton Prisma client instance
│   │   └── server.ts       # Main Express server entry point
│   ├── nodemon.json
│   ├── package.json
│   └── tsconfig.json
├── changelog.md            # Log of significant AI-assisted changes
├── docker-compose.yml      # For running local PostgreSQL database
├── frontend/               # Next.js Frontend Workspace
│   ├── public/             # Static assets
│   │   ├── favicon.ico
│   │   ├── images/
│   │   │   ├── deities/
│   │   │   └── logo.png
│   │   └── pdf/
│   │       └── newsletters/
│   ├── src/
│   │   ├── app/            # Next.js App Router
│   │   │   ├── (admin)/    # Routes protected by admin authentication
│   │   │   │   ├── admin/
│   │   │   │   │   ├── dashboard/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── donations/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── events/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── forms/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── users/
│   │   │   │   │       └── page.tsx
│   │   │   │   └── layout.tsx        # Admin-specific layout
│   │   │   ├── (public)/   # Publicly accessible routes
│   │   │   │   ├── about/
│   │   │   │   │   └── page.tsx      # Temple info, deities, leadership
│   │   │   │   ├── calendar/
│   │   │   │   │   └── page.tsx      # Main event calendar view
│   │   │   │   ├── contact/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── cultural/
│   │   │   │   │   └── page.tsx      # Cultural programs
│   │   │   │   ├── donate/
│   │   │   │   │   └── page.tsx      # Donation page with Stripe integration
│   │   │   │   ├── education/
│   │   │   │   │   └── page.tsx      # Classes and resources
│   │   │   │   ├── events/
│   │   │   │   │   ├── [slug]/       # Dynamic page for a single event
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── page.tsx      # List of upcoming events
│   │   │   │   ├── forms/
│   │   │   │   │   ├── facility-request/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── puja-sponsorship/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── gallery/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── newsletter-archive/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── religious/
│   │   │   │   │   ├── festivals/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── priests/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── puja-schedule/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── puja-services/
│   │   │   │   │       └── page.tsx  # Catalog of available pujas
│   │   │   │   ├── layout.tsx        # Public layout with header/footer
│   │   │   │   └── page.tsx          # Home page
│   │   │   ├── api/        # Next.js API Routes (for BFF patterns, not main backend)
│   │   │   │   └── health/
│   │   │   │       └── route.ts
│   │   │   ├── global.css
│   │   │   └── layout.tsx  # Root layout
│   │   ├── components/
│   │   │   ├── admin/      # Components specific to the admin dashboard
│   │   │   │   ├── dashboard-widget/
│   │   │   │   │   └── index.tsx
│   │   │   │   └── report-generator/
│   │   │   │       └── index.tsx
│   │   │   ├── calendar/   # Components for the event calendar
│   │   │   │   ├── calendar-view/
│   │   │   │   └── event-tooltip/
│   │   │   ├── forms/      # Reusable form components
│   │   │   │   ├── donation-form/
│   │   │   │   ├── input-field/
│   │   │   │   └── puja-sponsorship-form/
│   │   │   ├── layout/     # Header, Footer, Sidebar, Navigation
│   │   │   │   ├── footer/
│   │   │   │   ├── header/
│   │   │   │   └── navigation/
│   │   │   └── ui/         # Generic, reusable UI elements
│   │   │       ├── button/
│   │   │       ├── card/
│   │   │       ├── dialog/
│   │   │       └── theme-toggle/
│   │   ├── hooks/          # Custom React hooks
│   │   │   └── use-api.ts
│   │   ├── lib/            # Utility functions, API clients, constants
│   │   │   ├── api-client.ts   # Axios or fetch wrapper
│   │   │   ├── constants.ts
│   │   │   ├── stripe.ts       # Stripe.js loader
│   │   │   └── utils.ts
│   │   └── types/          # Frontend-specific TypeScript types
│   │       └── index.ts
│   ├── next.config.mjs
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.ts
│   └── tsconfig.json
├── package.json            # Root package.json for pnpm workspace
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── prisma/                 # Prisma ORM configuration
│   ├── migrations/         # Database migration history
│   └── schema.prisma       # The single source of truth for the database schema
└── README.md               # Project overview and setup instructions
```

### `prisma/schema.prisma`

A preliminary schema based on the project requirements.

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  role      UserRole @default(EDITOR)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum UserRole {
  ADMIN
  EDITOR
  FINANCE
  EVENT_MANAGER
}

model Event {
  id          String   @id @default(cuid())
  title       String
  description String?  @db.Text
  startTime   DateTime
  endTime     DateTime
  category    EventType
  location    String?
  imageUrl    String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum EventType {
  PUJA
  CULTURAL
  EDUCATION
  FESTIVAL
}

model Donation {
  id              String   @id @default(cuid())
  amount          Int // Store in cents
  donorName       String
  donorEmail      String   @unique
  frequency       DonationFrequency
  stripePaymentId String   @unique
  status          String // e.g., 'succeeded', 'pending', 'failed'
  createdAt       DateTime @default(now())
}

enum DonationFrequency {
  ONE_TIME
  MONTHLY
  YEARLY
}

model PujaSponsorship {
  id              String   @id @default(cuid())
  pujaServiceName String
  sponsorName     String
  sponsorEmail    String
  sponsorPhone    String?
  requestedDate   DateTime
  notes           String?  @db.Text
  status          String   @default("pending") // pending, confirmed, completed
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

model FacilityRequest {
  id           String   @id @default(cuid())
  requesterName String
  requesterEmail String
  requesterPhone String
  eventName    String
  eventDate    DateTime
  attendees    Int
  details      String?  @db.Text
  status       String   @default("pending") // pending, approved, rejected
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model Newsletter {
  id        String   @id @default(cuid())
  title     String
  issueDate DateTime
  fileUrl   String // S3 URL to the PDF
  createdAt DateTime @default(now())
}

```