# Documentation Map

> Links to `.cursor/` by execution role. No content duplication.

---

## BINDING (Check First)

Decisions that override all other guidance.

| Doc                                                           | Constraint                      |
| ------------------------------------------------------------- | ------------------------------- |
| [ADR-001](../.cursor/decisions/ADR-001-tech-stack.md)         | NestJS + Next.js + Yarn 4      |

---

## ARCHITECTURE (Understand Before Acting)

System design truth.

| Doc                                                              | Covers                                    |
| ---------------------------------------------------------------- | ----------------------------------------- |
| [system-overview.md](../.cursor/architecture/system-overview.md) | Tech stack, data flow, service boundaries |

---

## REFERENCE (Standards While Implementing)

Non-negotiable rules.

| Doc                                                     | Enforces                                |
| ------------------------------------------------------- | --------------------------------------- |
| [conventions.md](../.cursor/reference/conventions.md)   | Naming, imports, git workflow            |
| [security.md](../.cursor/reference/security.md)         | Validation, injection prevention        |

---

## FRAMEWORKS (Tool-Specific Guidance)

How to use each technology.

| Doc                                          | For                                  |
| -------------------------------------------- | ------------------------------------ |
| [nestjs.md](../.cursor/frameworks/nestjs.md) | DTOs, controllers, services, Swagger |
| [nextjs.md](../.cursor/frameworks/nextjs.md) | RSC, App Router patterns             |

---

## CONTEXT (Strategic Direction)

Current and planned work.

| Doc                                           | Scope                           |
| --------------------------------------------- | ------------------------------- |
| [README.md](../.cursor/roadmap/README.md)     | Project phases, success metrics |

---

## WORKFLOWS (Procedures)

| Doc                                                                       | When                            |
| ------------------------------------------------------------------------- | ------------------------------- |
| [integration-checklist.md](../.cursor/workflows/integration-checklist.md) | Any external system integration |

---

## NAVIGATION

| Need                  | Go To                                         |
| --------------------- | --------------------------------------------- |
| Full task-based index | [.context/INDEX.md](../.context/INDEX.md)     |
| Auto-inject rules     | [.context/rules.yaml](../.context/rules.yaml) |
| AI entry point        | [CLAUDE.md](../CLAUDE.md)                     |
| Priority order        | [.cursor/README.md](../.cursor/README.md)     |
