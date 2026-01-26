Here is the complete Cursor Rules document for the Vishnu Mandir, Tampa project.

---

```markdown
# .cursorrules for Vishnu Mandir, Tampa

This document provides the essential development context, coding standards, and architectural guidelines for the Vishnu Mandir, Tampa website project. As an AI development assistant, you must adhere to these rules to ensure code consistency, quality, and alignment with project goals.

## 1. Project Overview & Goals

**Project:** Vishnu Mandir, Tampa
**Description:** A comprehensive website to serve the temple's community.
**Primary Goal (MVP):** Serve devotees with accurate, up-to-date information, including daily puja schedules, priest services, and festival details.
**Secondary Goals:** Drive community participation, enable self-service transactions (donations, sponsorships), and reduce the administrative workload for temple staff.
**Design Mood:** The website's aesthetic is **traditional, serene, spiritual, and friendly**. It should feel welcoming and culturally authentic, not like a corporate site.

## 2. Core Technologies & Architecture

This project uses a modern Jamstack architecture with a serverless backend, hosted on AWS.

-   **Frontend:** **Next.js 14+** (App Router) with **React** and **TypeScript**.
-   **Styling:** **Tailwind CSS**. All styling must be done via Tailwind utility classes.
-   **Backend:** **Node.js** API routes deployed as serverless functions (within the Next.js app).
-   **Database:** **PostgreSQL** accessed via the **Prisma ORM**.
-   **Deployment:** **AWS Amplify** (manages Next.js hosting, serverless functions, and CI/CD).
-   **Authentication (Admin):** **AWS Cognito**.
-   **Payments:** **Stripe** for all donation and sponsorship processing.
-   **Email:** **AWS SES** for transactional emails (confirmations, notifications).

### Architectural Principles:

1.  **Server-Side Generation (SSG/ISR):** Use Static Site Generation (SSG) or Incremental Static Regeneration (ISR) for content-heavy pages like "Puja Services," "Deities," and "About Us." This ensures maximum performance and SEO.
2.  **Server Components First:** Default to React Server Components (RSCs) for fetching data and rendering non-interactive UI. Use the `"use client";` directive only when necessary for interactivity (e.g., forms, event handlers, state hooks).
3.  **API Routes for Actions:** All backend logic (form submissions, payment processing, authenticated actions) must be implemented as API Route Handlers within the `app/api/` directory.

## 3. File & Directory Structure

Adhere to this standardized project structure. When creating new files, place them in the appropriate directory.

```
/
├── app/
│   ├── (admin)/              # Admin-only routes, protected by middleware
│   │   └── dashboard/
│   ├── (api)/                # Backend API routes
│   │   └── api/
│   │       ├── donations/    # Handles Stripe checkout and webhooks
│   │       ├── events/       # CRUD for calendar events
│   │       └── sponsorships/ # Puja sponsorship form submissions
│   ├── (site)/               # Public-facing website pages (uses layout.tsx)
│   │   ├── about/page.tsx
│   │   ├── calendar/page.tsx
│   │   ├── donate/page.tsx
│   │   ├── events/[slug]/page.tsx
│   │   └── ...
│   ├── layout.tsx            # Root layout for the public site
│   └── page.tsx              # Home page
├── components/               # Reusable React components
│   ├── ui/                   # Primitive components (Button.tsx, Card.tsx, Input.tsx)
│   ├── forms/                # Composite form components (DonationForm.tsx)
│   ├── layout/               # Header.tsx, Footer.tsx, Navigation.tsx
│   └── shared/               # Domain-specific components (EventCard.tsx)
├── lib/                      # Shared libraries, helpers, and config
│   ├── prisma.ts             # Prisma client instance (singleton)
│   ├── stripe.ts             # Stripe client instance
│   └── utils.ts              # General utility functions (e.g., date formatting)
├── prisma/                   # Prisma schema and migrations
│   └── schema.prisma
├── public/                   # Static assets (images, logos, fonts, PDFs)
├── styles/                   # Global styles
│   └── globals.css           # Contains base Tailwind layers and CSS variables
├── tailwind.config.ts        # Tailwind CSS configuration
└── changelog.md              # Log of AI-generated changes
```

## 4. Coding Standards & Conventions

### General

-   **Language:** Use **TypeScript** for all new code (`.ts`, `.tsx`).
-   **Formatting:** Code is formatted with Prettier on save. Ensure your generated code is clean.
-   **Naming:**
    -   Variables & Functions: `camelCase`
    -   React Components & TS Interfaces/Types: `PascalCase`
    -   Files & Directories: `kebab-case` (except for components, which are `PascalCase.tsx`)
-   **Comments:** Use JSDoc for all non-trivial functions to explain their purpose, parameters (`@param`), and return values (`@returns`).

### Frontend (Next.js / React)

-   **Component Definition:** Always use functional components with hooks.
    ```typescript
    // components/ui/Button.tsx

    import React from 'react';

    interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
      variant?: 'primary' | 'secondary';
    }

    /**
     * A reusable button component with themed variants.
     * @param {ButtonProps} props - The component props.
     * @returns {JSX.Element} The rendered button element.
     */
    export const Button = ({ className, variant = 'primary', ...props }: ButtonProps) => {
      // Logic to determine styles based on variant
      const baseStyles = 'px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2';
      // ... more styles
      
      return <button className={`${baseStyles} ${className}`} {...props} />;
    };
    ```
-   **State Management:** For simple component-level state, use `useState` and `useReducer`. For complex cross-component state, use `React Context` or a simple state manager like Zustand if necessary.
-   **Data Fetching:** Fetch data in Server Components wherever possible. For client-side fetching, use `SWR` or `React Query` for caching, revalidation, and a better UX.

### Styling (Tailwind CSS)

-   **Strictly Utility-First:** Do not write custom CSS classes in `.css` files. Use Tailwind utilities directly in your JSX.
-   **Color Palette:** Use the defined theme colors. Do not use arbitrary hex values.
    ```javascript
    // tailwind.config.ts excerpt
    theme: {
      extend: {
        colors: {
          primary: 'var(--color-primary)',   // #d97706 Golden Amber
          secondary: 'var(--color-secondary)', // #3b82f6 Royal Blue
          accent: 'var(--color-accent)',    // #facc15 Sunflower Yellow
          background: 'var(--color-background)',// #fefce8 Cream White
          content: 'var(--color-content)',   // #1f2937 Charcoal Gray
        }
      }
    }
    ```
-   **Dark Mode:** Implement dark mode using Tailwind's `dark:` variant, which will be toggled by a class on the `<html>` element. The colors are defined as CSS variables in `styles/globals.css` to support this.
-   **Component Composition:** For complex, repeated class strings, create a new component or use a helper function. Avoid using `@apply` unless absolutely necessary for external library styling.

### Backend (API Routes)

-   **Response Structure:** All API responses must follow a consistent JSON structure.
    ```json
    // On success
    { "success": true, "data": { ... } }
    // On error
    { "success": false, "error": "A descriptive error message." }
    ```
-   **Error Handling:** Wrap database calls and external API requests in `try...catch` blocks. Return appropriate HTTP status codes (e.g., `400` for bad request, `404` for not found, `500` for server error).
-   **Validation:** Use a library like `zod` to validate incoming request bodies and query parameters.

### Database (Prisma)

-   The `prisma/schema.prisma` file is the **single source of truth** for the database schema.
-   Model names are `PascalCase` and singular (e.g., `Event`, `Donation`, `PujaSponsorship`).
-   Field names are `camelCase`.
-   When adding or changing a model, you must also describe the command to generate and run a new migration: `npx prisma migrate dev --name <migration-name>`.

```prisma
// prisma/schema.prisma

