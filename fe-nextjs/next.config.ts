import type { NextConfig } from "next";

const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5201/api/:path*',
      },
      {
        source: '/swagger/:path*',
        destination: 'http://localhost:5201/swagger/:path*',
      },
    ]
  },
}
export default nextConfig;
