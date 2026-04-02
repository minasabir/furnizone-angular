/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B6F47',
          50: '#F5F5F0',
          100: '#EFEBE9',
          200: '#D7CCC8',
          300: '#BCAAA4',
          400: '#A1887F',
          500: '#8B6F47',
          600: '#6D5638',
          700: '#4F3E29',
          800: '#31261A',
          900: '#130E09',
        },
        secondary: {
          DEFAULT: '#F5F5F0',
        },
        background: '#F5F5F0',
        foreground: '#1A1A1A',
        muted: {
          DEFAULT: '#F5F5F0',
          foreground: '#6B7280',
        },
        border: '#E5E5E5',
        destructive: {
          DEFAULT: '#EF4444',
          foreground: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
