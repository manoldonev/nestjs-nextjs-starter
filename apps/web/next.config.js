/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  },
  // Disable Next.js built-in ESLint during builds since we're using ESLint v9 flat config
  // Next.js 14's built-in lint doesn't support ESLint v9, so we handle linting separately
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination:
          process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
