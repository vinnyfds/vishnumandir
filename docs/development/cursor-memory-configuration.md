# Cursor Memory Configuration

- **Project:** Vishnu Mandir, Tampa
- **Document Type:** Cursor Memory Configuration
- **Category:** Development

---

## 1. Overview

This document provides the essential configuration for the **Cursor IDE**, our chosen AI-first development environment. The purpose of this configuration is to provide Cursor's AI with a persistent, high-quality "memory" of our project's context, technical stack, design system, and coding standards.

By properly configuring Cursor's memory via a `.cursorrules` file and adhering to the conventions outlined here, we can significantly enhance the AI's ability to generate accurate, consistent, and relevant code. This reduces boilerplate, accelerates development, and ensures that all AI-assisted contributions align with the project's architectural and stylistic guidelines.

## 2. Core Principle: Context is King

Cursor's effectiveness is directly proportional to the quality of the context it receives. Its context window is limited, so we must be deliberate about what information is most valuable. This configuration prioritizes:

- **High-level Project Goals:** What are we building and why?
- **Technical Decisions:** What technologies and patterns have we committed to?
- **Design & UX Guidelines:** How should the application look, feel, and behave?
- **Structural Conventions:** Where do files live and how are they named?

Adhering to this guide ensures the AI has a strong foundation for every request, whether it's generating a new component, writing an API endpoint, or refactoring existing code.

## 3. `.cursorrules` Configuration

Create a file named `.cursorrules` in the root of the project directory. This file will serve as the persistent memory for Cursor's AI. Paste the following content into it.

```markdown
# .cursorrules - Persistent Context for Vishnu Mandir Project AI

This file provides the AI with essential context about the Vishnu Mandir Tampa website project.
Refer to this context when generating code, answering questions, or performing refactoring.

[project_context]
- **Project Name:** Vishnu Mandir, Tampa
- **Website Type:** Community/Religious Organization Website with transactional features.
- **Primary Goal (MVP):** Serve devotees with accurate, up-to-date information, especially daily/weekly puja schedules and priest services.
- **Secondary Goals:** Drive community participation (events), enable self-service transactions (donations, sponsorships), and reduce administrative workload.
- **Target Audiences:** Devotees, Event Attendees, Priests/Staff, Donors, and Volunteers.
- **Core Functionality:** Event calendars, donation forms (one-time & recurring), puja sponsorship forms, content pages (deities, festivals), and an admin dashboard for content management.

[tech_stack]
- **Frontend:** Next.js (App Router) with React and TypeScript.
- **Styling:** Tailwind CSS.
- **Backend:** API routes written in Node.js with Express patterns.
- **Database:** PostgreSQL.
- **ORM:** Prisma.
- **Deployment:** AWS Amplify.
- **Payments:** Stripe for all payment processing.
- **CMS:** Strapi (Headless) for content management.

[design_system]
- **Design Mood:** Spiritual, traditional, serene, friendly, and cultural.
- **Layout:** Responsive, mobile-first design. Main navigation is at the top. Supports Dark Mode.
- **Color Palette (use these variable names in Tailwind config):**
  - `primary`: '#d97706' (Golden Amber) - For primary actions, links, and highlights.
  - `secondary`: '#3b82f6' (Royal Blue) - For secondary actions and informational elements.
  - `accent`: '#facc15' (Sunflower Yellow) - For attention-grabbing elements or highlights.
  - `background`: '#fefce8' (Cream White) - Main background color in light mode.
  - `text`: '#1f2937' (Charcoal Gray) - Default text color.
- **Typography:** Use sans-serif fonts suitable for readability. Headings should be distinct from body text.

[core_features]
- **EventCalendar:** High-priority feature. Displays daily pujas, cultural events, and festivals. Must be filterable. Data comes from the CMS.
- **RecurringDonations:** High-priority. Integrates with Stripe to allow users to set up monthly/annual recurring donations.
- **PujaSponsorshipForm:** High-priority. A multi-step form for devotees to request and pay for puja sponsorships. Involves form validation, Stripe payment, and sending email notifications via AWS SES.
- **UserRoleManagement:** Admin-only feature. Uses role-based access control (Admin, Editor, Finance, Event Manager) to restrict access to parts of the admin dashboard. Managed via AWS Cognito and our backend.

[coding_standards]
- **Language:** TypeScript first. Use strict types wherever possible. Define shared types in `/src/types`.
- **React:** Use functional components with Hooks. Avoid class components.
- **State Management:** Use React Context for simple global state (e.g., user auth) and component state (`useState`) for local UI state. For complex client-side state, consider `zustand`.
- **Data Fetching:** Use Server Components and `fetch` for server-side data fetching. Use a library like SWR or React Query for client-side data fetching if needed for dynamic interactions.
- **API:** All backend logic is exposed via Next.js API Routes in `/src/app/api`. Endpoints should be RESTful and follow the naming conventions.
- **Database Access:** All database interactions must go through the Prisma client (`/src/lib/prisma.ts`). Do not write raw SQL queries unless absolutely necessary.
- **Linting/Formatting:** The project is configured with ESLint and Prettier. All code must be formatted before committing.

[aws_architecture]
- **Hosting:** The Next.js app is deployed on AWS Amplify, which handles CI/CD, hosting, and scaling.
- **Backend Logic:** Serverless functions (managed by Amplify, similar to AWS Lambda) handle API requests.
- **Database:** PostgreSQL on AWS RDS.
- **Authentication:** AWS Cognito for admin user authentication.
- **Email:** AWS SES for transactional emails (e.g., donation receipts, sponsorship confirmations).
- **Storage:** AWS S3 for user-uploaded media (e.g., newsletter PDFs, form attachments).
```

