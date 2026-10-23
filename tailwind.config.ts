import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: '#171715',
          50:  '#f5f5f4',
          100: '#e8e8e5',
          200: '#d1d0cc',
          300: '#b3b2ac',
          400: '#8c8b83',
          500: '#706f67',
          600: '#5a5950',
          700: '#49483f',
          800: '#3c3b33',
          900: '#30302a',
          950: '#171715',
        },
        ivory: {
          DEFAULT: '#F5F0E7',
          50:  '#FDFCF9',
          100: '#F5F0E7',
          200: '#EDE5D3',
          300: '#E3DDD2',
        },
        gold: {
          DEFAULT: '#B69A63',
          light: '#CDB882',
          dark:  '#9A7F48',
        },
        tobacco: {
          DEFAULT: '#654632',
          light: '#8A6244',
          dark:  '#4A3224',
        },
        secondary: '#77736C',
        border: '#E3DDD2',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #171715 0%, #2a2720 50%, #171715 100%)',
        'gold-gradient': 'linear-gradient(135deg, #B69A63 0%, #CDB882 50%, #9A7F48 100%)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-in':       'fade-in 0.4s ease-out',
        'slide-in-right':'slide-in-right 0.3s ease-out',
        'slide-in-left': 'slide-in-left 0.3s ease-out',
        shimmer:         'shimmer 2s infinite linear',
      },
      boxShadow: {
        'card':  '0 1px 3px 0 rgba(23,23,21,0.08), 0 1px 2px -1px rgba(23,23,21,0.04)',
        'card-hover': '0 4px 12px 0 rgba(23,23,21,0.12)',
        'nav':   '0 1px 0 0 #E3DDD2',
        'dialog':'0 20px 60px 0 rgba(23,23,21,0.3)',
      },
    },
  },
  plugins: [],
}

export default config
