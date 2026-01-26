```markdown
# Changelog

All notable changes to the "Vishnu Mandir, Tampa" project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.1.0] - 2023-10-27

### Added

This initial version establishes the foundational development environment, core technology stack, and tooling required for an AI-assisted development workflow using Cursor IDE.

#### 1. Project Initialization & Structure
- Initialized a Git repository for version control.
- Created a standard `.gitignore` file for a Next.js project to exclude `node_modules`, `.next`, `.env.local`, and other transient files.
- Established a scalable directory structure to optimize AI context and developer clarity:
  ```
  /
  ├── .cursorrules        # AI behavior and project context
  ├── .github/            # CI/CD workflows (placeholder)
  ├── .vscode/            # Editor settings (e.g., format on save)
  ├── prisma/
  │   └── schema.prisma   # Database schema definition
  ├── public/             # Static assets (images, fonts)
  ├── src/
  │   ├── app/            # Next.js App Router
  │   ├── components/     # Reusable React components (UI, layout)
  │   ├── lib/            # Helper functions, DB client, utils
  │   └── styles/         # Global CSS, Tailwind base
  ├── .env.example        # Template for environment variables
  ├── .eslintrc.json      # ESLint configuration
  ├── .prettierrc         # Prettier configuration
  ├── next.config.mjs     # Next.js configuration
  ├── package.json
  └── tailwind.config.ts  # Tailwind CSS configuration
  ```

#### 2. AI-Assisted Development Configuration (Cursor IDE)
- Standardized on **Cursor IDE** as the primary development environment to leverage AI for code generation, refactoring, and documentation.
- Created the `.cursorrules` file to provide persistent, project-wide context to the AI. This file contains project goals, tech stack, style guides, and coding standards, ensuring AI-generated code is consistent and aligned with project requirements.

  ```
  # .cursorrules - AI Rules for Vishnu Mandir Project

  # --- Project Definition ---
  @project
  Name: Vishnu Mandir, Tampa
  Description: A comprehensive website for the Vishnu Mandir community. The site must serve devotees with accurate information (schedules, services), drive community participation (events, classes), enable self-service transactions (donations, sponsorships), and reduce the administrative workload for temple staff. The overall feel should be traditional, serene, and friendly.

  # --- Core Technology Stack ---
  @tech-stack
  - Frontend: Next.js (App Router) with TypeScript
  - Styling: Tailwind CSS
  - Backend API: Node.js with Express (for specific serverless functions if needed)
  - Database ORM: Prisma
  - Database: PostgreSQL
  - Deployment: AWS Amplify
  - Payments: Stripe
  - CMS: Strapi (Headless)

  # --- Design and Style Guide ---
  @style-guide
  - Layout: Responsive, mobile-first landing page structure.
  - Navigation: Top navigation bar, persistent across pages.
  - Dark Mode: Support for dark mode is required.
  - Colors:
    - Primary: #d97706 (Golden Amber) - `amber-600`
    - Secondary: #3b82f6 (Royal Blue) - `blue-500`
    - Accent: #facc15 (Sunflower Yellow) - `yellow-400`
    - Background: #fefce8 (Cream White) - `yellow-50`
    - Text: #1f2937 (Charcoal Gray) - `gray-800`
  - Design Mood: spiritual, traditional, serene, friendly, cultural.

  # --- Coding Standards & Conventions ---
  @coding-standard
  - Use functional components with React Hooks. Avoid class components.
  - All new components and logic must be written in TypeScript.
  - Adhere strictly to Tailwind CSS utility-first principles. Avoid custom CSS files for component-level styling.
  - Use Prisma for all database interactions. Instantiate a single Prisma client instance in `src/lib/prisma.ts` and reuse it.
  - API routes and server actions must include robust error handling and return consistent JSON responses.
  - Environment variables must be used for all secrets and configuration keys (e.g., `DATABASE_URL`, `STRIPE_SECRET_KEY`).
  - All form submissions must include validation (e.g., using Zod).
  - Component file names should be PascalCase (`EventCalendar.tsx`), while utility/hook files should be camelCase (`useDonationForm.ts`).

  # --- Documentation Generation ---
  @doc-gen
  - Generate documentation in Markdown format.
  - For `CHANGELOG.md`, follow the "Keep a Changelog" format. Entries should be detailed and link to specific code changes where possible.
  - For component documentation, use JSDoc comments to explain props, purpose, and usage examples.
  ```
- Created this `changelog.md` file to track all significant changes made by developers and AI, ensuring a clear audit trail of project evolution.

#### 3. Frontend Foundation (Next.js & Tailwind CSS)
- Scaffolding of the Next.js 14 project using the App Router (`npx create-next-app@latest`).
- Integrated and configured Tailwind CSS. The project's color palette has been added to the theme extensions in `tailwind.config.ts`:

  ```typescript
  // tailwind.config.ts
  import type { Config } from 'tailwindcss'

  const config: Config = {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          primary: '#d97706',    // Golden Amber
          secondary: '#3b82f6',   // Royal Blue
          accent: '#facc15',     // Sunflower Yellow
          background: '#fefce8', // Cream White
          content: '#1f2937',      // Charcoal Gray
        },
      },
    },
    plugins: [],
  }
  export default config
  ```
- Created an initial `src/app/layout.tsx` to set up the global HTML structure, including font loading and background color.

#### 4. Backend & Database Setup (Prisma & PostgreSQL)
- Initialized Prisma into the project (`npx prisma init`).
- Configured the `prisma/schema.prisma` file to use the `postgresql` provider.

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
  ```
- Created `.env` and `.env.example` files to manage the `DATABASE_URL` for local development.

#### 5. Code Quality & Formatting
- Installed and configured ESLint and Prettier to enforce a consistent code style.
- Added scripts to `package.json` for running the linter and formatter:
  ```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write ."
  }
  ```
- Configured VSCode settings (`.vscode/settings.json`) to enable format-on-save, improving developer experience and code consistency.

```