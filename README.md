# NestJS + Next.js Starter

Full-stack monorepo template with NestJS backend and Next.js frontend.

## Features

- **NestJS 11** - Enterprise-grade TypeScript backend with Swagger docs
- **Next.js 14** - React Server Components with App Router
- **Yarn 4 Workspaces** - Monorepo package management
- **Docker** - Redis for caching/queues
- **TypeScript** - Full type safety across the stack
- **ESLint + Prettier** - Consistent code style
- **Tailwind CSS** - Utility-first styling

## Quick Start

### Prerequisites

- Node.js 20+
- Yarn 4
- Docker (for Redis)

### Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd nestjs-nextjs-starter

# Install dependencies
yarn install

# Copy environment template
cp .env.template .env

# Start infrastructure (Redis)
yarn docker:up

# Start development servers
yarn dev
```

### URLs

- **API:** http://localhost:3000/api
- **API Docs:** http://localhost:3000/api/docs
- **Web:** http://localhost:3001

## Project Structure

```
.
├── apps/
│   ├── api/          # NestJS backend (port 3000)
│   └── web/          # Next.js frontend (port 3001)
├── .cursor/          # AI assistant documentation
├── .context/         # Auto-injection rules
├── scripts/          # Development scripts
└── docker-compose.yml
```

## Commands

| Command            | Description                   |
| ------------------ | ----------------------------- |
| `yarn dev`         | Start all apps in development |
| `yarn dev:api`     | Start API only                |
| `yarn dev:web`     | Start web only                |
| `yarn build`       | Build all workspaces          |
| `yarn lint`        | Run ESLint                    |
| `yarn type-check`  | Run TypeScript checks         |
| `yarn docker:up`   | Start Docker services         |
| `yarn docker:down` | Stop Docker services          |

## Adding a Database

This template doesn't include a database by default. To add one:

1. Choose your database (PostgreSQL, MySQL, SQLite, etc.)
2. Install an ORM (Drizzle, Prisma, TypeORM)
3. Add connection setup to `apps/api`
4. Update `docker-compose.yml` if needed

## Documentation

- [CLAUDE.md](./CLAUDE.md) - AI assistant guide
- [.cursor/README.md](./.cursor/README.md) - Documentation constitution
- [.context/INDEX.md](./.context/INDEX.md) - Full documentation index

## License

MIT
