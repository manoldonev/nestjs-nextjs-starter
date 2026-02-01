# Claude Control Plane

> Execution lens for active work. NOT a knowledge base.

---

## Authority Model

```
HIGHEST  .cursor/decisions/     ← Binding constraints (ADRs)
   ↓     .cursor/architecture/  ← System truths
   ↓     .cursor/reference/     ← Standards
   ↓     .cursor/frameworks/    ← Tool guidance
   ↓     .cursor/roadmap/       ← Strategic context
   ↓     .ai/state.md           ← Current focus
LOWEST   Chat context           ← Ephemeral
```

**Entry points:**

- `CLAUDE.md` defines how AI should start
- `.cursor/README.md` defines documentation hierarchy

If they conflict, `.cursor/README.md` defines authority order.

---

## Operating Rules

### 1. `.cursor/` is Authoritative

- NEVER contradict `.cursor/` documentation
- NEVER duplicate content from `.cursor/` into `.ai/`
- ALWAYS link to `.cursor/` files, never copy
- If a `.cursor/` doc covers a topic, defer to it

### 2. `.ai/` is Ephemeral

- `.ai/state.md` reflects CURRENT work only
- `.ai/next.md` holds immediate next actions
- `.ai/scratch.md` is disposable working memory
- Delete or reset `.ai/` files when focus changes

**If `.ai/state.md` and `.cursor/roadmap/` disagree, the roadmap wins.**

### 3. Conflict Resolution

When sources disagree:

1. **ADRs win** - Check `decisions/` first
2. **Ask, don't guess** - Surface conflicts to user
3. **Code is truth** - If code contradicts docs, code wins (unless ADR says otherwise)
4. **Recent > Stale** - Check git history if docs seem outdated

### 4. Before Any Implementation

1. Check `.ai/state.md` - Am I aligned with current focus?
2. Check `.ai/map.md` - What docs are relevant?
3. Read the relevant `.cursor/` files
4. Only then proceed

---

## File Purposes

| File             | Purpose                                   | Lifespan                 |
| ---------------- | ----------------------------------------- | ------------------------ |
| `map.md`         | Index of `.cursor/` by execution role     | Semi-permanent           |
| `state.md`       | Current technical focus                   | Changes per milestone    |
| `next.md`        | Immediate next actions                    | Changes frequently       |
| `assumptions.md` | Explicit assumptions requiring validation | Cleared after validation |
| `scratch.md`     | Disposable working memory                 | Cleared per task         |

---

## What NOT to Do

- Do not summarize ADRs - link to them
- Do not restate architecture - link to it
- Do not invent decisions - surface ambiguity
- Do not trust chat over docs
- Do not proceed when confused
