# RULES.md — Change Boundaries & Placement (Backend & DB Ready)

This document sets guardrails for routes, backend, and database structure. Update first if scope expands.

## 1) Routing & Placement
- Public pages live in `app/`.
- Dashboard/auth (if any): use `app/(dashboard)/` and `app/(login)/` route groups, with shared layouts.
- Add client UI islands in `components/`.
- API/backend/data logic: use server actions in `app/actions/` and helpers in `lib/db/`.

## 2) Dashboard Page Pattern
- Use Server Components under `app/` unless hooks/event handlers are required; mark `use client` if needed.
- Never mix hooks or browser APIs into Server Components.
- Keep dashboard shell in `dashboard/layout.tsx` when created.

## 3) Backend & Data (NEW: Present!)
- Use Prisma for DB schema (`prisma/schema.prisma`).
- Centralize queries in `lib/db/queries.ts` (no ad-hoc queries).
- Place server actions for data ops in `app/actions/`.
- Only mutate data via these shared helpers/server actions.
- Run migrations using `npx prisma migrate dev --name <feature>`; never hand-edit SQL.
- Amounts: store in cents for integers, dates as DateTime (ISO).
- Enum and types: sync with frontend data structures.

## 4) Auth & Security
- Auth/session setup (`lib/auth/session.ts`, `middleware.ts`) requires approval.
- Server actions must only return serializable data (never JSX, never functions).

## 5) Infrastructure & Scripts
- Scripts/infra remain server-only, except `error-reporter.ts` for ErrorReporter component.
- Never move files across route groups without coordination.

## 6) Coordination & Docs
- Update FILES.md and README.md for any backend/data/api changes.
- Avoid new *.md explainers unless explicitly needed.
- Describe all new DB/API contracts for dashboard/server actions in existing docs.

# Next.js Server/Client Patterns

## Server vs Client Components
- Default files in `app/` are Server Components.
- Use `use client` at top for component files using hooks/event handlers.
- Server Components handle SSR, data fetching, and API logic.

## Server Actions
- Place in `app/actions/*.ts`; must start with `use server`.
- Must be serializable (no JSX or references).
- Call only shared helpers and DB methods inside actions.

## Environment & Hydration
- Access `process.env` for secrets only in server actions/components.
- Hydration must use deterministic output (no random/time/locale in render).

## DB & API Best Practices
- Only access the database via `lib/db/queries.ts` or appropriate helpers.
- Never introduce ad-hoc queries in components or new server code.

---
Operate carefully. Stay documented and deterministic. Ask first if in doubt.