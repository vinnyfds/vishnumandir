# Changelog

All notable changes to the Vishnu Mandir, Tampa project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

**IMPORTANT:** This changelog MUST be updated for EVERY code change, feature addition, bug fix, or configuration update. See `.cursorrules` Section 17 for detailed requirements.

---

## [Unreleased]

### Added
- feat(debugging): Created comprehensive CMS-frontend integration test script - scripts/test-cms-frontend-integration.sh - Tests Strapi API connectivity for all content types - Validates response structures and content availability - Provides detailed recommendations for fixing issues - Helps diagnose permission and configuration problems
- feat(api): Created /api/debug/cms endpoint for production diagnostics - frontend/src/app/api/debug/cms/route.ts - Tests CMS connectivity from deployed frontend server - Returns JSON with environment status, test results, and recommendations - Can be accessed at /api/debug/cms on any deployment
- docs(deployment): Created STRAPI_PERMISSIONS_VERIFICATION.md with comprehensive permission setup guide - docs/deployment/STRAPI_PERMISSIONS_VERIFICATION.md - Step-by-step instructions for verifying and configuring Strapi API token permissions - Documents both "Full access" and "Custom" token types - Includes troubleshooting section for common permission errors
- docs(deployment): Created CMS_TESTING_VALIDATION.md with complete testing guide for all content types - docs/deployment/CMS_TESTING_VALIDATION.md - Manual testing steps for Event, Announcement, Newsletter, Priest, Puja Service - Comprehensive checklist for verifying CMS-to-frontend content flow - Includes troubleshooting matrix and summary tables
- docs(deployment): Updated AMPLIFY_ENV_VARS.md with troubleshooting section - docs/deployment/AMPLIFY_ENV_VARS.md - Added CMS content troubleshooting steps - Added test commands for verifying API connectivity - Added ISR cache explanation and solutions

### Fixed
- fix(strapi): Added Strapi v5 to v4 response normalization layer - frontend/src/lib/strapi.ts - **ROOT CAUSE FOUND:** Strapi v5 returns flat responses `{id, title, ...}` but frontend expected v4 nested structure `{id, attributes: {title, ...}}` - Added `normalizeToV4()` and `normalizeArrayToV4()` functions to convert v5 flat responses to v4-like structure - Updated all fetch functions (fetchEvents, fetchPujaServices, fetchPriests, fetchAnnouncements, fetchNewsletters, fetchPageBySlug) to use normalization - CMS content now displays correctly on all frontend pages
- fix(strapi): Implemented client-side category filtering in fetchEvents() - Removed broken Strapi v5 API filter `filters[category][$eq]` which was returning empty results - Now fetches all events from API and filters by category client-side in JavaScript - Events now display correctly on `/education/events` page and other category-filtered pages - frontend/src/lib/strapi.ts
- fix(strapi): Implemented client-side filtering for announcements - Moved displayUntil and level filtering from API to client-side JavaScript - Announcements now filter correctly by expiration date and priority level - frontend/src/lib/strapi.ts

### Docs
- docs(deployment): Created FIX_CMS_CONTENT_DISPLAY.md with step-by-step fix guide - Identified root causes: event category "Religious" doesn't match page filter for "Educational", event start time 00:45:00 is in the past - Provided detailed instructions to edit event in Strapi: change category to "Educational" and set future start time - docs/deployment/FIX_CMS_CONTENT_DISPLAY.md
- docs(deployment): Created CMS_CONTENT_DIAGNOSTIC_RESULTS.md with diagnostic findings - Diagnosed CMS content visibility issue: environment variables correctly configured, API connectivity working, issue is insufficient content in Strapi (only 1 event and 1 priest published, 0 puja services/announcements/newsletters) - docs/deployment/CMS_CONTENT_DIAGNOSTIC_RESULTS.md
- docs(scripts): Created diagnose-cms-connection.sh diagnostic script - Tests all Strapi content type endpoints and reports availability - Helps identify content gaps and API connectivity issues - scripts/diagnose-cms-connection.sh

