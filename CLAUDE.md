# Project Name - AI Assistant Guide

**Last Updated:** January 2026

> Navigation hub for AI assistants. For detailed documentation, see `.cursor/README.md`.

---

## Project Overview

**[Project Name]** is a full-stack application built with NestJS and Next.js.

**Mission:** [Your mission statement here]

**Tech Stack:** NestJS 11 + Next.js 14 (Redis available via Docker when needed)

---

## Documentation Navigation

> **Full index:** [.context/INDEX.md](.context/INDEX.md) - Comprehensive documentation map with task-based navigation
>
> **Priority order:** decisions/ > architecture/ > reference/ > frameworks/ > roadmap/
>
> **Constitution:** [.cursor/README.md](.cursor/README.md) - Priority rules and documentation standards

### Quick Links (Most Used)

| Need                 | Go To                                                         |
| -------------------- | ------------------------------------------------------------- |
| System design        | [system-overview.md](.cursor/architecture/system-overview.md) |
| Tech stack decisions | [ADR-001](.cursor/decisions/ADR-001-tech-stack.md)            |
| Code conventions     | [conventions.md](.cursor/reference/conventions.md)            |
| NestJS patterns      | [nestjs.md](.cursor/frameworks/nestjs.md)                     |
| Next.js patterns     | [nextjs.md](.cursor/frameworks/nextjs.md)                     |

---

## Critical Thought Process

### External System Integration - STOP and Think

**BEFORE implementing ANY integration with external systems:**

#### 1. Understand the Wire Format FIRST

- How is data ACTUALLY stored/transmitted?
- What type does it expect? (String? Binary? JSON?)
- Is there a conversion between application types and wire format?

#### 2. ALWAYS Implement Bidirectional Conversion

- Application -> External System (`toDriver()`, `serialize()`)
- External System -> Application (`fromDriver()`, `deserialize()`)

**Red Flags:**

- "I'll just implement write logic, reads will work automatically"
- "TypeScript types match the API, no conversion needed"

#### 3. Think Through Generated Code

**BEFORE marking implementation complete:**

- What SQL will be generated?
- What JSON will be sent?
- What happens on read-back?
- Are there type casts needed?

#### 4. Self-Check

- [ ] Read official documentation for wire format?
- [ ] Implemented BOTH conversion directions?
- [ ] Thought through generated SQL/API calls?
- [ ] Added error handling for malformed data?
- [ ] Tested round-trip conversion?

**If ANY answer is NO -> implementation is NOT complete!**

---

## Critical Rules Summary

> Full details in [conventions.md](.cursor/reference/conventions.md)

1. **ALWAYS Use `yarn`** - Never use npm/pnpm. This is a yarn monorepo.
2. **ALWAYS Use DTOs** - class-validator decorators, @ApiProperty for Swagger
3. **ALWAYS Add Swagger Docs** - @ApiTags, @ApiOperation, @ApiResponse
4. **Performance is Non-Negotiable** - Indexes, no N+1, pagination, transactions
5. **ALWAYS Log Operations** - Logger from @nestjs/common, context IDs, stack traces
6. **ALWAYS Run `yarn format`** - After writing/editing ANY files (code, markdown, JSON), run `yarn format` before committing. AI-generated content often has formatting inconsistencies.

---

## Auto-Injection System

**File:** [.context/rules.yaml](.context/rules.yaml)

Checklists auto-inject when working on specific patterns:

| Pattern              | Checklist                     |
| -------------------- | ----------------------------- |
| `**/*.controller.ts` | DTOs, Swagger, validation     |
| `**/*.service.ts`    | logging, error handling       |
| `apps/web/**/*.tsx`  | Server Components, TypeScript |

---

## Common Commands

```bash
# Development
yarn dev              # API (3000) + Web (3001)
yarn build            # Build all workspaces

# Code Quality
yarn lint             # ESLint
yarn type-check       # TypeScript

# Infrastructure
yarn docker:up        # Start Redis
yarn docker:down      # Stop services
```

---

## Environment Variables

**Local defaults:**

```
PORT=3000
REDIS_URL=redis://localhost:6379  # Optional - for caching/queues when added
```

---

## Pre-Commit Checklist

> Full checklist in [conventions.md](.cursor/reference/conventions.md#pre-commit-checklist)

- [ ] DTOs with validation decorators
- [ ] Swagger documentation complete
- [ ] `yarn format` run (Prettier)
- [ ] `yarn lint` + `yarn type-check` + `yarn build` pass
- [ ] Logging for operations and errors

---

## Post-Implementation Workflow

**After completing a comprehensive plan or notable feature, proactively offer:**

### 1. Architecture Review

Suggest reviewing the implementation as a **Senior Principal Engineer/Architect**:

- Evaluate against SOLID principles and clean architecture
- Check for proper separation of concerns
- Identify potential scalability issues
- Review error handling and edge cases
- Assess security implications
- Verify consistency with existing patterns in the codebase

### 2. Documentation Update

Suggest updating the knowledge base as a **Senior Principal Technical Writer**:

- Add new patterns to relevant `.cursor/frameworks/` files
- Document architectural decisions in `.cursor/decisions/` (ADRs)
- Update `.cursor/architecture/system-overview.md` if system design changed
- Add troubleshooting notes for complex implementations
- Update this file (CLAUDE.md) if new critical rules emerged
- Verify consistency between documentation and implementation across the codebase

**Trigger phrases to watch for:**

- "Implementation complete"
- "Feature finished"
- "Plan executed"
- Multi-file changes affecting architecture
- New integrations or external system connections

---

**For detailed implementation guidance, see [.context/INDEX.md](.context/INDEX.md) or the relevant `.cursor/` file.**