model Event {
  id          String   @id @default(cuid())
  title       String
  description String?
  startTime   DateTime
  endTime     DateTime
  type        EventType // ENUM: PUJA, CULTURAL, EDUCATION
  isFeatured  Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum EventType {
  PUJA
  CULTURAL
  EDUCATION
}
```

## 5. Key Feature Implementation Patterns

### Event Calendar

-   **Data Model:** Use the `Event` model defined in `schema.prisma`.
-   **API:** Create endpoints under `/api/events` to `GET` all events (with filtering by month/year), and protected endpoints to `POST`, `PUT`, and `DELETE` events.
-   **Frontend:** The main calendar page (`/calendar`) should be a Server Component that fetches the initial set of events. Interactive elements like month navigation or filtering should be Client Components that fetch data on the client side.

### Payments (Donations & Sponsorships) with Stripe

-   **Workflow:**
    1.  User fills out a form on the frontend (e.g., `/donate`).
    2.  On submit, the client-side code calls a server-side API route (e.g., `/api/donations/create-checkout`).
    3.  The API route uses the Stripe Node.js library to create a `Checkout Session`. It passes product info, pricing, and metadata (e.g., `userId`, `sponsorshipType`).
    4.  The API route returns the session URL to the client.
    5.  The client redirects the user to the Stripe-hosted checkout page.
    6.  A separate API webhook endpoint (`/api/donations/webhook`) listens for the `checkout.session.completed` event from Stripe.
    7.  The webhook handler verifies the event, extracts the metadata, updates the `Donation` table in the database, and triggers an email confirmation via AWS SES.
-   **Security:** Never expose Stripe secret keys on the client. All Stripe API calls must be made from the backend. The webhook endpoint must verify the Stripe signature.

### Admin & Role-Based Access

-   **Authentication:** Admin login will be handled by AWS Cognito.
-   **Protection:** Use Next.js Middleware (`middleware.ts`) to protect all routes under `/admin/*`. The middleware will verify the user's Cognito session.
-   **Roles:** User roles (Admin, Editor, Finance) will be stored as claims within the Cognito user token. The middleware and API routes will check these claims to authorize specific actions.

## 6. AI Interaction Guidelines

1.  **Acknowledge and Plan:** Before writing any code, briefly state your plan to confirm your understanding of the request.
2.  **Update Changelog:** After generating or modifying code, you **MUST** append a summary of your changes to `changelog.md`. Use a concise, bulleted list format. For example:
    -   `feat(donations): Created /api/donations/create-checkout endpoint.`
    -   `fix(components): Corrected styling on Button component for dark mode.`
    -   `refactor(lib): Moved date formatting function to lib/utils.ts.`
3.  **Strict Adherence:** Follow all rules in this document. Do not deviate from the specified tech stack, architecture, or coding conventions.
4.  **Clarity and Explanation:** Generate clean, readable, and self-documenting code. Add JSDoc comments for functions and explain any complex or non-obvious logic.
5.  **Be Proactive:** If a request is ambiguous or conflicts with these rules, ask for clarification. If you see an opportunity to improve code quality or follow a best practice not listed here, suggest it.
```