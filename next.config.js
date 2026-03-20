/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  staticPageGenerationTimeout: 180,
  images: {
    unoptimized: true, // static site — explicitly disables /_next/image endpoint
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },
          // CSP intentionally omitted here — handled per-request by middleware.ts
          // via nonce-based policy with dev/prod split.
        ],
      },
    ]
  },
}

module.exports = nextConfig
