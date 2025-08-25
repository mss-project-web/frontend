import type { NextConfig } from "next";

const IMAGE_HOST = process.env.NEXT_PUBLIC_IMAGE_HOST;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: IMAGE_HOST
      ? [
          {
            protocol: 'https',
            hostname: IMAGE_HOST,
            port: '',
            pathname: '/**',
          },
        ]
      : [],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
  },
  // Production optimizations
  experimental: {
    optimizePackageImports: ['axios', 'framer-motion', 'lucide-react'],
  },
  // Reduce bundle size
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Memory optimizations
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
};

export default nextConfig;