### Other Fixed
- fix(frontend): Added null safety checks for events in education/events page - Added defensive filters to remove events with missing attributes - Guard against undefined date/startTime before calling isFutureEvent() - Fixes Amplify build failure (Job 39): TypeError when generating static pages - frontend/src/app/(site)/education/events/page.tsx
- fix(strapi): Removed incompatible Strapi v5 API filters - Strapi v5 doesn't support complex filters like publishedAt[$notNull], category[$eq] - These filters caused API to return empty results, preventing content from displaying - Removed all problematic filter syntax and complex nested filters from strapi.ts fetch functions - Frontend now receives all published content and handles filtering client-side - Fixes event, puja services, priests, newsletters not displaying on frontend despite being published - frontend/src/lib/strapi.ts
- fix(frontend): Added comprehensive null safety checks for all Strapi data components - Added null checks in EventCard, PujaServiceCard, AnnouncementCard, NewsletterCard components to guard against undefined attributes - Added defensive filtering in priests, puja-services, and homepage pages to filter out invalid items - Prevents "Cannot read properties of undefined" errors during static page generation - Fixes Amplify build failures (Deployments 34-37) - frontend/src/components/shared/EventCard.tsx, frontend/src/components/shared/PujaServiceCard.tsx, frontend/src/components/shared/AnnouncementCard.tsx, frontend/src/components/shared/NewsletterCard.tsx, frontend/src/app/(site)/religious/priests/page.tsx, frontend/src/app/(site)/religious/puja-services/page.tsx, frontend/src/app/(site)/page.tsx
- fix(frontend): Added null safety checks for event attributes in current-events page - Added guards for undefined event.attributes.date and event.attributes.startTime before calling isFutureEvent - Prevents "Cannot read properties of undefined (reading 'date')" error during static generation - frontend/src/app/(site)/calendar/current-events/page.tsx
- fix(frontend): Added null safety check for priest attributes in PriestCard component - Added guard to return null if priest.attributes is undefined - Prevents "Cannot read properties of undefined (reading 'profileImage')" error during static generation - frontend/src/components/shared/PriestCard.tsx
- fix(amplify): Removed package-lock.json conflicting with pnpm - Removed frontend/package-lock.json since project uses pnpm (pnpm-lock.yaml) - Multiple lockfiles cause build conflicts in Amplify - frontend/package-lock.json
- fix(amplify): Removed unnecessary Prisma generation from frontend build - Frontend doesn't use Prisma Client, only backend workspace needs it - Removed npx prisma generate from frontend/amplify.yml preBuild commands - Fixes Amplify build failures (Deployments 34-35) - frontend/amplify.yml

