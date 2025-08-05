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
  },
};

export default nextConfig;
