# Integration Implementation Checklist

**Status:** CRITICAL REFERENCE - Required checklist for implementing integrations with external systems

**Last Updated:** January 2026

---

## Purpose

This document defines mandatory checks when implementing integrations with external systems (databases, APIs, caches, etc.) to prevent runtime failures that TypeScript cannot catch.

**Core Principle:** Code that compiles ≠ Code that works at runtime

---

## Critical Rule: Never Implement Partial Integrations

When implementing ANY integration with an external system, you MUST complete ALL of these steps:

### 1. Understand the Wire Format

**Before writing any code, document:**
- How is data ACTUALLY stored/transmitted?
- What format does the external system expect?
- What format does the external system return?
- Are there type coercions or conversions required?

**Example - Database Custom Type:**
```typescript
// ❌ WRONG - Assuming JavaScript types work directly
const customType = customType<{ data: number[] }>({
  dataType() {
    return 'custom_type';
  },
  // Missing: How does number[] convert to the wire format?
});

// ✅ CORRECT - Documented wire format
// Wire format: '[0.1,0.2,0.3,...]' as a STRING
const customType = customType<{ data: number[]; driverData: string }>({
  dataType() {
    return 'custom_type';
  },
  toDriver(value: number[]): string {
    // Application → Database: number[] → '[0.1,0.2,0.3,...]'
    return `[${value.join(',')}]`;
  },
  fromDriver(value: string): number[] {
    // Database → Application: '[0.1,0.2,0.3,...]' → number[]
    const cleaned = value.replace(/[[\]]/g, '');
    return cleaned.split(',').map(Number.parseFloat);
  },
});
```

---

### 2. Implement Bidirectional Conversion

**For ANY custom type/serialization, implement BOTH directions:**

| System Type | Conversion Required | Missing = Runtime Failure |
|-------------|---------------------|---------------------------|
| Drizzle `customType` | `toDriver()` + `fromDriver()` | Will fail at INSERT/SELECT |
| TypeORM `@ValueTransformer` | `to()` + `from()` | Will fail at save/load |
| Redis serialization | `serialize()` + `deserialize()` | Will fail at set/get |
| API DTOs | `toDTO()` + `fromDTO()` | Will fail at request/response |

**Never assume one direction is enough!**

---

### 3. Think Through Runtime Behavior

**Before marking implementation complete, answer:**

- What SQL/query will be generated?
- What data will be written to the external system?
- What data will be read back?
- What happens if a field is null/undefined?
- What happens if the format is invalid?
- Are there type coercions that could silently fail?

---

### 4. Validate External System Requirements

**For each external system, verify:**

| System | Validation Required |
|--------|---------------------|
| PostgreSQL Extensions | Are required extensions installed? |
| Redis | Is connection config correct? (host, port, prefix, timeout) |
| S3/Storage | Are credentials valid? Is bucket accessible? |
| APIs | Is API key valid? Are rate limits understood? |
| Message Queues | Are queue names correct? Is serialization compatible? |

---

## Integration Categories

### Database Custom Types (Drizzle, TypeORM, Prisma)

**Mandatory Implementation:**
```typescript
const customType = customType<{
  data: ApplicationType;      // Type in your application
  driverData: DatabaseType;   // Type in the database
}>({
  dataType() {
    return 'database_type_name';
  },
  toDriver(value: ApplicationType): DatabaseType {
    // Application → Database
    // MUST implement
  },
  fromDriver(value: DatabaseType): ApplicationType {
    // Database → Application
    // MUST implement
  },
});
```

**Common Mistake:**
- Only implementing `dataType()` and assuming TypeScript types are enough
- Forgetting that database values are often strings/buffers, not JavaScript types

---

### API Integrations

**Mandatory Implementation:**
```typescript
// 1. Document API format
interface ExternalAPIResponse {
  // Exact format from API documentation
}

// 2. Document application format
interface ApplicationData {
  // Clean application types
}

// 3. Implement both conversions
function toAPI(data: ApplicationData): ExternalAPIRequest {
  // MUST implement
}

function fromAPI(response: ExternalAPIResponse): ApplicationData {
  // MUST implement
}
```

**Common Mistake:**
- Assuming API types match application types
- Not validating API responses
- Not handling API errors/retries

