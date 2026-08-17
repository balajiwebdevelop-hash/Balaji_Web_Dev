/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#F6F2EA', // Warm ivory
          subtle: '#EEE8DC',
          dark: '#E5DDCF',
        },
        surface: {
          DEFAULT: '#FCFAF6', // Warm white
          elevated: '#FFFFFF',
          card: '#FBF8F2',
        },
        espresso: {
          DEFAULT: '#211914', // Deep espresso
          light: '#2D221C',
          dark: '#140E0A',
        },
        timber: {
          DEFAULT: '#5A4335', // Sophisticated brown
          light: '#725644',
          dark: '#423126',
        },
        bronze: {
          DEFAULT: '#8C6A45', // Refined architectural bronze
          light: '#A58057',
          dark: '#6F5334',
        },
        champagne: {
          DEFAULT: '#C5A880', // Muted champagne / brushed gold
          light: '#DAC19E',
          dark: '#AC8E64',
        },
        charcoal: {
          DEFAULT: '#171513', // Near-black
          muted: '#36322E',
        },
        warmgray: {
          DEFAULT: '#746D65', // Warm gray
          light: '#9E978F',
          dark: '#4F4942',
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-jakarta)', 'Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.2em',
        editorial: '0.15em',
        subtle: '0.05em',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-reveal': 'scaleReveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleReveal: {
          '0%': { opacity: '0', transform: 'scale(1.05)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
