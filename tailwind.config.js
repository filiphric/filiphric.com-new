/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue'
  ],
  theme: {
    colors: {
      black: {
        DEFAULT: '#161821'
      },
      gray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280'
      },
      raisin: {
        DEFAULT: '#212431'
      },
      blackberry: {
        DEFAULT: '#292D3D'
      },
      white: {
        DEFAULT: '#fff'
      },
      ivory: {
        DEFAULT: '#fffff2'
      },
      cheese: {
        DEFAULT: '#ffd76d',
        dark: '#B88700'
      },
      blueberry: {
        DEFAULT: '#c39ac9',
        dark: '#64396A'
      },
      tangerine: {
        DEFAULT: '#ff9b5e',
        dark: '#B84600'
      },
      lime: {
        DEFAULT: '#bad761',
        dark: '#5D721D'
      },
      mint: {
        DEFAULT: '#9cd1bb',
        dark: '#2D624C'
      },
      punch: {
        DEFAULT: '#ff657a',
        dark: '#A30016'
      }
    },
    boxShadow: ({ theme }) => ({
      'small-cheese': `-6px 6px ${theme('colors.cheese.DEFAULT')}, -6px 6px 0 2px ${theme('colors.black.DEFAULT')}`,
      'small-blueberry': `-6px 6px ${theme('colors.blueberry.DEFAULT')}, -6px 6px 0 2px ${theme('colors.black.DEFAULT')}`,
      'small-tangerine': `-6px 6px ${theme('colors.tangerine.DEFAULT')}, -6px 6px 0 2px ${theme('colors.black.DEFAULT')}`,
      'small-lime': `-6px 6px ${theme('colors.lime.DEFAULT')}, -6px 6px 0 2px ${theme('colors.black.DEFAULT')}`,
      'small-mint': `-6px 6px ${theme('colors.mint.DEFAULT')}, -6px 6px 0 2px ${theme('colors.black.DEFAULT')}`,
      'small-punch': `-6px 6px ${theme('colors.punch.DEFAULT')}, -6px 6px 0 2px ${theme('colors.black.DEFAULT')}`,
      'small-cheese-dark': `-6px 6px ${theme('colors.cheese.dark')}, -6px 6px 0 2px ${theme('colors.raisin.DEFAULT')}`,
      'small-blueberry-dark': `-6px 6px ${theme('colors.blueberry.dark')}, -6px 6px 0 2px ${theme('colors.raisin.DEFAULT')}`,
      'small-tangerine-dark': `-6px 6px ${theme('colors.tangerine.dark')}, -6px 6px 0 2px ${theme('colors.raisin.DEFAULT')}`,
      'small-lime-dark': `-6px 6px ${theme('colors.lime.dark')}, -6px 6px 0 2px ${theme('colors.raisin.DEFAULT')}`,
      'small-mint-dark': `-6px 6px ${theme('colors.mint.dark')}, -6px 6px 0 2px ${theme('colors.raisin.DEFAULT')}`,
      'small-punch-dark': `-6px 6px ${theme('colors.punch.dark')}, -6px 6px 0 2px ${theme('colors.raisin.DEFAULT')}`

    }),
    fontFamily: {
      mono: ['Fira Code']
    }

  },
  safelist: [
    'shadow-small-cheese',
    'shadow-small-blueberry',
    'shadow-small-tangerine',
    'shadow-small-lime',
    'shadow-small-mint',
    'shadow-small-punch',
    'shadow-small-cheese-dark',
    'shadow-small-blueberry-dark',
    'shadow-small-tangerine-dark',
    'shadow-small-lime-dark',
    'shadow-small-mint-dark',
    'shadow-small-punch-dark'
  ],
  plugins: []
}
