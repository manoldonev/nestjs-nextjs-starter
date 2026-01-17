# Next.js Best Practices

**Status:** CORNERSTONE REFERENCE - Standards for all Next.js code
**Last Updated:** January 2026

---

## Critical Rules

### Rule #1: Default to Server Components

**WRONG - Unnecessary client component:**
```typescript
'use client'; // Don't add this unless needed!

export default function UserList() {
  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}
```

**CORRECT - Server Component (default):**
```typescript
// No 'use client' directive - this is a Server Component
export default async function UserList() {
  const users = await fetchUsers(); // Direct data fetching

  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}
```

**When to use 'use client':**
- `onClick`, `onChange` handlers
- `useState`, `useEffect`, `useRef`
- Browser-only APIs
- Third-party libs that need client context

---

### Rule #2: TypeScript for Everything

**WRONG - No types:**
```typescript
export default function UserCard({ user }) {
  return <div>{user.name}</div>;
}
```

**CORRECT - Full type safety:**
```typescript
interface User {
  id: string;
  name: string;
  email: string;
}

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  return <div>{user.name}</div>;
}
```

---

### Rule #3: Proper Error Handling

Create error boundaries:

```typescript
// app/users/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

Create loading states:

```typescript
// app/users/loading.tsx
export default function Loading() {
  return <div>Loading...</div>;
}
```

---

## Data Fetching

### Server Components (Recommended)

```typescript
// Fetch directly in component
export default async function UsersPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);
  const users = await res.json();

  return <UserList users={users} />;
}
```

### Client Components (When Needed)

```typescript
'use client';

import { useState, useEffect } from 'react';

export default function SearchResults() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (query) {
      fetch(`/api/search?q=${query}`)
        .then(res => res.json())
        .then(setResults);
    }
  }, [query]);

  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <ResultsList results={results} />
    </>
  );
}
```

---

## Layout Patterns

### Root Layout

```typescript
// app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My App',
  description: 'Description here',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### Nested Layouts

```typescript
// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
```

---

## API Routes (Proxy)

Use rewrites to proxy to NestJS:

```javascript
// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/api/:path*',
      },
    ];
  },
};
```

---

## Performance Tips

1. **Use Server Components** - Less client JS
2. **Lazy load** - `dynamic()` for large components
3. **Optimize images** - `next/image`
4. **Prefetch links** - `<Link>` does this automatically

---

**Last Updated:** January 2026
