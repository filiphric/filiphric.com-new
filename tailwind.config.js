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
    extend: {
      colors: {
        black: {
          lighter: '#313549',
          light: '#181B25',
          DEFAULT: '#161821'
        },
        white: {
          DEFAULT: '#fff'
        },
        ivory: {
          DEFAULT: '#fffff2'
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
          DEFAULT: '#bad761',
          dark: '#B0D24B'
        },
        mint: {
          DEFAULT: '#9cd1bb',
          dark: '#2D624C'
        },
        punch: {
          DEFAULT: '#ff657a',
          dark: '#FF4760'
        }
      }
    },
    boxShadow: ({ theme }) => ({
      'code-cheese': `
        0px 0px 0 2px ${theme('colors.black.DEFAULT')},
        14px 14px 0 ${theme('colors.cheese.DEFAULT')},
        14px 14px 0 2px ${theme('colors.black.DEFAULT')},
        13px 13px 10px 1px ${theme('colors.cheese.DEFAULT')}
        `,
      'code-blueberry': `
        0px 0px 0 2px ${theme('colors.black.DEFAULT')},
        14px 14px 0 ${theme('colors.blueberry.DEFAULT')},
        14px 14px 0 2px ${theme('colors.black.DEFAULT')},
        13px 13px 10px 1px ${theme('colors.blueberry.DEFAULT')}
        `,
      'code-tangerine': `
        0px 0px 0 2px ${theme('colors.black.DEFAULT')},
        14px 14px 0 ${theme('colors.tangerine.DEFAULT')},
        14px 14px 0 2px ${theme('colors.black.DEFAULT')},
        13px 13px 10px 1px ${theme('colors.tangerine.DEFAULT')}
        `,
      'code-lime': `
        0px 0px 0 2px ${theme('colors.black.DEFAULT')},
        14px 14px 0 ${theme('colors.lime.DEFAULT')},
        14px 14px 0 2px ${theme('colors.black.DEFAULT')},
        13px 13px 10px 1px ${theme('colors.lime.DEFAULT')}
        `,
      'code-mint': `
        0px 0px 0 2px ${theme('colors.black.DEFAULT')},
        14px 14px 0 ${theme('colors.mint.DEFAULT')},
        14px 14px 0 2px ${theme('colors.black.DEFAULT')},
        13px 13px 10px 1px ${theme('colors.mint.DEFAULT')}
        `,
      'code-punch': `
        0px 0px 0 2px ${theme('colors.black.DEFAULT')},
        14px 14px 0 ${theme('colors.punch.DEFAULT')},
        14px 14px 0 2px ${theme('colors.black.DEFAULT')},
        13px 13px 10px 1px ${theme('colors.punch.DEFAULT')}
        `,
      'code-dark-cheese': `
        0px 0px 0 2px ${theme('colors.black.lighter')},
        14px 14px 0 ${theme('colors.cheese.DEFAULT')},
        14px 14px 0 2px ${theme('colors.black.lighter')},
        13px 13px 10px 1px ${theme('colors.cheese.DEFAULT')}b5
        `,
      'code-dark-blueberry': `
        0px 0px 0 2px ${theme('colors.black.lighter')},
        14px 14px 0 ${theme('colors.blueberry.DEFAULT')},
        14px 14px 0 2px ${theme('colors.black.lighter')},
        13px 13px 10px 1px ${theme('colors.blueberry.DEFAULT')}b5
        `,
      'code-dark-tangerine': `
        0px 0px 0 2px ${theme('colors.black.lighter')},
        14px 14px 0 ${theme('colors.tangerine.DEFAULT')},
        14px 14px 0 2px ${theme('colors.black.lighter')},
        13px 13px 10px 1px ${theme('colors.tangerine.DEFAULT')}b5
        `,
      'code-dark-lime': `
        0px 0px 0 2px ${theme('colors.black.lighter')},
        14px 14px 0 ${theme('colors.lime.DEFAULT')},
        14px 14px 0 2px ${theme('colors.black.lighter')},
        13px 13px 10px 1px ${theme('colors.lime.DEFAULT')}b5
        `,
      'code-dark-mint': `
        0px 0px 0 2px ${theme('colors.black.lighter')},
        14px 14px 0 ${theme('colors.mint.DEFAULT')},
        14px 14px 0 2px ${theme('colors.black.lighter')},
        13px 13px 10px 1px ${theme('colors.mint.DEFAULT')}b5
        `,
      'code-dark-punch': `
        0px 0px 0 2px ${theme('colors.black.lighter')},
        14px 14px 0 ${theme('colors.punch.DEFAULT')},
        14px 14px 0 2px ${theme('colors.black.lighter')},
        13px 13px 10px 1px ${theme('colors.punch.DEFAULT')}b5
        `
    }),
    fontFamily: {
      mono: ['Fira Code']
    }

  },
  safelist: [
    'shadow-code-cheese',
    'shadow-code-blueberry',
    'shadow-code-tangerine',
    'shadow-code-lime',
    'shadow-code-mint',
    'shadow-code-punch',
    'dark:shadow-code-dark-cheese',
    'dark:shadow-code-dark-blueberry',
    'dark:shadow-code-dark-tangerine',
    'dark:shadow-code-dark-lime',
    'dark:shadow-code-dark-mint',
    'dark:shadow-code-dark-punch'
  ],
  plugins: []
}
