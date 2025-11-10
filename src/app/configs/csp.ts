export type UrlList = string[];

const isDev = process.env.NEXT_PUBLIC_PROJECT_ENV === "development";
const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "";

export const defaultScriptSrcUrlsList: UrlList = [
  apiUrl,
  "https://*.googletagmanager.com",
  "https://*.google-analytics.com",
];

export const defaultFrameSrcList: UrlList = [];

export const defaultConnectSrcUrlsList: UrlList = [];

export function generateCSP(): { csp: string; nonce: string } {
  const nonce = isDev
    ? ""
    : Buffer.from(crypto.randomUUID()).toString("base64");

  const scriptSrcUrls = [...defaultScriptSrcUrlsList].join(" ");
  const frameSrcUrls = [...defaultFrameSrcList].join(" ");
  const connectSrcUrls = [...defaultConnectSrcUrlsList].join(" ");

  // More about directives at:
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy

  // most frameworks use eval() for hot reloading in development for performance reasons but it's a security risk in production.
  const cspHeader = `
    base-uri 'self';
    script-src 'self' ${isDev ? "'unsafe-eval' 'unsafe-inline'" : `'nonce-${nonce}' 'strict-dynamic'`}  ${scriptSrcUrls};
    style-src 'self' 'unsafe-inline';
    object-src 'none';
    frame-ancestors 'none' ;
    frame-src 'self' ${frameSrcUrls};
    worker-src 'self' blob: ;
    connect-src 'self' blob: ${connectSrcUrls};
    ${isDev ? "" : "upgrade-insecure-requests;"}
  `;

  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, " ")
    .trim();

  return {
    csp: contentSecurityPolicyHeaderValue,
    nonce,
  };
}
