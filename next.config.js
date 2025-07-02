/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Optimize for Indian users with slower connections
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
}

module.exports = nextConfig