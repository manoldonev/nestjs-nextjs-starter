export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Welcome
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-400 mb-2">
            Full-stack starter with NestJS + Next.js
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">NestJS Backend</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Powerful Node.js framework with TypeScript support, dependency
              injection, and modular architecture.
            </p>
          </div>

          <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg bg-primary/5">
            <h2 className="text-xl font-semibold mb-3">Next.js Frontend</h2>
            <p className="text-gray-600 dark:text-gray-400">
              React framework with server-side rendering, file-based routing,
              and optimized performance.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <a
            href="/api/docs"
            className="inline-block px-8 py-4 bg-primary text-white rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors"
          >
            View API Docs
          </a>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            API running at{' '}
            <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
              http://localhost:3000/api
            </code>
          </p>
        </div>
      </div>
    </main>
  );
}