### Added
- feat(cms): Created route, controller, and service files for all Strapi content types - Added route files using createCoreRouter for Event, Puja Service, Priest, Announcement, Newsletter, Page, Facility Request, Form Submission, and Puja Sponsorship - Added controller files using createCoreController for all content types - Added service files using createCoreService for all content types - Routes configured with public find/findOne endpoints for frontend access - Fixes 404 errors when accessing REST API endpoints - All API endpoints now working: /api/events, /api/puja-services, /api/priests, etc. - cms/src/api/*/routes/*.ts, cms/src/api/*/controllers/*.ts, cms/src/api/*/services/*.ts, docs/deployment/STRAPI_ROUTES_FIX_COMPLETE.md
- docs(deployment): Verified PostgreSQL tables for Strapi content types - Confirmed all content type tables exist (events, puja_services, priests, announcements, newsletters, etc.) with proper Strapi v5 structure - Verified content types are registered in strapi_core_store_settings - Confirmed database is properly initialized with Strapi metadata tables - Database tables are NOT the cause of 404 errors - docs/deployment/POSTGRESQL_TABLES_CHECK_RESULTS.md
- feat(diagnostics): Added debug logging for Strapi API calls - frontend/src/lib/strapi.ts, frontend/src/app/(site)/education/events/page.tsx
- docs(deployment): Created STRAPI_API_PERMISSIONS_FIX.md with instructions to fix 404 errors - docs/deployment/STRAPI_API_PERMISSIONS_FIX.md
- docs(deployment): Created STRAPI_API_TROUBLESHOOTING.md with detailed troubleshooting steps - docs/deployment/STRAPI_API_TROUBLESHOOTING.md
- docs(deployment): Created STRAPI_FIND_CONTENT_TYPES_IN_PERMISSIONS.md with step-by-step guide to locate content types - docs/deployment/STRAPI_FIND_CONTENT_TYPES_IN_PERMISSIONS.md
- docs(deployment): Created STRAPI_FULL_ACCESS_TOKEN_SOLUTION.md for when individual content types don't appear in permissions - docs/deployment/STRAPI_FULL_ACCESS_TOKEN_SOLUTION.md
- docs(deployment): Created STRAPI_TOKEN_VERIFICATION_STEPS.md with token verification and restart instructions - docs/deployment/STRAPI_TOKEN_VERIFICATION_STEPS.md
- docs(deployment): Created RESTART_STRAPI_MANUAL_STEPS.md with step-by-step instructions to restart Strapi - docs/deployment/RESTART_STRAPI_MANUAL_STEPS.md
- docs(deployment): Created STRAPI_V5_API_ROUTES_NOT_REGISTERED.md with diagnosis for 404 errors - docs/deployment/STRAPI_V5_API_ROUTES_NOT_REGISTERED.md
- docs(deployment): Created STRAPI_RUN_MIGRATIONS.md with migration steps - docs/deployment/STRAPI_RUN_MIGRATIONS.md
- docs(deployment): Created STRAPI_API_404_FINAL_DIAGNOSIS.md with final diagnosis and solution - docs/deployment/STRAPI_API_404_FINAL_DIAGNOSIS.md
- feat(scripts): Created test-strapi-api.sh script to test all Strapi API endpoints - scripts/test-strapi-api.sh

### Changed
- refactor(audio): Replaced om.mp3 with vishnumandir-audio.mp3 and enabled auto-play on page load - Audio now plays automatically when users land on the page (default muted: false), users can still toggle it off - Replaced frontend/public/audio/om.mp3 with frontend/public/audio/vishnumandir-audio.mp3 - Updated OmAudioContext to use new audio file and default to playing - frontend/src/components/audio/OmAudioContext.tsx, frontend/public/audio/vishnumandir-audio.mp3

### Fixed
- fix(images): Fixed squished deity images by maintaining proper aspect ratio - Changed image container from fixed height (h-48) to aspect-square to preserve 1:1 ratio for square deity images - frontend/src/app/(site)/deities/page.tsx
- fix(images): Configured Next.js to allow Strapi CMS image domains - Added remotePatterns to next.config.ts for cms.vishnumandirtampa.com and localhost:1337 to enable priest images and other Strapi media to load correctly - frontend/next.config.ts
- fix(typescript): Fixed TypeScript compilation error in Strapi debug logging - Removed invalid error property access from StrapiCollectionResponse type in fetchEvents debug logging - frontend/src/lib/strapi.ts

### Added
- feat(frontend): Complete Strapi CMS integration for all content types - frontend/src/lib/strapi.ts, frontend/src/types/strapi.ts, frontend/src/lib/strapi-utils.ts
- feat(components): Created reusable display components for Strapi content - EventCard, EventList, PujaServiceCard, PriestCard, AnnouncementCard, NewsletterCard - frontend/src/components/shared/
- feat(pages): Integrated Strapi content fetching into all relevant pages:
  - /education/events - Fetches and displays Educational category events
  - /calendar/current-events - Fetches and displays all published events
  - Home page - Fetches and displays announcements and featured events
  - /religious/puja-services - Fetches and displays puja services from Strapi
  - /religious/priests - Fetches and displays priest profiles from Strapi
  - /calendar/newsletter - Fetches and displays newsletter archive from Strapi
- feat(caching): Implemented ISR (Incremental Static Regeneration) with appropriate revalidation times:
  - Events and Announcements: 5 minutes (300s)
  - Puja Services, Priests, Newsletters: 1 hour (3600s)

### Changed
- refactor(pages): Converted static pages to async Server Components that fetch from Strapi CMS
- refactor(components): Updated all content display components to use Strapi data instead of hardcoded content

## [Unreleased]

### Added
- feat(integration): Added Strapi integration for form submissions viewing - Created Strapi content types for puja-sponsorship, facility-request, and form-submission - Created strapi.service.ts in backend to sync submissions to Strapi via REST API - Updated form submission routes to sync data to Strapi after PostgreSQL write (non-blocking) - Added axios dependency to backend for Strapi API calls - Form submissions now visible in Strapi admin panel while PostgreSQL remains source of truth - Fixed Resend client initialization to handle missing API key gracefully - Committed and deployed code to servers, content types registered in Strapi - cms/src/api/puja-sponsorship/content-types/puja-sponsorship/schema.json, cms/src/api/facility-request/content-types/facility-request/schema.json, cms/src/api/form-submission/content-types/form-submission/schema.json, backend/src/services/strapi.service.ts, backend/src/api/v1/forms.routes.ts, backend/src/utils/resend.client.ts, backend/package.json, docs/deployment/STRAPI_FORM_SUBMISSIONS_SETUP.md
- feat(deployment): Deployed Strapi CMS to production Lightsail instance - Created production .env file with generated security keys (APP_KEYS, JWT secrets, encryption keys) - Configured AWS S3 credentials for media storage - Set up database connection settings (PostgreSQL on Lightsail) - Restarted PM2 service with updated environment - Service ready pending database password configuration - docs/deployment/DEPLOYMENT_STATUS.md
- fix(deployment): Fixed CMS domain connectivity by opening port 1337 in Lightsail firewall - Opened port 1337 in Lightsail instance firewall using AWS CLI - Verified firewall configuration and service listening status - Tested connectivity via both direct IP and domain name - CMS now accessible at http://cms.vishnumandirtampa.com:1337 - docs/deployment/DEPLOYMENT_STATUS.md
- feat(deployment): Deployed frontend to new Amplify app (d1rp3bwb0j3dq8) - Updated frontend/amplify.yml for non-monorepo configuration with pnpm support, corepack setup, and correct baseDirectory (frontend/.next) - Created environment variables documentation (docs/deployment/AMPLIFY_ENV_VARS.md) - Successful deployment (Job 2: SUCCEED) - Build and deploy completed successfully - Note: Root path returns 404, sub-paths work correctly (Next.js routing issue to investigate) - frontend/amplify.yml, docs/deployment/AMPLIFY_ENV_VARS.md
- feat(auth): AWS Cognito User Pool setup for admin authentication - Created Cognito User Pool (vishnu-mandir-admin-pool, ID: us-east-1_N3Kxkj933) with secure password policy - Created App Client (vishnu-mandir-frontend-client, ID: 343pre3iphtlr0od4bkl1n78ar) with OAuth 2.0 settings - Created four user groups: Admin, Editor, Finance, EventManager - Created initial admin user (admin@vishnumandirtampa.com) assigned to Admin group - Updated backend code to use EventManager (no space) to match Cognito group naming constraints - Configured environment variables in Amplify and local .env files - Created comprehensive setup documentation (docs/deployment/COGNITO_SETUP.md) - backend/src/api/admin/facility.routes.ts, types/auth.d.ts, docs/deployment/COGNITO_SETUP.md, .env
- feat(ui): Created custom 404 Not Found page - Added frontend/src/app/not-found.tsx with spiritual design matching site aesthetic - Includes navigation links to main sections (About, Events, Support) - Accessible and SEO-friendly - Uses Tailwind styling consistent with design system - frontend/src/app/not-found.tsx

### Changed
- feat(deployment): AWS Amplify frontend deployment configuration - Created Amplify app (d8s4hpdn0uxuc, vishnu-mandir-frontend), updated frontend/amplify.yml for pnpm monorepo structure with Prisma at root, configured basic environment variables (NEXT_PUBLIC_API_URL, CMS_API_URL, NEXT_PUBLIC_URL, NEXT_PUBLIC_COGNITO_REGION, STRIPE_API_VERSION), created setup script (scripts/amplify-setup.sh) for branch and domain configuration, added deployment documentation (docs/deployment/AMPLIFY_SETUP.md) - frontend/amplify.yml, scripts/amplify-setup.sh, docs/deployment/AMPLIFY_SETUP.md
- feat(iam): Created IAM service role for Amplify full-stack backend deployments - Created AmplifyBackendDeployRole-vishnu-mandir role with AmplifyBackendDeployFullAccess policy for deploying Lambda functions, API Gateway, and other backend resources via Amplify - IAM role: AmplifyBackendDeployRole-vishnu-mandir (arn:aws:iam::831926590271:role/AmplifyBackendDeployRole-vishnu-mandir)
- feat(deployment): Amplify frontend deployment completed - Connected GitHub repository, created main branch, configured build spec for monorepo with pnpm, set environment variables, attached custom domain vishnumandirtampa.com, successful deployment (Job ID: 2, Status: SUCCEED) - Deployment URL: https://main.d8s4hpdn0uxuc.amplifyapp.com - frontend/amplify.yml, AMPLIFY_DEPLOYMENT_STATUS.md
- feat(dns): Verified and documented Route53 DNS records - All DNS records correctly configured: apex domain (ALIAS A to CloudFront), www subdomain (CNAME to CloudFront, verified), api and cms subdomains (A records to Lightsail instances), SSL certificate validation CNAME - DNS resolution verified working - docs/deployment/ROUTE53_DNS_STATUS.md
- fix(deployment): Fixed Amplify monorepo build configuration - Updated frontend/amplify.yml to use correct monorepo format with appRoot: frontend, buildPath: frontend, and baseDirectory: .next - Removed unnecessary cd commands since buildPath handles directory context - Successful deployment (Job 11: SUCCEED) - Note: Root path returns 404, sub-paths work correctly (known Next.js SSR routing issue on Amplify) - frontend/amplify.yml
- feat(infrastructure): AWS infrastructure setup - Created Lightsail PostgreSQL database (vishnu-mandir-postgres, micro_2_0, endpoint: ls-6dc3fd3a57dc9f6f7081de1473b92ae349ce8bb7.cgl4acs00ai2.us-east-1.rds.amazonaws.com), backend instance (vishnu-mandir-backend, micro_3_0, static IP: 34.206.184.139), CMS instance (vishnu-mandir-cms, micro_3_0, IP: 44.202.153.84), S3 bucket (vishnu-mandir-cms-media) with CORS, deployment scripts (scripts/deploy-backend.sh, scripts/deploy-cms.sh, scripts/run-migrations.sh), environment templates (scripts/backend-env-template.txt, scripts/cms-env-template.txt), Amplify build config (frontend/amplify.yml), infrastructure documentation (docs/deployment/aws-infrastructure.md) - docs/deployment/aws-infrastructure.md, scripts/deploy-backend.sh, scripts/deploy-cms.sh, scripts/run-migrations.sh, frontend/amplify.yml
- feat(backend): Enhanced CORS configuration to support multiple origins including Amplify domain - backend/src/config/corsOptions.ts

### Fixed
- fix(deployment): Fixed AWS Amplify pnpm monorepo deployment - Updated pnpm-lock.yaml to sync with backend/package.json (axios dependency), created .npmrc with node-linker=hoisted for Amplify compatibility, fixed amplify.yml to use buildPath: / for monorepo root context with correct baseDirectory and cache paths - Deployment successful (Job 17: SUCCEED) - Website live at https://main.d1rp3bwb0j3dq8.amplifyapp.com - .npmrc, frontend/amplify.yml, pnpm-lock.yaml
- fix(backend): Fixed TypeScript compilation errors - added type annotation for donations map function parameter, fixed FormSubmissionType import by defining enum locally - backend/src/api/admin/donations.routes.ts, backend/src/api/v1/forms.routes.ts

### Changed
- feat(dns): Configured Route53 DNS records for api.vishnumandirtampa.com and cms.vishnumandirtampa.com subdomains - Route53 hosted zone Z10186528G387OP9KXEZ
- refactor(config): Updated environment variable templates and CORS configuration to use production domain names instead of IP addresses - scripts/backend-env-template.txt, scripts/cms-env-template.txt, backend/src/config/corsOptions.ts

### Added
- feat(firewall): Opened firewall ports on Lightsail instances - Port 4000 (TCP) for backend API, Port 1337 (TCP) for CMS - Verified DNS resolution and port accessibility - docs/deployment/DEPLOYMENT_STATUS.md, docs/deployment/aws-infrastructure.md

### Changed
- fix(cms): Attempted to start CMS service - Blocked by SSH connection timeout to CMS instance (44.202.153.84) - Instance shows as running but SSH port 22 times out - Documented issue and required steps for when SSH access is restored - docs/deployment/DEPLOYMENT_STATUS.md

### Added
- feat(cms): Started Strapi CMS service on Lightsail instance - Fixed SSH key permissions, built CMS application, created minimal .env file, started service with PM2 - Service accessible at http://cms.vishnumandirtampa.com:1337/api - Updated deployment scripts with correct SSH key paths - docs/deployment/DEPLOYMENT_STATUS.md, scripts/deploy-cms.sh, scripts/deploy-backend.sh

### Changed
- feat(cms): Upgraded CMS instance from micro_3_0 (1GB RAM) to medium_3_0 (4GB RAM) using snapshot method - Created snapshot (vishnu-mandir-cms-pre-upgrade-20260125), recreated instance from snapshot with medium_3_0 bundle, successfully installed dependencies, built CMS, started service with PM2, updated DNS record - Resolved memory constraints preventing npm install - docs/deployment/DEPLOYMENT_STATUS.md, docs/deployment/aws-infrastructure.md
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
- fix(header): Fixed logo not loading by renaming file and updating references - Renamed `VISHNUMANDIR LOGO (3).png` to `vishnumandir-logo.png` to avoid URL encoding issues - Updated Header component and SEO utility to use new filename without URL encoding - `frontend/public/images/vishnumandir-logo.png`, `frontend/src/components/layout/header/Header.tsx`, `frontend/src/lib/seo.ts`
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
