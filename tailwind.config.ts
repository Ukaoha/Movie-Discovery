import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      maxWidth: {
        'custom': '300px', 
      },
      width: {
        '32': '8rem', 
        '50': '60%',
      },
      marginTop:{
        '20': '100px'
      }

    },
  },
  plugins: [],
}
export default config
