# Documentation Index

**Last Updated:** January 2026

> Quick navigation to all documentation. See [.cursor/README.md](../.cursor/README.md) for priority rules.

---

## Start Here

| Doc                                       | Purpose                                     |
| ----------------------------------------- | ------------------------------------------- |
| [CLAUDE.md](../CLAUDE.md)                 | AI assistant entry point (navigation hub)   |
| [README.md](../README.md)                 | Human-friendly intro, installation          |
| [rules.yaml](./rules.yaml)                | Auto-injecting checklists                   |
| [.cursor/README.md](../.cursor/README.md) | Documentation constitution & priority order |

---

## By Folder

### Decisions (`decisions/`)

| ADR                                                                 | Decision               |
| ------------------------------------------------------------------- | ---------------------- |
| [ADR-001-tech-stack.md](../.cursor/decisions/ADR-001-tech-stack.md) | NestJS + Next.js stack |

### Architecture (`architecture/`)

| File                                                             | Contents                                     |
| ---------------------------------------------------------------- | -------------------------------------------- |
| [system-overview.md](../.cursor/architecture/system-overview.md) | Tech stack, monorepo, packages, services |

### Reference (`reference/`)

| File                                                  | Contents                          |
| ----------------------------------------------------- | --------------------------------- |
| [conventions.md](../.cursor/reference/conventions.md) | Code style, naming, git workflow  |
| [security.md](../.cursor/reference/security.md)       | Validation, security requirements |

### Frameworks (`frameworks/`)

| File                                         | Contents                             |
| -------------------------------------------- | ------------------------------------ |
| [nestjs.md](../.cursor/frameworks/nestjs.md) | DTOs, controllers, services, Swagger |
| [nextjs.md](../.cursor/frameworks/nextjs.md) | RSC patterns, App Router             |

### Roadmap (`roadmap/`)

| File                                      | Contents                         |
| ----------------------------------------- | -------------------------------- |
| [README.md](../.cursor/roadmap/README.md) | Project milestones, future plans |

---

## By Task Type

### Creating a New Feature

1. Check ADRs: [decisions/](../.cursor/decisions/) - Don't re-litigate old decisions
2. Read: [system-overview.md](../.cursor/architecture/system-overview.md) - Understand data flow
3. Read: [nestjs.md](../.cursor/frameworks/nestjs.md) - DTO patterns, Swagger
4. Reference: [conventions.md](../.cursor/reference/conventions.md) - Naming, code style

### Adding API Endpoints

1. Read: [nestjs.md](../.cursor/frameworks/nestjs.md) - Controller patterns
2. Check: [rules.yaml](./rules.yaml) - Checklist auto-injects
3. Reference: [security.md](../.cursor/reference/security.md) - Validation requirements

### Adding Frontend Pages

1. Read: [nextjs.md](../.cursor/frameworks/nextjs.md) - RSC patterns
2. Check: [rules.yaml](./rules.yaml) - Checklist auto-injects
3. Reference: [conventions.md](../.cursor/reference/conventions.md) - Naming conventions

### Adding a Shared Package

1. Read: [system-overview.md](../.cursor/architecture/system-overview.md#adding-shared-packages) - When & how
2. Create `packages/[name]/` with package.json, tsconfig.json
3. Update root `package.json` workspaces if needed
4. Add path aliases to consuming apps

### Adding an External Service

1. Read: [system-overview.md](../.cursor/architecture/system-overview.md#adding-external-services) - When & how
2. Create `services/[name]/` with Dockerfile
3. Add to `docker-compose.yml`
4. Create NestJS client service

---

## Quick Search

| Keyword           | Go To                                                                                  |
| ----------------- | -------------------------------------------------------------------------------------- |
| DTO, validation   | [nestjs.md](../.cursor/frameworks/nestjs.md)                                           |
| Swagger, API      | [nestjs.md](../.cursor/frameworks/nestjs.md)                                           |
| Server Components | [nextjs.md](../.cursor/frameworks/nextjs.md)                                           |
| security, input   | [security.md](../.cursor/reference/security.md)                                        |
| git, commit       | [conventions.md](../.cursor/reference/conventions.md)                                  |
| package, shared   | [system-overview.md](../.cursor/architecture/system-overview.md#adding-shared-packages)   |
| service, Python   | [system-overview.md](../.cursor/architecture/system-overview.md#adding-external-services) |
| Rust, microservice | [system-overview.md](../.cursor/architecture/system-overview.md#adding-external-services) |

---

## Auto-Injection

**File:** [rules.yaml](./rules.yaml)

Checklists auto-inject based on file patterns:

| Pattern              | Checklist                     |
| -------------------- | ----------------------------- |
| `**/*.controller.ts` | DTOs, Swagger, validation     |
| `**/*.service.ts`    | logging, error handling       |
| `apps/web/**/*.tsx`  | Server Components, TypeScript |

---

## Maintenance

When updating documentation:

1. Update "Last Updated" date in file header
2. Single source of truth: Update ONE file per topic
3. Cross-reference: Link to other files, don't duplicate
4. Priority order: decisions/ > architecture/ > reference/ > frameworks/ > roadmap/

---

**Last Updated:** January 2026
