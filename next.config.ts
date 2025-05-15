import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  // output: 'export', // Removed to enable API routes in local development
  /* config options here */
};

export default nextConfig;
