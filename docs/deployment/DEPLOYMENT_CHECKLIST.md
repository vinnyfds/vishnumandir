# Deployment Checklist

This checklist ensures a smooth deployment process for the Vishnu Mandir, Tampa website to AWS Amplify.

## Pre-Deployment Checklist

### Code Quality
- [ ] All TypeScript compilation errors fixed (`npm run build` succeeds locally)
- [ ] All linting errors resolved (`npm run lint`)
- [ ] Code formatted with Prettier (`npm run format`)
- [ ] All tests passing (if applicable)
- [ ] CHANGELOG.md updated with all changes

### Database
- [ ] Prisma schema updated (if needed)
- [ ] Migration created: `npx prisma migrate dev --name <descriptive-name>`
- [ ] Migration tested locally
- [ ] Prisma Client generated: `npx prisma generate`
- [ ] Database connection string verified (includes `?sslmode=require` for RDS)

### Environment Variables
- [ ] All required environment variables documented in `.env.example`
- [ ] Production environment variables prepared (never commit actual values)
- [ ] DATABASE_URL includes SSL for RDS: `postgresql://...?sslmode=require`
- [ ] Stripe API version is valid and current

### Configuration
- [ ] `next.config.mjs` configured correctly
- [ ] `amplify.yml` configured (if custom build needed)
- [ ] Type definitions in place (`types/express.d.ts`, `types/auth.d.ts`)
- [ ] All API routes tested locally

### Third-Party Services
- [ ] Stripe webhook endpoint configured
- [ ] AWS Cognito user pool configured
- [ ] AWS SES configured for email sending
- [ ] Strapi CMS accessible (if used during build)

## AWS Amplify Configuration

### Environment Variables Setup
1. Go to AWS Amplify Console > Your App > App Settings > Environment Variables
2. Add all required variables (see list below)
3. Ensure `NEXT_PUBLIC_*` variables are set for client-side access
4. Verify DATABASE_URL includes `?sslmode=require` for RDS

### Required Environment Variables

**Database:**
- `DATABASE_URL` - PostgreSQL connection string with SSL

**Stripe:**
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_API_VERSION` (optional, defaults in code)

**AWS Cognito:**
- `COGNITO_USER_POOL_ID`
- `COGNITO_CLIENT_ID`
- `NEXT_PUBLIC_COGNITO_REGION`

**Strapi CMS:**
- `CMS_API_URL`
- `CMS_API_TOKEN`

**AWS SES:**
- `AWS_SES_REGION`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

**Application:**
- `NEXT_PUBLIC_URL` - Production URL
- `NEXTAUTH_SECRET` - Random secret string

## Build Process Verification

### Local Build Test
```bash
# 1. Generate Prisma Client
npx prisma generate

# 2. Build application
npm run build

# 3. Verify no errors
```

### Amplify Build Steps
1. Install dependencies: `npm ci`
2. Generate Prisma Client: `npx prisma generate`
3. Run migrations: `npx prisma migrate deploy` (production)
4. Build Next.js: `npm run build`
5. Deploy static assets and API routes

## Post-Deployment Verification

### Application Health
- [ ] Homepage loads correctly
- [ ] API routes respond (test `/api/health` if available)
- [ ] Database connections working
- [ ] Static assets loading (images, CSS, JS)

### Authentication
- [ ] Admin login works (AWS Cognito)
- [ ] JWT tokens validated correctly
- [ ] Role-based access control working

### Payments
- [ ] Stripe checkout session creation works
- [ ] Webhook endpoint receiving events
- [ ] Payment processing completes successfully

### Database
- [ ] Migrations applied successfully
- [ ] Database queries working
- [ ] Connection pool healthy

### Email
- [ ] AWS SES sending emails
- [ ] Confirmation emails received
- [ ] Admin notifications working

## Rollback Plan

If deployment fails:

1. **Check Build Logs:** AWS Amplify Console > Build history > View logs
2. **Common Issues:**
   - TypeScript compilation errors → Fix locally, push fix
   - Missing environment variables → Add in Amplify Console
   - Database connection issues → Verify DATABASE_URL with SSL
   - Prisma Client missing → Ensure `npx prisma generate` in build
3. **Rollback:** AWS Amplify allows rollback to previous successful deployment

## Monitoring

After deployment, monitor:

- [ ] Application logs (CloudWatch)
- [ ] API route performance
- [ ] Database connection pool
- [ ] Error rates
- [ ] Stripe webhook delivery
- [ ] Email delivery rates

## Troubleshooting

See `TROUBLESHOOTING.md` for common issues and solutions.

---

**Last Updated:** 2026-01-25  
**Related Documentation:**
- `.cursorrules` Section 25: Deployment Troubleshooting
- `docs/delivery/ci/cd-strategy.md`: CI/CD Strategy
