import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export', // Enable static export for GitHub Pages
  /* config options here */
};

export default nextConfig;
