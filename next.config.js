/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com'],
  },
};

module.exports = nextConfig;