---

### Cache/Redis Integrations

**Mandatory Implementation:**
```typescript
// 1. Define serialization format
type CacheFormat = string; // JSON? MessagePack? Binary?

// 2. Implement serialization
function serialize(value: ApplicationType): CacheFormat {
  // MUST implement
  return JSON.stringify(value);
}

// 3. Implement deserialization
function deserialize(cached: CacheFormat): ApplicationType {
  // MUST implement
  return JSON.parse(cached);
}

// 4. Handle cache misses/errors
function getCached(key: string): ApplicationType | null {
  // MUST handle errors
}
```

**Common Mistake:**
- Forgetting that Redis stores strings/buffers
- Not handling JSON serialization errors
- Not handling cache misses

---

### Message Queue Integrations

**Mandatory Implementation:**
```typescript
// 1. Define message format
interface QueueMessage {
  // Exact format that will be serialized
}

// 2. Implement serialization (producer)
function createMessage(data: ApplicationData): QueueMessage {
  // MUST implement
}

// 3. Implement deserialization (consumer)
function parseMessage(message: QueueMessage): ApplicationData {
  // MUST implement
  // MUST validate
}

// 4. Handle serialization failures
```

**Common Mistake:**
- Assuming queue messages can contain any JavaScript type
- Not validating messages in consumers
- Not handling schema changes

---

## Checklist Template

**Use this checklist for EVERY external system integration:**

### Pre-Implementation
- [ ] Read official documentation for wire format
- [ ] Identify the boundary (Application ↔ External System)
- [ ] Document expected input/output formats
- [ ] Plan serialization/deserialization strategy

### Implementation
- [ ] Implement Application → External System conversion
- [ ] Implement External System → Application conversion
- [ ] Add validation for both directions
- [ ] Add error handling for conversion failures
- [ ] Document format in code comments

### Verification
- [ ] Think through what actual data/SQL/API calls will be generated
- [ ] Verify type casting is correct (especially for databases)
- [ ] Test with actual external system (not just TypeScript compilation)

---

## Common Pitfalls Across All Integrations

### Pitfall #1: Assuming TypeScript Types = Runtime Format

```typescript
// ❌ WRONG - TypeScript says it's a number[], runtime might fail
const data: number[] = [0.1, 0.2, 0.3];
// What format does the external system actually need?

// ✅ CORRECT - Explicit conversion to wire format
const data: number[] = [0.1, 0.2, 0.3];
const wireFormat: string = JSON.stringify(data);
```

### Pitfall #2: Partial Implementation

```typescript
// ❌ WRONG - Only implemented write, not read
const customType = customType({
  dataType() { return 'my_type'; },
  toDriver(value) { return serialize(value); },
  // Missing fromDriver! Reads will fail!
});

// ✅ CORRECT - Complete bidirectional implementation
const customType = customType({
  dataType() { return 'my_type'; },
  toDriver(value) { return serialize(value); },
  fromDriver(value) { return deserialize(value); },
});
```

### Pitfall #3: No Error Handling

```typescript
// ❌ WRONG - No validation, silent failures
function fromDriver(value: string): number[] {
  return value.split(',').map(Number.parseFloat);
}

// ✅ CORRECT - Validate and handle errors
function fromDriver(value: string): number[] {
  if (!value || typeof value !== 'string') {
    throw new Error('Invalid format: expected string');
  }
  const numbers = value.split(',').map(Number.parseFloat);
  if (numbers.some(isNaN)) {
    throw new Error('Invalid format: contains non-numeric values');
  }
  return numbers;
}
```

---

## Quick Reference: When You Need This Checklist

Use this checklist when implementing:

- Database custom types (Drizzle, TypeORM, Prisma)
- Database extensions (PostGIS, timescaledb, etc.)
- External APIs (OpenAI, Stripe, Twilio)
- Cache layers (Redis, Memcached)
- Message queues (BullMQ, RabbitMQ, SQS)
- File storage (S3, GCS, local filesystem)
- Search engines (Elasticsearch, Algolia)
- Any system where data crosses a boundary

**Remember:** If data leaves your TypeScript runtime, you need this checklist!

---

**Last Updated:** January 2026
