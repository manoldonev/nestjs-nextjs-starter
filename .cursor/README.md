# Authoritative AI Context

This directory contains authoritative project context for AI assistants.

## Priority Order

When answering questions or making changes, consult documents in this priority:

1. **`decisions/`** - ADRs (Architecture Decision Records)
   - **Binding constraints** - decisions already made, do NOT re-litigate
   - If changing a decision, create a new ADR that supersedes the old one

2. **`architecture/`** - System-level truths
   - How the system works, data flow, service boundaries
   - Source of truth for design questions

3. **`reference/`** - Facts, definitions, invariants
   - Code conventions, security requirements
   - Single source of truth for "how we do things"

4. **`frameworks/`** - How to use specific tools
   - NestJS, Next.js patterns
   - Consult before implementing with these tools

5. **`roadmap/`** - Strategic plans and milestones
   - Current work priorities, future features
   - Check before starting new work

## Resolution Rules

- **Code vs Docs conflict**: Code wins (unless an ADR states otherwise)
- **Multiple docs conflict**: Higher priority folder wins
- **Unclear requirements**: Ask user for clarification
- **Missing documentation**: Create it immediately after implementation
- **No silent assumptions**: If behavior is not documented or inferable from code, ask.

## When the AI Is Unsure

If information is missing, contradictory, or cannot be confidently inferred from code or higher-priority documentation, the AI must stop and ask for clarification rather than guessing or proceeding. The AI should explicitly state what is unclear, reference the documents it checked, and propose specific clarification questions or documentation updates. The AI must not invent requirements, behaviors, or architecture.

## File Naming

- ADRs: `ADR-NNN-short-name.md` (e.g., `ADR-001-tech-stack.md`)
- Other files: `kebab-case.md` (e.g., `system-overview.md`)

## Cross-References

Each file should have a header with:

```markdown
# Title

**Source of Truth for:** [topic]
**Last Updated:** YYYY-MM-DD
**Related:** [link1], [link2]

> If updating [topic], update HERE ONLY.
```

---

**Last Updated:** January 2026
