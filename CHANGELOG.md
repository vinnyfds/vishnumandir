# Changelog

All notable changes to the Vishnu Mandir, Tampa project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

**IMPORTANT:** This changelog MUST be updated for EVERY code change, feature addition, bug fix, or configuration update. See `.cursorrules` Section 17 for detailed requirements.

---

## [Unreleased]

### Added
- chore(repo): Initial commit; push to GitHub (vinnyfds/vishnumandir)
- feat(backend): Complete backend implementation per plan - Phase 1: stripe, zod, multer, uuid; CORS `x-api-key`; `/api/v1` router; Zod schemas (forms, payments); response helpers (`success`/`error`); API-key middleware; contract-style error middleware. Phase 2: Prisma migrations for PujaSponsorship (pujaId, location, attachmentUrl, transactionId) and FacilityRequest (eventType, startTime, endTime, numberOfGuests, requirements, transactionId); FormSubmission model for optional forms. Phase 3: POST `/api/v1/forms/sponsorship` (multipart, multer; S3 deferred); POST `/api/v1/forms/facility-request` (JSON); Stripe client; POST `/api/v1/payments/donation-intent` (optional donorEmail/donorName metadata); POST `/api/v1/payments/subscription`; POST `/webhooks/stripe` (raw body, payment_intent.succeeded, invoice.paid; Donation create, receipts, admin notify). Phase 4: Cognito JWT + RBAC middleware (jose, JWKS); GET `/api/admin/donations`, `/api/admin/donations/export` (CSV, no PII); GET/PATCH `/api/admin/sponsorships`; GET `/api/admin/facility-requests`. Phase 5: POST `/api/v1/forms/donation-statement`, `/change-of-address`, `/email-subscription`; FormSubmission persistence and confirm emails.
- feat(frontend): API client `lib/api.ts` (postJson, postFormData, x-api-key); PujaSponsorshipForm, FacilityRequestForm, DonationStatementForm, ChangeOfAddressForm, EmailSubscriptionForm client components wired to backend; DonateForm with Stripe Elements (one-time donation); `/support/donate` and `/support/donate/success` pages; recurring-donation links to `/support/donate`. Stripe packages `@stripe/stripe-js`, `@stripe/react-stripe-js`.
- feat(cms): Strapi headless CMS setup - `cms/` (Strapi 5) with PostgreSQL; content types Event, PujaService, Priest, Announcement, Newsletter, Page per sitemap; `pnpm-workspace` + `dev:cms` / `dev:all` scripts; `docker/postgres-init/01-create-cms-db.sh` for `vishnu_mandir_cms` DB; `docs/development/cms-setup.md` (RBAC, API token, first-admin); project-readme CMS and run instructions updated. `.gitignore` cms artifacts; root `.env` `CMS_API_TOKEN` comment.
- feat(email): Resend email integration - `resend` package in backend, `backend/src/utils/resend.client.ts` singleton, `backend/src/services/email.service.ts` with `sendEmail()`, `RESEND_API_KEY` and updated `SENDER_EMAIL_ADDRESS`/`ADMIN_EMAIL_ADDRESS` in `.env.example`. Dev-only `POST /api/dev/test-email` route when `NODE_ENV=development`.
- feat(forms): Form-specific fields and structural fixes site-wide - Contact: Subject/Inquiry Type, wrap in form; Volunteer: Area of Interest, Availability, Skills textarea, wrap in form; Donation Statement: client component with custom-period toggle, dynamic year labels, conditional mailing address; Change of Address: structured address (street, city, state, zip), optional What changed?; Request Facility: Start/End time, Number of Guests required, API-aligned field names; Puja Sponsorships: Names for Sankalpam, optional file upload, Puja to Sponsor (pujaId), API/FRD aligned; Feedback: Category required; Email Subscription: optional unsubscribe reason; Newsletter: optional event-updates checkbox. New `DonationStatementForm` client component in `frontend/src/components/forms/DonationStatementForm.tsx`.
- feat(assets): Asset folder structure and segregation script per Assets Building Plan - `frontend/public/images/{og,hero,home,deities,festivals,temple,gallery}/`, `frontend/public/uploads/`, `frontend/public/pdf/newsletters/`, `frontend/scripts/segregate-assets.mjs`, `frontend/scripts/asset-mapping.example.json`, `pnpm run segregate-assets`
- docs(assets): Added ASSET_PROMPTS.md with prompts, filenames, resolution, and aspect ratio for all assets - `docs/assets/ASSET_PROMPTS.md`
- feat(audio): Site-wide Om ambient sound with mute toggle - `frontend/public/audio/om.mp3`, `OmAudioContext`, `AudioToggle`, persisted in localStorage
- feat(assets): Wired uploaded assets into site - new logo (logo.png), OG default image, home hero and event cards, deity images, festival images, temple virtual-visit images
- Initial project setup with Next.js and Express
- Database schema with PostgreSQL
- Event Calendar feature
- Recurring Donations feature
- Puja Sponsorship Forms feature
- User Role Management feature
- Newsletter Archives feature

