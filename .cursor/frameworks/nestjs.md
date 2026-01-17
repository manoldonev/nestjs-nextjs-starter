# NestJS Best Practices

**Status:** CORNERSTONE REFERENCE - Non-negotiable standards for all NestJS code
**Last Updated:** January 2026

---

## Critical Rules (NEVER Skip These)

### Rule #1: ALWAYS Use DTOs

**WRONG - Raw parameters:**

```typescript
@Get(':id')
async getUser(@Param('id') id: string) {
  // No validation, no type safety, security risk
}
```

**CORRECT - DTO with validation:**

```typescript
// dto/get-user.dto.ts
export class GetUserParamsDto {
  @ApiProperty({ description: 'User ID', example: 'uuid' })
  @IsUUID(4, { message: 'User ID must be valid UUID' })
  id: string;
}

// controller
@Get(':id')
async getUser(@Param() params: GetUserParamsDto) {
  // Automatically validated, type-safe
}
```

**Why DTOs are mandatory:**

- Runtime validation - Invalid inputs rejected before reaching business logic
- Type safety - TypeScript enforces correct types
- API documentation - Swagger auto-generates from decorators
- Security - Prevents parameter pollution, type coercion bugs
- Maintainability - Centralized validation rules

---

### Rule #2: ALWAYS Add Swagger Decorators

**WRONG - No documentation:**

```typescript
@Controller('users')
export class UsersController {
  @Get(':id')
  async getUser(@Param() params: GetUserParamsDto) {
    // No API docs, users have to guess
  }
}
```

**CORRECT - Full documentation:**

```typescript
@ApiTags('users')
@Controller('users')
export class UsersController {
  @Get(':id')
  @ApiOperation({
    summary: 'Get user by ID',
    description: 'Retrieve a single user by their UUID',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns user details',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid user ID format',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async getUser(@Param() params: GetUserParamsDto) {
    return this.usersService.getUser(params.id);
  }
}
```

**Required decorators:**

- `@ApiTags()` - Group endpoints in Swagger UI
- `@ApiOperation()` - Endpoint description
- `@ApiResponse()` - Document ALL status codes (200, 400, 404, 500)
- `@ApiProperty()` - Document DTO fields

---

### Rule #3: ALWAYS Validate ALL Inputs

**Common validations:**

```typescript
// UUIDs
@IsUUID(4, { message: 'Must be valid UUID' })
id: string;

// Integers with range
@Type(() => Number)
@IsInt()
@Min(1)
@Max(100)
limit: number = 10;

// Optional fields
@IsOptional()
@IsString()
name?: string;

// Enums
@IsIn(['active', 'inactive', 'pending'])
status: string;

// Arrays
@IsArray()
@ArrayMinSize(1)
@IsUUID(4, { each: true })
ids: string[];
```

---

## Service Patterns

### Logging

Always add logging to services:

```typescript
@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  async createUser(dto: CreateUserDto) {
    this.logger.log(`Creating user: ${dto.email}`);

    try {
      const user = await this.create(dto);
      this.logger.log(`User created: ${user.id}`);
      return user;
    } catch (error) {
      this.logger.error(`Failed to create user: ${dto.email}`, error.stack);
      throw error;
    }
  }
}
```

### Error Handling

Use typed exceptions:

```typescript
import {
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';

// Not found
throw new NotFoundException('User not found');

// Validation error
throw new BadRequestException('Invalid input');

// Conflict (e.g., duplicate)
throw new ConflictException('Email already exists');
```

---

## Module Structure

Standard module organization:

```
users/
├── users.module.ts
├── users.controller.ts
├── users.service.ts
└── dto/
    ├── create-user.dto.ts
    ├── update-user.dto.ts
    └── get-user.dto.ts
```

Module registration:

```typescript
@Module({
  imports: [], // Other modules
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // If needed by other modules
})
export class UsersModule {}
```

---

## Configuration

Use the config module pattern:

```typescript
// config/app.config.loader.ts
export const appConfigLoader = registerAs('app', () => ({
  get port() {
    return getEnvVar('PORT', 3000);
  },
  get nodeEnv() {
    return getEnvVar('NODE_ENV', 'development');
  },
}));

// Usage in service
@Injectable()
export class SomeService {
  constructor(
    @Inject(AppConfigServiceKey)
    private readonly config: AppConfigService
  ) {}
}
```

---

**Last Updated:** January 2026
