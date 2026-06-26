import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: any = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: 'yamuti-backend.onrender.com',
      },
      {
        protocol: 'https',
        hostname: '*.onrender.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
      },
      {
        protocol: 'http',
        hostname: '192.168.**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  async redirects() {
    if (process.env.NODE_ENV === 'production') {
      return [
        {
          source: '/showcase',
          destination: '/',
          permanent: false,
        },
        {
          source: '/showcase/:path*',
          destination: '/',
          permanent: false,
        },
        {
          source: '/wireframe',
          destination: '/',
          permanent: false,
        },
        {
          source: '/wireframe/:path*',
          destination: '/',
          permanent: false,
        },
      ];
    }
    return [];
  },
};

export default withNextIntl(nextConfig);

