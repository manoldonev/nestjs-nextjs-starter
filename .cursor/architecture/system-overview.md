# System Overview

**Source of Truth for:** System architecture, data flow, service boundaries
**Last Updated:** January 2026
**Related:** [ADR-001](../decisions/ADR-001-tech-stack.md)

> If updating system architecture, update HERE ONLY.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Client                              │
│                    (Browser/Mobile)                         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Next.js Frontend                         │
│                      (Port 3001)                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Server       │  │ Client       │  │ API Routes   │      │
│  │ Components   │  │ Components   │  │ (Proxy)      │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    NestJS Backend                           │
│                      (Port 3000)                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Controllers  │  │ Services     │  │ Config       │      │
│  │ (HTTP)       │  │ (Business)   │  │ (Env)        │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     Infrastructure                          │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │ Redis        │  │ Database     │                        │
│  │ (Cache/Queue)│  │ (Add later)  │                        │
│  └──────────────┘  └──────────────┘                        │
└─────────────────────────────────────────────────────────────┘
```

---

## Monorepo Structure

```
nestjs-nextjs-starter/
├── apps/
│   ├── api/                 # NestJS backend
│   │   └── src/
│   │       ├── config/      # Configuration module
│   │       ├── main.ts      # Bootstrap
│   │       ├── app.module.ts
│   │       ├── app.controller.ts
│   │       └── app.service.ts
│   │
│   └── web/                 # Next.js frontend
│       └── src/
│           └── app/         # App Router pages
│
├── .cursor/                 # AI documentation
├── .context/                # Auto-injection rules
├── scripts/                 # Development scripts
├── docker-compose.yml       # Local infrastructure
└── package.json            # Root workspace config
```

---

## Data Flow

### Request Flow

1. Client makes request to Next.js (port 3001)
2. Next.js either:
   - Renders Server Component (direct data fetch)
   - Proxies API request to NestJS (port 3000)
3. NestJS processes request through:
   - Controller (HTTP handling, validation)
   - Service (business logic)
   - External services (database, cache, etc.)
4. Response flows back through the stack

### API Design

- **Base URL:** `/api`
- **Documentation:** `/api/docs` (Swagger)
- **Health Check:** `/api/health`

---

## Key Design Decisions

1. **Separation of Concerns**: NestJS handles API, Next.js handles UI
2. **Type Safety**: Full TypeScript across the stack
3. **API-First**: Backend designed as standalone API
4. **Proxy Pattern**: Next.js rewrites `/api/*` to NestJS

---

**Last Updated:** January 2026
