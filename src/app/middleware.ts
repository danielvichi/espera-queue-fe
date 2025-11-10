/*
 *
 * More about Next.js Content Security Policy (CSP)
 * https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy
 *
 * More about directives
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy
 *
 */

import { type NextRequest, NextResponse } from "next/server";
import { generateCSP } from "./configs/csp";

export function middleware(request: NextRequest): NextResponse {
  const requestHeaders = new Headers(request.headers);

  const { csp, nonce } = generateCSP();

  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  response.headers.set("Content-Security-Policy", csp);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
