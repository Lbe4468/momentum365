# Momentum 365

Initial full-stack membership application for Momentum 365.

## Included

- Luxury single-page public site
- Membership application
- Secure account creation
- Password hashing with bcrypt
- HttpOnly signed session cookie
- Applicant dashboard
- Application statuses:
  - Pending Review
  - Under Review
  - Approved
  - Declined
- Internal admin application queue
- Server-side member ID generation
- PostgreSQL + Prisma data model
- Foundation for future membership opportunities, payments, documents, and communications

## Recommended production additions

Before public launch, add:

1. Email verification and password reset.
2. Dedicated database role/permissions instead of the initial `ADMIN_EMAIL` bootstrap approach.
3. Rate limiting on authentication and application endpoints.
4. CSRF protection appropriate to the final authentication architecture.
5. Audit logging for administrative actions.
6. Stronger application-review UI with full applicant detail and internal notes.
7. Terms/privacy/consent records.
8. Email notifications for application receipt and approval/decline.
9. Payment/subscription integration if membership fees are introduced.
10. Production database backups, monitoring, and error tracking.

## Local setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create environment file

Copy `.env.example` to `.env` and set:

- `DATABASE_URL`
- `AUTH_SECRET`
- `ADMIN_EMAIL`
- `NEXT_PUBLIC_APP_URL`

### 3. Create the database schema

```bash
npm run db:push
```

### 4. Start the app

```bash
npm run dev
```

Open `http://localhost:3000`.

## Creating the initial admin

The first admin mechanism uses `ADMIN_EMAIL`.

Create a normal user account using that exact email, then log in. That account will be treated as the administrator.

For production, replace this bootstrap mechanism with a database-backed role system and explicit admin provisioning.

## Deployment

A practical deployment is:

- Next.js application: Vercel
- PostgreSQL: managed PostgreSQL provider
- Domain: your preferred registrar/DNS provider
- Email: transactional email provider
- Future payments: Stripe

Do not commit `.env` or production credentials to source control.
