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
      {
        protocol: 'https',
        hostname: 'www.dhnet.be',
      },
      {
        protocol: 'https',
        hostname: 'www.lsa-conso.fr',
      },
      {
        protocol: 'https',
        hostname: 'www.lemonde.fr',
      },
      {
        protocol: 'https',
        hostname: 'img.lemde.fr',
      },
      {
        protocol: 'https',
        hostname: 'www.lefigaro.fr',
      },
      {
        protocol: 'https',
        hostname: 'www.liberation.fr',
      },
      {
        protocol: 'https',
        hostname: 'images.bfmtv.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.radiofrance.fr',
      },
    ],
  },
}

module.exports = nextConfig
