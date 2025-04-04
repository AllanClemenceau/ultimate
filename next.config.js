/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'f.hellowork.com',
      },
      {
        protocol: 'https',
        hostname: 'media1.giphy.com',
      },
    ],
  },
}

module.exports = nextConfig
