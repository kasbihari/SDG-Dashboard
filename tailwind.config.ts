import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Nieuw kleurenpalet - Donker thema met paarse accenten
        navy: {
          50: '#F0F9FF',   // Zeer licht voor tekst
          100: '#E0F2FE',  // Licht voor tekst
          200: '#CBD5E1',  // Lichtgrijs voor subtiele tekst
          800: '#1E1B4B',  // Paars-blauw medium
          900: '#0A0A2E',  // Donker marineblauw
          950: '#050516',  // Donkerblauw-zwart basis
        },
        purple: {
          300: '#D8B4FE',  // Licht paars
          400: '#C084FC',  // Medium paars
          500: '#A855F7',  // Primaire paars
          600: '#9333EA',  // Donker paars
          700: '#7C3AED',  // Diep paars
          800: '#6D28D9',  // Extra diep paars
        },
        // Behoud de SDG kleuren
        sdg: {
          1: '#E5243B',
          2: '#DDA63A',
          3: '#4C9F38',
          4: '#C5192D',
          5: '#FF3A21',
          6: '#26BDE2',
          7: '#FCC30B',
          8: '#A21942',
          9: '#FD6925',
          10: '#DD1367',
          11: '#FD9D24',
          12: '#BF8B2E',
          13: '#3F7E44',
          14: '#0A97D9',
          15: '#56C02B',
          16: '#00689D',
          17: '#19486A',
        },
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
        'gradient': 'gradient 15s ease infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        fadeInDown: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(-20px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        slideInLeft: {
          '0%': { 
            opacity: '0',
            transform: 'translateX(-20px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateX(0)'
          },
        },
        slideInRight: {
          '0%': { 
            opacity: '0',
            transform: 'translateX(20px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateX(0)'
          },
        },
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        glow: {
          '0%': {
            boxShadow: '0 0 20px -10px rgb(168 85 247)',
          },
          '100%': {
            boxShadow: '0 0 20px 10px rgb(168 85 247 / 0.3)',
          },
        },
        float: {
          '0%, 100%': { 
            transform: 'translateY(0)' 
          },
          '50%': { 
            transform: 'translateY(-10px)' 
          },
        },
        shimmer: {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(100%)',
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #050516 0%, #0A0A2E 50%, #1E1B4B 100%)',
        'navy-gradient': 'linear-gradient(135deg, #050516 0%, #0A0A2E 25%, #1E1B4B 50%, #6D28D9 75%, #9333EA 100%)',
        'purple-gradient': 'linear-gradient(135deg, #9333EA 0%, #A855F7 50%, #C084FC 100%)',
        'dark-gradient': 'linear-gradient(135deg, #050516 0%, #0A0A2E 33%, #1E1B4B 66%, #6D28D9 100%)',
        'card-gradient': 'linear-gradient(145deg, #0A0A2E 0%, #1E1B4B 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgb(168 85 247 / 0.2)',
        'glow-md': '0 0 20px rgb(168 85 247 / 0.3)',
        'glow-lg': '0 0 30px rgb(168 85 247 / 0.4)',
        'glow-xl': '0 0 40px rgb(168 85 247 / 0.5)',
        'inner-glow': 'inset 0 2px 4px 0 rgb(168 85 247 / 0.1)',
        'dark': '0 4px 6px -1px rgb(5 5 22 / 0.3), 0 2px 4px -2px rgb(5 5 22 / 0.3)',
        'dark-lg': '0 10px 15px -3px rgb(5 5 22 / 0.3), 0 4px 6px -4px rgb(5 5 22 / 0.3)',
        'dark-xl': '0 20px 25px -5px rgb(5 5 22 / 0.3), 0 8px 10px -6px rgb(5 5 22 / 0.3)',
      },
      backdropBlur: {
        xs: '2px',
      },
      scale: {
        '102': '1.02',
        '103': '1.03',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
        'transform': 'transform',
      },
      transitionDuration: {
        '2000': '2000ms',
        '3000': '3000ms',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [
    function({ addUtilities, theme }) {
      const newUtilities = {
        '.text-gradient': {
          background: `linear-gradient(135deg, ${theme('colors.purple.400')}, ${theme('colors.purple.600')})`,
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.text-gradient-light': {
          background: `linear-gradient(135deg, ${theme('colors.navy.50')}, ${theme('colors.navy.100')})`,
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.bg-glass': {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
        '.bg-dark-glass': {
          backgroundColor: 'rgba(5, 5, 22, 0.8)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(168, 85, 247, 0.2)',
        },
        '.border-glow': {
          border: '1px solid transparent',
          background: `linear-gradient(${theme('colors.navy.900')}, ${theme('colors.navy.900')}) padding-box, linear-gradient(135deg, ${theme('colors.purple.500')}, ${theme('colors.purple.700')}) border-box`,
        },
        '.shadow-inner-glow': {
          'box-shadow': 'inset 0 2px 4px 0 rgb(168 85 247 / 0.2)',
        },
        '.light-text': {
          color: '#F0F9FF',
          textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
        },
        '.chart-text': {
          fill: '#F0F9FF',
          color: '#F0F9FF',
        },
        '.chart-light': {
          color: '#F0F9FF',
          stroke: '#F0F9FF',
          fill: '#F0F9FF',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    },
  ],
}

export default config