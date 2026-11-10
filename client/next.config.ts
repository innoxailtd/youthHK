import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  async rewrites() {
    if (process.env.NODE_ENV !== "development") return [];
    return [
      {
        source: "/api/:path*",
        destination: "http://127.0.0.1:8788/api/:path*",
      },
      {
        source: "/media/:path*",
        destination: "http://127.0.0.1:8788/media/:path*",
      },
    ];
  },
};

export default nextConfig;
