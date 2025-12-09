import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "standalone",
    reactStrictMode: false, // Disable to prevent Performance API timing issues
};

export default nextConfig;
