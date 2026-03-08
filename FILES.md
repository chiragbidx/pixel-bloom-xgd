# FILES.md — Structural & Architectural Index (Next.js App Router Starter)

AI-facing index of the repository as it exists today. If something is unclear: **STOP AND ASK**.

---

## 1. High-Level Overview
- Purpose: minimal App Router scaffold with SaaS logic, now with data layer.
- Style: file-system routing, server-preferred components.
- Tech: Next.js 16, React 19, TypeScript 5, Tailwind-ready PostCSS, ESLint 9, Prisma/Postgres backend.
- Not present: auth, API route groups, billing, queues, tests.

## 2. Application Entry Points
- `app/layout.tsx`: Root layout; loads Geist fonts; applies globals.
- `app/page.tsx`: Public landing page (server component).
- `app/globals.css`: Global styles; imports Tailwind; defines light/dark CSS variables.
- `next.config.ts`: Minimal Next config placeholder.
- `postcss.config.mjs`: PostCSS with `@tailwindcss/postcss`.
- No `middleware.ts`; requests go straight to App Router.

## 3. Modules / Feature Areas
- `app/`: UI shell, server actions, and routing.
- `components/`: Shared UI islands (SubscriptionsPanel, AgentActionPanel, ErrorReporter).
- `public/`: Static assets (logos/icons).
- `lib/`: Server-side helpers (db/queries.ts for Prisma-backed data).
- Config/tooling: `eslint.config.mjs`, `postcss.config.mjs`, `next.config.ts`, `tsconfig.json`, Prisma schema.
- Route groups, payment, and advanced features: not present.

## 4. Routes (Controllers)
- `/` → `app/page.tsx`
  - Hero, dashboard, SaaS cards, and SubscriptionsPanel client UI island.
  - Layout: responsive, centered, mobile friendly, support/finance oriented.
  - DTOs/validation/guards: none for landing.

## 5. Services & Providers
- Prisma ORM, via `prisma/schema.prisma`, `lib/db/queries.ts`, and migration pipeline.
- No external APIs or providers yet.

## 6. Data Layer
- ORM/DB: Prisma schema in `prisma/schema.prisma`, helpers in `lib/db/queries.ts`.
- Migrations: via Prisma CLI and Railway/Postgres, not hand-edited.
- Data is SSRed for server actions (see app/actions/subscriptionActions.ts).

## 7. DTOs, Schemas & Validation
- When adding more APIs/forms, keep validators with the feature or under `lib/validation/` and document contracts.

## 8. Cross-Cutting Concerns
- Auth, logging, tracing: not implemented. Add server-only helpers under `lib/` as needed.

## 9. Configuration & Environment
- `env.example`: lists `DATABASE_URL` (required), `OPENAI_API_KEY` (optional).
- Secrets: keep in `.env.local` for dev.
- Config: `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `tsconfig.json`, `prisma/schema.prisma`.

## 10. Async & Background Processing
- Queues/workers/schedulers: none.

## 11. Testing Structure
- No tests. When added: unit (`__tests__/` or co-located), e2e (`e2e/`), fixtures in `tests/utils/`.

## 12. File & Directory Index
```
.gitignore                # Git ignores
README.md                 # Operational guide
FILES.md                  # Structural index (this file)
RULES.md                  # Change boundaries (boilerplate)
Dockerfile                # Container definition
app/
  favicon.ico             # Favicon
  globals.css             # Global styles + Tailwind entry
  layout.tsx              # Root layout
  page.tsx                # Public landing page (/)
  actions/
    subscriptionActions.ts # Server actions for subscriptions
public/
  file.svg                # Asset
  globe.svg               # Asset
  next.svg                # Next.js logo
  vercel.svg              # Vercel logo
  window.svg              # Asset
scripts/
  db-init.js              # Placeholder
  dev-supervisor.js       # Runs dev server
  git-poll.js             # Git updates
  error-reporter.ts       # For ErrorReporter UI
components/
  AgentActionPanel.tsx    # Client notes
  ErrorReporter.tsx       # Error client
  SubscriptionsPanel.tsx  # Subscription UI (client)
lib/
  db/
    queries.ts            # Prisma-backed db queries
prisma/
  schema.prisma           # Prisma schema
eslint.config.mjs         # ESLint config
next.config.ts            # Next.js config
postcss.config.mjs        # PostCSS config
tsconfig.json             # TypeScript config
package.json              # Scripts/deps
package-lock.json         # Locked deps
.git/                     # Git metadata
```

## 13. Safe Modification Guidance
- Add new actions and db helpers in pattern with SubscriptionsPanel and queries.ts.
- Keep server-only dependencies out of client code.
- Update README.md and RULES.md for scope additions.

---
If structure or intent is uncertain, **STOP AND ASK** before modifying.