# System Overview

**Source of Truth for:** System architecture, data flow, service boundaries
**Last Updated:** January 2026
**Related:** [ADR-001](../decisions/ADR-001-tech-stack.md)

> If updating system architecture, update HERE ONLY.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Client                              │
│                    (Browser/Mobile)                         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Next.js Frontend                         │
│                      (Port 3001)                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Server       │  │ Client       │  │ API Routes   │      │
│  │ Components   │  │ Components   │  │ (Proxy)      │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    NestJS Backend                           │
│                      (Port 3000)                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Controllers  │  │ Services     │  │ Config       │      │
│  │ (HTTP)       │  │ (Business)   │  │ (Env)        │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     Infrastructure                          │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │ Redis        │  │ Database     │                        │
│  │ (Optional)   │  │ (Add later)  │                        │
│  └──────────────┘  └──────────────┘                        │
└─────────────────────────────────────────────────────────────┘
```

---

## Monorepo Structure

```
nestjs-nextjs-starter/
├── apps/
│   ├── api/                 # NestJS backend
│   │   └── src/
│   │       ├── config/      # Configuration module
│   │       ├── main.ts      # Bootstrap
│   │       ├── app.module.ts
│   │       ├── app.controller.ts
│   │       └── app.service.ts
│   │
│   └── web/                 # Next.js frontend
│       └── src/
│           └── app/         # App Router pages
│
├── packages/                # Shared libraries (create when needed - see below)
│
├── services/                # External microservices (create when needed - see below)
│
├── .cursor/                 # AI documentation
├── .context/                # Auto-injection rules
├── scripts/                 # Development scripts
├── docker-compose.yml       # Local infrastructure
└── package.json            # Root workspace config
```

---

## Data Flow

### Request Flow

1. Client makes request to Next.js (port 3001)
2. Next.js either:
   - Renders Server Component (direct data fetch)
   - Proxies API request to NestJS (port 3000)
3. NestJS processes request through:
   - Controller (HTTP handling, validation)
   - Service (business logic)
   - External services (database, cache, etc.)
4. Response flows back through the stack

### API Design

- **Base URL:** `/api`
- **Documentation:** `/api/docs` (Swagger)
- **Health Check:** `/api/health`

---

## Key Design Decisions

1. **Separation of Concerns**: NestJS handles API, Next.js handles UI
2. **Type Safety**: Full TypeScript across the stack
3. **API-First**: Backend designed as standalone API
4. **Proxy Pattern**: Next.js rewrites `/api/*` to NestJS

---

## Adding Shared Packages

When you need to share code between apps, create packages in `packages/`.

### When to Create a Package

| Scenario | Create Package? |
|----------|----------------|
| Types shared between API and Web | Yes - `packages/core` |
| Database schema and queries | Yes - `packages/db` |
| Shared React components | Yes - `packages/ui` |
| Code only used in one app | No - keep in app |
| Third-party wrapper used once | No - keep in app |

### Creating a New Package

1. Create directory structure:
```bash
mkdir -p packages/core/src
```

2. Create `packages/core/package.json`:
```json
{
  "name": "@starter/core",
  "version": "0.1.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts",
    "type-check": "tsc --noEmit",
    "lint": "eslint \"src/**/*.ts\" --fix"
  }
}
```

3. Create `packages/core/tsconfig.json`:
```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}
```

4. Update root `package.json` workspaces:
```json
{
  "workspaces": [
    "apps/*",
    "packages/*"
  ]
}
```

5. Add path aliases to consuming apps' `tsconfig.json`:
```json
{
  "paths": {
    "@starter/core": ["../../packages/core/src"]
  }
}
```

6. Import in apps:
```typescript
import { MyType } from '@starter/core';
```

### Common Package Types

| Package | Purpose | Example Contents |
|---------|---------|------------------|
| `core` | Shared types & utilities | Types, Zod schemas, date utils |
| `db` | Database layer | Drizzle schema, queries, migrations |
| `ui` | React components | Buttons, forms, layout components |

---

## Adding External Services

For CPU-intensive tasks, ML models, or non-Node.js code, create services in `services/`.

### When to Create a Service

| Scenario | Create Service? |
|----------|----------------|
| Python ML model (XGBoost, PyTorch) | Yes |
| Rust for performance-critical code | Yes |
| Heavy computation that blocks Node.js | Yes |
| Simple async task | No - use BullMQ |
| Code that can run in Node.js | No - keep in API |

### Service Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    NestJS Backend                           │
│                      (Port 3000)                            │
│  ┌──────────────┐                                          │
│  │ Service      │─────► HTTP/gRPC ─────┐                   │
│  │ Client       │                      │                   │
│  └──────────────┘                      ▼                   │
└────────────────────────────────────────│───────────────────┘
                                         │
                    ┌────────────────────┴────────────────────┐
                    │                                         │
          ┌─────────▼─────────┐                 ┌─────────────▼─────────┐
          │   Python Service  │                 │    Rust Service       │
          │    (Port 8001)    │                 │     (Port 8002)       │
          │  ┌─────────────┐  │                 │  ┌─────────────────┐  │
          │  │ FastAPI     │  │                 │  │ Axum/Actix      │  │
          │  │ XGBoost     │  │                 │  │ Performance     │  │
          │  │ NumPy       │  │                 │  │ Critical        │  │
          │  └─────────────┘  │                 │  └─────────────────┘  │
          └───────────────────┘                 └───────────────────────┘
```

### Creating a Python Service

1. Create directory structure:
```bash
mkdir -p services/ml-service
```

2. Create `services/ml-service/main.py`:
```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class PredictRequest(BaseModel):
    features: list[float]

@app.get("/")
def health():
    return {"status": "ok"}

@app.post("/predict")
def predict(request: PredictRequest):
    # Your ML logic here
    return {"prediction": 0.5}
```

3. Create `services/ml-service/Dockerfile`:
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001"]
```

4. Add to `docker-compose.yml`:
```yaml
services:
  ml-service:
    build: ./services/ml-service
    ports:
      - '8001:8001'
    healthcheck:
      test: ['CMD', 'curl', '-f', 'http://localhost:8001/']
```

5. Call from NestJS:
```typescript
@Injectable()
export class MlService {
  private readonly baseUrl = process.env.ML_SERVICE_URL || 'http://localhost:8001';

  async predict(features: number[]): Promise<number> {
    const response = await fetch(`${this.baseUrl}/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ features }),
    });
    const data = await response.json();
    return data.prediction;
  }
}
```

### Creating a Rust Service

1. Create with Cargo:
```bash
cd services
cargo new rust-service
```

2. Use Axum or Actix-web for HTTP
3. Containerize with multi-stage Dockerfile
4. Follow same docker-compose pattern

### Service Best Practices

- **Health checks**: Every service exposes `GET /` for health
- **Structured logging**: JSON logs for aggregation
- **Graceful shutdown**: Handle SIGTERM properly
- **Timeouts**: Set client-side timeouts in NestJS
- **Retries**: Implement retry logic for transient failures
- **Circuit breaker**: Consider for critical paths

---

**Last Updated:** January 2026