### Changed
- refactor(backend): API index mounts `/api/v1`, `/api/admin`; server mounts `/webhooks/stripe` with express.raw before express.json.
- refactor(frontend): Puja-sponsorship, facility-request, donation-statement, change-of-address, email-subscription form pages use new client form components; placeholder notes updated.
- refactor(frontend): Header uses `VISHNUMANDIR LOGO (3).png`; reduced size and fit inside header (h-12/h-14, w-36/w-44); SEO org logo updated to same

### Fixed
- fix(cultural): Added Music icon import and ImageIcon alias in media page - `frontend/src/app/(site)/cultural/media/page.tsx`
- fix(frontend): Downgraded Tailwind CSS from v4 to v3.4.19 to fix configuration compatibility - `frontend/package.json`, `frontend/postcss.config.mjs`
- fix(backend): Updated @prisma/client dependency from workspace reference to direct version - `backend/package.json`

---

## [0.4.0] - 2026-01-25

### Added
- feat(monorepo): Initialized pnpm monorepo workspace structure with frontend and backend workspaces - `package.json`, `pnpm-workspace.yaml`
- feat(monorepo): Created root workspace configuration with dev, build, and typecheck scripts - `package.json`
- feat(infrastructure): Added Docker Compose configuration for local PostgreSQL database - `docker-compose.yml`
- feat(infrastructure): Created comprehensive .gitignore file for monorepo structure - `.gitignore`
- feat(frontend): Scaffolded Next.js 14+ application with TypeScript, Tailwind CSS, and App Router - `frontend/` workspace
- feat(frontend): Configured Tailwind CSS with design tokens (colors, fonts, spacing, shadows) from brand guide - `frontend/tailwind.config.ts`
- feat(frontend): Set up Lora (serif) and Lato (sans-serif) fonts using next/font/google - `frontend/src/app/layout.tsx`
- feat(frontend): Created global CSS with Tailwind base layers - `frontend/src/app/globals.css`
- feat(frontend): Integrated logo and tagline images into public assets - `frontend/public/images/logo.png`, `frontend/public/images/tagline.png`
- feat(components): Created Header component with logo, tagline, and navigation - `frontend/src/components/layout/header/Header.tsx`
- feat(components): Created Footer component with quick links, connect section, and legal links - `frontend/src/components/layout/footer/Footer.tsx`
- feat(layout): Created public site layout wrapper with Header and Footer - `frontend/src/app/(site)/layout.tsx`
- feat(pages): Created homepage with hero section, announcements, upcoming events, and quick links - `frontend/src/app/(site)/page.tsx`
- feat(database): Initialized Prisma schema with User, Event, Donation, PujaSponsorship, FacilityRequest, and Newsletter models - `prisma/schema.prisma`
- feat(backend): Scaffolded Express.js backend with TypeScript in separate workspace - `backend/` workspace
- feat(backend): Created Express server with CORS, Morgan logging, and error handling middleware - `backend/src/server.ts`
- feat(backend): Set up Prisma client singleton for backend use - `backend/src/utils/prisma.client.ts`
- feat(backend): Created CORS configuration for frontend communication - `backend/src/config/corsOptions.ts`
- feat(backend): Implemented global error handling middleware - `backend/src/middleware/error.middleware.ts`
- feat(backend): Created API routes structure with health check endpoint - `backend/src/api/index.ts`
- feat(backend): Set up TypeScript configuration for backend - `backend/tsconfig.json`
- feat(backend): Configured nodemon for development hot-reloading - `backend/nodemon.json`
- feat(config): Created comprehensive .env.example with all required environment variables - `.env.example`

