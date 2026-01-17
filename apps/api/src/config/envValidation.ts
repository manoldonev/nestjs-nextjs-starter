import { z } from 'zod';

// Environment variable schema with validation
// Customize this schema for your project's requirements
const envSchema = z.object({
  // Application
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  APP_NAME: z.string().default('starter-api'),
  PORT: z.coerce.number().int().positive().default(3000),
  WEB_URL: z.string().url().default('http://localhost:3001'),

  // Add your environment variables here
  // Example:
  // DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  // REDIS_HOST: z.string().min(1, 'REDIS_HOST is required'),
});

// Adapter for NestJS ConfigModule - wraps Zod schema to provide .validate() method
export const validationSchema = {
  validate: (config: Record<string, unknown>) => {
    const result = envSchema.safeParse(config);
    if (result.success) {
      return result.data;
    }
    const errorMessages = result.error.issues.map((issue) => {
      const path = issue.path.length > 0 ? issue.path.join('.') : 'root';
      return `${path}: ${issue.message}`;
    });
    throw new Error(`Validation failed: ${errorMessages.join(', ')}`);
  },
};
