/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary palette - calm, thoughtful blues
        sage: {
          50: '#f6f7f6',
          100: '#e3e7e3',
          200: '#c7cfc7',
          300: '#a3b0a3',
          400: '#7a8a7a',
          500: '#5f6f5f',
          600: '#4a584a',
          700: '#3d483d',
          800: '#333b33',
          900: '#2b312b',
        },
        // Secondary - warm accents
        sand: {
          50: '#fdfcf9',
          100: '#f9f5ed',
          200: '#f2e8d5',
          300: '#e8d6b8',
          400: '#dbc29a',
          500: '#cfae7c',
          600: '#c09a5e',
          700: '#a17e4a',
          800: '#83653d',
          900: '#6b5334',
        },
        // Accent - muted blues for information
        steel: {
          50: '#f7f9fb',
          100: '#eef2f6',
          200: '#dce4ed',
          300: '#c4d1de',
          400: '#a3b7cb',
          500: '#859bb5',
          600: '#6b82a0',
          700: '#596a87',
          800: '#4a596f',
          900: '#404d5e',
        },
        // Background tones
        cream: {
          50: '#fefdfb',
          100: '#fcf9f3',
          200: '#f8f2e6',
          300: '#f2e8d5',
        },
        // Text/slate
        ink: {
          50: '#f8f8f8',
          100: '#f2f2f2',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      fontFamily: {
        serif: ['Merriweather', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#404040',
            h1: {
              fontFamily: 'Merriweather, serif',
              fontWeight: '700',
              color: '#171717',
            },
            h2: {
              fontFamily: 'Merriweather, serif',
              fontWeight: '400',
              color: '#262626',
            },
            h3: {
              fontFamily: 'Merriweather, serif',
              fontWeight: '400',
              color: '#404040',
            },
            p: {
              lineHeight: '1.75',
            },
            a: {
              color: '#6b82a0',
              '&:hover': {
                color: '#596a87',
              },
            },
          },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'flow': 'flow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        flow: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(10px)' },
        },
      },
    },
  },
  plugins: [],
};
