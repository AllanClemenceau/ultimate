import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Nous ajouterons les couleurs personnalisées ici plus tard
      },
      fontFamily: {
        // Nous ajouterons les polices personnalisées ici plus tard
      },
    },
  },
  plugins: [],
}

export default config
