# ADR-001: Tech Stack Selection

**Status:** Accepted
**Date:** January 2026
**Context:** Initial technology selection for this project

---

## Decision

Use the following tech stack:

### Backend

- **NestJS 11** - Enterprise-grade TypeScript framework
- **Redis** - Caching and job queues (via BullMQ if needed)

### Frontend

- **Next.js 14** - React Server Components, App Router
- **Tailwind CSS** - Utility-first styling

### Monorepo

- **Yarn 4 Workspaces** - Package management

---

## Context

Building a full-stack application that:

1. Needs a structured, scalable backend
2. Requires modern React with SSR capabilities
3. Benefits from shared code between frontend and backend

---

## Alternatives Considered

### Backend Framework

| Option     | Pros                                         | Cons                    |
| ---------- | -------------------------------------------- | ----------------------- |
| **NestJS** | DI, TypeScript, testing, enterprise patterns | Learning curve          |
| Express    | Simple, familiar                             | No structure, manual DI |
| Fastify    | Fast                                         | Less ecosystem          |

**Decision:** NestJS for structure, DI, and enterprise patterns.

### Frontend

| Option         | Pros                   | Cons               |
| -------------- | ---------------------- | ------------------ |
| **Next.js 14** | RSC, SSR, file routing | Complexity         |
| Remix          | Data loading           | Less ecosystem     |
| SPA (Vite)     | Simple                 | No SSR, SEO issues |

**Decision:** Next.js 14 with RSC for performance and SEO.

---

## Implications

1. **Type Safety**: Full TypeScript across the stack
2. **API Documentation**: Swagger auto-generated from decorators
3. **Scalability**: NestJS modules enable clean separation
4. **Performance**: RSC reduces client-side JavaScript

---

## Future Considerations

- **Database**: Add PostgreSQL/MySQL when needed
- **ORM**: Consider Drizzle or Prisma
- **Authentication**: Add auth provider (Auth.js, Clerk, etc.)
- **Job Queue**: Add BullMQ for background processing

---

**Last Updated:** January 2026
