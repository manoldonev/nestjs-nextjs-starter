# Security Guidelines

**Source of Truth for:** Security requirements, validation, authentication
**Last Updated:** January 2026
**Related:** [nestjs.md](../frameworks/nestjs.md), [conventions.md](./conventions.md)

> If updating security requirements, update HERE ONLY.

---

## Critical Security Principles

### 1. NEVER Trust User Input

Every input from users, API clients, or external systems is potentially malicious. Always validate, sanitize, and verify.

### 2. Defense in Depth

Implement security at multiple layers:
- Input validation (DTOs)
- Database query parameterization
- Output encoding
- Rate limiting
- Authentication & authorization

### 3. Principle of Least Privilege

- Services access only what they need
- Users see only their own data
- Database users have minimal permissions

---

## Input Validation

### DTO Validation (MANDATORY)

**ALWAYS use DTOs with class-validator for ALL inputs:**

```typescript
// CORRECT - Comprehensive validation
export class CreateUserDto {
  @ApiProperty({ description: 'User email', example: 'user@example.com' })
  @IsEmail({}, { message: 'Must be a valid email' })
  email: string;

  @ApiProperty({ description: 'User name', minLength: 2, maxLength: 50 })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;
}

export class GetUserParamsDto {
  @ApiProperty({ description: 'User ID', example: 'uuid-here' })
  @IsUUID(4, { message: 'User ID must be a valid UUID' })
  id: string;
}

// WRONG - No validation (security vulnerability!)
@Get(':id')
async getUser(@Param('id') id: string) {
  // Direct use of unvalidated input = security risk
}
```

### Global ValidationPipe Configuration

**Already configured in main.ts:**

```typescript
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true, // Strip unknown properties
    forbidNonWhitelisted: true, // Reject requests with unknown properties
    transform: true, // Auto-transform to DTO instances
    transformOptions: {
      enableImplicitConversion: true, // Auto-convert types
    },
  }),
);
```

---

## Validation Checklist

**For EVERY controller endpoint:**

- [ ] Create DTO for params (if any)
- [ ] Create DTO for query (if any)
- [ ] Create DTO for body (if any)
- [ ] Add `@IsUUID(4)` for all UUID fields
- [ ] Add `@IsInt()`, `@Min()`, `@Max()` for numeric ranges
- [ ] Add `@IsIn([...])` for enums
- [ ] Add `@IsBoolean()` with `@Type(() => Boolean)` for booleans
- [ ] Add `@IsDateString()` for date inputs
- [ ] Add `@IsOptional()` for optional fields
- [ ] Set default values in DTO class properties

---

## Common Attack Vectors

### SQL Injection (when using database)

Always use parameterized queries via your ORM:

```typescript
// CORRECT - Parameterized query
const user = await db.query.users.findFirst({
  where: eq(users.id, userId),
});

// WRONG - String interpolation
const user = await db.execute(`SELECT * FROM users WHERE id = '${userId}'`);
```

### XSS (Cross-Site Scripting)

- React/Next.js escapes by default
- Never use `dangerouslySetInnerHTML` with user input
- Sanitize any HTML content from external sources

### CORS

Configure CORS appropriately in production:

```typescript
app.enableCors({
  origin: process.env.WEB_URL, // Specific origin, not '*'
  credentials: true,
});
```

---

## Authentication (Future)

When adding authentication:

1. Use established libraries (Auth.js, Passport, Clerk)
2. Hash passwords with bcrypt (cost factor 12+)
3. Use secure, httpOnly cookies for sessions
4. Implement rate limiting on auth endpoints
5. Add CSRF protection for cookie-based auth

---

## Secrets Management

- **Never** commit secrets to git
- Use `.env` files for local development
- Use environment variables in production
- Rotate secrets regularly
- Use different secrets per environment

---

**Last Updated:** January 2026
