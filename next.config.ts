import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const cspHeader = `
    default-src 'self';
    script-src 'self' ${isDev ? "'unsafe-eval'" : ""} 'unsafe-inline' https://clerk.com https://*.clerk.com https://*.clerk.accounts.dev https://challenges.cloudflare.com https://vercel.live;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://img.clerk.com;
    font-src 'self' https://fonts.gstatic.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    frame-src https://clerk.com https://*.clerk.com https://*.clerk.accounts.dev https://challenges.cloudflare.com;
    worker-src 'self' blob:;
    connect-src 'self' https://*.clerk.com https://*.clerk.accounts.dev https://clerk-telemetry.com https://vercel.live;
`;

const securityHeaders = [
    {
        key: "X-Frame-Options",
        value: "DENY",
    },
    {
        key: "X-Content-Type-Options",
        value: "nosniff",
    },
    {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
    },
    {
        key: "X-XSS-Protection",
        value: "1; mode=block",
    },
    {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
    },
    {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
    },
    {
        key: "Content-Security-Policy",
        value: cspHeader.replace(/\n/g, ""),
    },
];

const nextConfig: NextConfig = {
    reactStrictMode: false, // Disable to prevent Performance API timing issues
    experimental: {
        optimizePackageImports: ["lucide-react"],
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "img.clerk.com",
            },
        ],
    },
    async headers() {
        return [
            {
                source: "/:path*",
                headers: securityHeaders,
            },
        ];
    },
};

export default nextConfig;