## 4. Recommended File and Folder Structure

A consistent folder structure is crucial for both human developers and the AI to locate files and understand the application's architecture. We will use a feature-centric structure within the standard Next.js App Router paradigm.

```
/
├── .cursorrules          # AI context file (THIS FILE)
├── changelog.md          # Log of significant AI-generated changes
├── prisma/               # Prisma schema and migrations
│   └── schema.prisma
├── public/               # Static assets (images, fonts, etc.)
└── src/
    ├── app/              # Next.js App Router
    │   ├── (admin)/      # Admin-only routes (protected by layout)
    │   │   ├── dashboard/
    │   │   └── layout.tsx
    │   ├── (public)/     # Public-facing routes
    │   │   ├── about/
    │   │   ├── donate/
    │   │   ├── events/
    │   │   ├── page.tsx    # Homepage
    │   │   └── ...
    │   ├── api/          # API endpoints (backend logic)
    │   │   ├── v1/
    │   │   │   ├── donations/
    │   │   │   └── sponsorships/
    │   │   └── auth/
    │   ├── layout.tsx    # Root layout
    │   └── globals.css
    ├── components/
    │   ├── common/       # Highly reusable, generic components (e.g., Button.tsx, Card.tsx)
    │   ├── features/     # Components tied to a specific feature (e.g., EventCalendar.tsx, DonationForm.tsx)
    │   └── ui/           # Base UI components, potentially from a library like shadcn/ui
    ├── lib/              # Utility functions, helpers, clients
    │   ├── prisma.ts     # Prisma client instance
    │   ├── stripe.ts     # Stripe client instance
    │   └── utils.ts      # General utility functions
    └── types/            # TypeScript type definitions
        └── index.ts      # Global type definitions (e.g., Puja, Event, Donation)
```

## 5. Naming Conventions

Clear and consistent naming helps the AI infer relationships and generate predictable code.

- **Components:** `PascalCase` (e.g., `PujaSponsorshipForm.tsx`).
- **Pages/Layouts:** `kebab-case` for folders, `page.tsx` or `layout.tsx` for files (e.g., `/puja-sponsorship/page.tsx`).
- **Variables/Functions:** `camelCase` (e.g., `fetchUpcomingEvents`).
- **API Endpoints:** Plural, resource-oriented `kebab-case` (e.g., `/api/v1/puja-sponsorships`).
- **CSS (Tailwind):** Use utility-first classes directly in JSX. For custom components, use descriptive names based on the component's function.

## 6. AI Change Tracking (`changelog.md`)

To maintain transparency and a history of AI contributions, we will use a `changelog.md` file in the project root. When you use Cursor to generate a significant piece of code (e.g., a new feature, a complex component, an API endpoint), add a brief entry to this log.

#### `changelog.md` Entry Format:

```markdown
## YYYY-MM-DD

### Added
- **Feature: Puja Sponsorship Form**
  - **Description:** Generated the initial multi-step form component (`PujaSponsorshipForm.tsx`) and the corresponding API endpoint (`/api/v1/sponsorships`) using Cursor.
  - **Prompt Snippet:** "Create a multi-step React component for puja sponsorship using TypeScript and Tailwind CSS. The steps are: 1. Select Puja, 2. Enter Details, 3. Payment. Use the types defined in `/src/types`."
  - **Files Affected:** `src/components/features/PujaSponsorshipForm.tsx`, `src/app/api/v1/sponsorships/route.ts`
```

## 7. Best Practices for AI Prompts

To get the most out of Cursor, phrase your requests clearly and reference the established context.

- **Be Specific & Reference Context:**
  - **Good:** "Generate a Prisma schema model for `PujaSponsorship`. Include fields for `name`, `email`, `pujaId`, `sponsorshipDate`, and a `status` enum (`PENDING`, `CONFIRMED`, `CANCELLED`)."
  - **Bad:** "Make a database table for sponsorships."

- **Reference Files and Code:**
  - **Good:** "In `EventCalendar.tsx`, refactor the data fetching to use the `fetchUpcomingEvents` function from `/src/lib/events.ts`."
  - **Bad:** "Fix the calendar."

- **Request Code Based on Design System:**
  - **Good:** "Create a `Button` component that uses our `primary` color for the main variant and `secondary` color for the outline variant, according to the design system in `.cursorrules`."
  - **Bad:** "Make a button."