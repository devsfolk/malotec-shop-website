import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  // Disable Turbopack to avoid React Server Components issues
  experimental: {
    webpackBuildWorker: false,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    // Ensure we use standard webpack, not Turbopack
    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      {
        module: /react-server-dom-turbopack/,
      },
    ];
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
