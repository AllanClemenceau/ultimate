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
      // Sources d'actualités générales
      {
        protocol: 'https',
        hostname: '*.lemonde.fr',
      },
      {
        protocol: 'https',
        hostname: '*.lefigaro.fr',
      },
      {
        protocol: 'https',
        hostname: '*.liberation.fr',
      },
      {
        protocol: 'https',
        hostname: '*.leparisien.fr',
      },
      // Agences de presse
      {
        protocol: 'https',
        hostname: '*.afp.com',
      },
      {
        protocol: 'https',
        hostname: '*.reuters.com',
      },
      // Médias d'information en continu
      {
        protocol: 'https',
        hostname: '*.bfmtv.com',
      },
      {
        protocol: 'https',
        hostname: '*.cnews.fr',
      },
      {
        protocol: 'https',
        hostname: '*.francetvinfo.fr',
      },
      // Médias économiques
      {
        protocol: 'https',
        hostname: '*.lesechos.fr',
      },
      {
        protocol: 'https',
        hostname: '*.latribune.fr',
      },
      // Médias régionaux
      {
        protocol: 'https',
        hostname: '*.ouest-france.fr',
      },
      {
        protocol: 'https',
        hostname: '*.sudouest.fr',
      },
      {
        protocol: 'https',
        hostname: '*.lavoixdunord.fr',
      },
      // Services de CDN et hébergement d'images
      {
        protocol: 'https',
        hostname: '*.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: '*.akamaized.net',
      },
      {
        protocol: 'https',
        hostname: '*.staticflickr.com',
      },
      {
        protocol: 'https',
        hostname: '*.media-amazon.com',
      },
      // Plateformes de contenu
      {
        protocol: 'https',
        hostname: '*.wordpress.com',
      },
      {
        protocol: 'https',
        hostname: '*.wp.com',
      },
      {
        protocol: 'https',
        hostname: '*.medium.com',
      },
    ],
  },
}

module.exports = nextConfig