### Changed
- refactor(rules): Updated .cursorrules to reflect monorepo structure with frontend/backend workspaces - `.cursorrules` Section 2, 3, 7
- refactor(rules): Updated file structure documentation to show monorepo layout - `.cursorrules` Section 3
- refactor(rules): Updated backend development section to reflect Express.js in separate workspace - `.cursorrules` Section 7
- refactor(rules): Updated Prisma client location documentation to backend workspace - `.cursorrules` Section 8
- refactor(rules): Updated Server Components example to show API calls instead of direct Prisma access - `.cursorrules` Section 5

### Fixed
- N/A

---

## [0.3.0] - 2026-01-25

### Added
- docs(rules): TypeScript deployment patterns section with Express type augmentation, req.params handling, Zod patterns, and Stripe API version management - `.cursorrules` Section 24
- docs(rules): Deployment troubleshooting section covering AWS Amplify, Prisma, and common build issues - `.cursorrules` Section 25
- types(express): Express Request type augmentation file for req.user property - `types/express.d.ts`
- types(auth): Authentication type definitions including AuthRequest interface and CognitoJwtPayload - `types/auth.d.ts`
- docs(deployment): Deployment checklist with pre-deployment, build, and post-deployment verification steps - `docs/deployment/DEPLOYMENT_CHECKLIST.md`
- docs(deployment): Troubleshooting guide with solutions for common TypeScript, Amplify, Prisma, and environment variable issues - `docs/deployment/TROUBLESHOOTING.md`

### Changed
- docs(rules): Enhanced Prisma guidelines with SSL connection requirements, build process, and migration workflow - `.cursorrules` Section 8
- docs(rules): Enhanced environment variables section with PostgreSQL SSL format and AWS Amplify-specific configuration notes - `.cursorrules` Section 20
- docs(rules): Enhanced deployment section with build configuration, common issues, and troubleshooting - `.cursorrules` Section 21

### Fixed
- N/A

---

## [0.2.0] - 2026-01-25

### Added
- docs(rules): Comprehensive project rules file (`.cursorrules`) consolidating all documentation - `.cursorrules`
- docs(changelog): Standardized CHANGELOG.md format with mandatory update requirements - `CHANGELOG.md`
- docs(workflow): Integrated changelog tracking into development workflow rules - `.cursorrules`

### Changed
- docs(changelog): Standardized changelog format to follow Keep a Changelog specification - `CHANGELOG.md`
- docs(rules): Enhanced `.cursorrules` with comprehensive project context, architecture, coding standards, and workflows - `.cursorrules`

---

## [0.1.0] - 2026-01-25

### Added
- Project documentation generated by Web Doc AI
- Initial architecture and tech stack decisions
- Core feature specifications

---

## Changelog Entry Format

When adding entries to this changelog, use the following format:

```markdown
### Added
- <type>(<scope>): <description> - <files changed>

### Changed
- <type>(<scope>): <description> - <files changed>

### Fixed
- <type>(<scope>): <description> - <files changed>

### Security
- security(<scope>): <description> - <files changed>
```

**Type Prefixes (Conventional Commits):**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `security`: Security improvements

**Examples:**
```markdown
### Added
- feat(components): Created PujaServiceCard component - components/ui/PujaServiceCard.tsx
- feat(api): Added POST /api/donations endpoint with Stripe integration - app/api/donations/route.ts

### Changed
- refactor(lib): Moved date formatting to lib/utils.ts - lib/utils.ts

### Fixed
- fix(forms): Corrected email validation in sponsorship form - components/forms/SponsorshipForm.tsx

### Security
- security(api): Added webhook signature verification for Stripe - app/api/webhooks/stripe/route.ts
```

---

## When to Update This Changelog

Update this changelog for:
- ✅ New component creation
- ✅ API endpoint addition/modification
- ✅ Database schema changes
- ✅ Configuration updates
- ✅ Bug fixes
- ✅ Refactoring
- ✅ Documentation updates
- ✅ Dependency updates (major versions)
- ✅ Security improvements

**This is MANDATORY for all changes.** See `.cursorrules` Section 17 for complete requirements.
