# Code & Git Conventions

**Source of Truth for:** Code style, naming conventions, git workflow
**Last Updated:** January 2026
**Related:** [nestjs.md](../frameworks/nestjs.md), [nextjs.md](../frameworks/nextjs.md)

> If updating code conventions, update HERE ONLY.

---

## File Naming

### Backend (NestJS)

| Type        | Pattern              | Example                  |
| ----------- | -------------------- | ------------------------ |
| Controllers | `*.controller.ts`    | `users.controller.ts`    |
| Services    | `*.service.ts`       | `users.service.ts`       |
| Modules     | `*.module.ts`        | `users.module.ts`        |
| DTOs        | `*.dto.ts` in `dto/` | `dto/create-user.dto.ts` |

### Frontend (Next.js)

| Type              | Pattern          | Example                   |
| ----------------- | ---------------- | ------------------------- |
| Pages             | `page.tsx`       | `app/users/[id]/page.tsx` |
| Layouts           | `layout.tsx`     | `app/layout.tsx`          |
| Components        | `kebab-case.tsx` | `user-card.tsx`           |
| Server Components | Default          | No special suffix         |
| Client Components | `'use client'`   | Start with directive      |

---

## Naming Conventions

### Variables & Functions

- **camelCase**: `userId`, `parseData()`, `getUsers()`
- **Boolean prefix**: `is`, `has`, `should` (e.g., `isActive`, `hasPermission`)
- **Arrays**: Plural nouns (e.g., `users`, `items`)

### Classes & Interfaces

- **PascalCase**: `UsersController`, `AuthService`
- **DTOs**: Suffix with `Dto` (e.g., `CreateUserDto`)
- **Interfaces**: No `I` prefix (e.g., `User`, not `IUser`)

### Constants

- **UPPER_SNAKE_CASE**: True constants (e.g., `MAX_FILE_SIZE`, `DEFAULT_LIMIT`)
- **camelCase**: Configuration objects (e.g., `corsOptions`)

### Database (when added)

- **Tables**: Plural snake_case (e.g., `users`, `user_profiles`)
- **Columns**: snake_case (e.g., `user_id`, `created_at`)
- **Primary keys**: Always `id` (UUID preferred)
- **Foreign keys**: `{table}_id` (e.g., `user_id`)

---

## Import Ordering

Always order imports in this sequence:

```typescript
// 1. Node.js built-ins
import { readFile } from 'fs/promises';

// 2. External dependencies (alphabetical)
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// 3. Relative imports (closest to farthest)
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
```

---

## TypeScript Conventions

### Type Annotations

- **Always** annotate function return types (explicit is better than implicit)
- **Avoid** `any` - use `unknown` if truly unknown
- **Use** `type` for object shapes, `interface` for extensible contracts

### Error Handling

```typescript
// Use typed exceptions in NestJS
throw new NotFoundException('User not found');
throw new BadRequestException('Invalid input');

// Wrap external calls in try-catch
try {
  const result = await externalApi.call();
} catch (error) {
  this.logger.error('API call failed', error);
  throw new InternalServerErrorException('External service unavailable');
}
```

---

## Git Conventions

### Branch Naming

- `feature/short-description` - New features
- `fix/short-description` - Bug fixes
- `refactor/short-description` - Code refactoring
- `docs/short-description` - Documentation

### Commit Messages

Use conventional commits:

```
type(scope): description

feat(api): add user authentication endpoint
fix(web): resolve hydration mismatch in header
refactor(api): extract validation logic to service
docs: update README with setup instructions
```

Types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`

---

## Pre-Commit Checklist

Before committing:

- [ ] `yarn lint` passes
- [ ] `yarn type-check` passes
- [ ] `yarn build` passes
- [ ] DTOs have validation decorators
- [ ] Controllers have Swagger decorators
- [ ] New features have appropriate logging

---

**Last Updated:** January 2026
