import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // SECURITY NOTE: This middleware performs header injection only (CSP nonce + x-nonce).
  // It contains NO authentication or authorization logic.
  // Do not add auth checks here — see CVE-2025-29927 for why auth middleware
  // requires careful review before any Next.js upgrade.

  // Generate a cryptographically unique nonce per request.
  // Used to scope script-src in the CSP without 'unsafe-inline'.
  const nonce = Buffer.from(crypto.getRandomValues(new Uint8Array(16))).toString('base64')

  const isDev = process.env.NODE_ENV === 'development'

  const csp = isDev
    ? // Development: permissive — allows Framer Motion's Function() constructor
      // (easing compiler) and Next.js HMR WebSocket
      [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: blob:",
        "font-src 'self'",
        `connect-src 'self' ws://localhost:${process.env.PORT ?? 3000} wss://localhost:${process.env.PORT ?? 3000}`,
        "frame-ancestors 'none'",
        "base-uri 'self'",
        "object-src 'none'",
      ].join('; ')
    : // Production: strict nonce-based — no 'unsafe-eval', no 'unsafe-inline' for scripts.
      // 'strict-dynamic' propagates trust to dynamically loaded chunks.
      // Framer Motion in production uses pre-compiled easing — no Function() calls.
      [
        "default-src 'self'",
        `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self'",
        "font-src 'self'",
        "connect-src 'self'",
        "frame-ancestors 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "object-src 'none'",
        "upgrade-insecure-requests",
      ].join('; ')

  // Forward the nonce to the layout via a request header so it can be
  // injected into any <Script> nonce props without client-side exposure.
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  })

  response.headers.set('Content-Security-Policy', csp)

  return response
}

export const config = {
  // Skip static assets — they don't execute scripts and don't need a CSP nonce.
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
