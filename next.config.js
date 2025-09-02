/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Handle large static files
  experimental: {
    largePageDataBytes: 128 * 1024 * 1024, // 128MB
  },
  // Optimize for production
  compress: true,
  poweredByHeader: false,
}

module.exports = nextConfig 