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
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        black: {
          lightest: '#6E6E87',
          lighter: '#414150',
          light: '#33333F',
          DEFAULT: '#161821',
          dark: '#101218'
        },
        white: {
          DEFAULT: '#fff'
        },
        ivory: {
          DEFAULT: '#fffff2',
          dark: '#FFFFD6'
        },
        cheese: {
          DEFAULT: '#ffd76d',
          dark: '#FFC933'
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
          DEFAULT: '#bada55',
          dark: '#9FC431'
        },
        mint: {
          DEFAULT: '#9cd1bb',
          dark: '#2D624C'
        },
        punch: {
          semitransparent: '#ff667b17',
          DEFAULT: '#ff657a',
          dark: '#FF5C72'
        }
      },
      minHeight: {
        'blog-item': '650px'
      },
      boxShadow: ({ theme }) => ({
        'block-cheese': `
          8px 8px 0 ${theme('colors.cheese.DEFAULT')},
          8px 8px 0 2px ${theme('colors.black.DEFAULT')}
        `,
        'block-blueberry': `
          8px 8px 0 ${theme('colors.blueberry.DEFAULT')},
          8px 8px 0 2px ${theme('colors.black.DEFAULT')}
        `,
        'block-lime': `
          8px 8px 0 ${theme('colors.lime.DEFAULT')},
          8px 8px 0 2px ${theme('colors.black.DEFAULT')}
        `,
        'block-tangerine': `
          8px 8px 0 ${theme('colors.tangerine.DEFAULT')},
          8px 8px 0 2px ${theme('colors.black.DEFAULT')}
        `,
        'block-mint': `
          8px 8px 0 ${theme('colors.mint.DEFAULT')},
          8px 8px 0 2px ${theme('colors.black.DEFAULT')}
        `,
        'block-punch': `
          8px 8px 0 ${theme('colors.punch.DEFAULT')},
          8px 8px 0 2px ${theme('colors.black.DEFAULT')}
        `
      })
    },
    fontFamily: {
      mono: ['Fira Code'],
      sans: ['Nunito Sans']
    }
  },
  safelist: [
    'shadow-block-cheese',
    'shadow-block-blueberry',
    'shadow-block-lime',
    'shadow-block-tangerine',
    'shadow-block-mint',
    'shadow-block-punch'
  ],
  plugins: []
}
