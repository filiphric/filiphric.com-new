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
          DEFAULT: '#161821',
          dark: '#101218'
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
      }
    },
    boxShadow: ({ theme }) => ({
      'code-cheese': `
        0px 0px 0 2px ${theme('colors.black.DEFAULT')},
        8px 8px 0 ${theme('colors.cheese.DEFAULT')},
        8px 8px 0 2px ${theme('colors.black.DEFAULT')},
        7px 7px 10px 1px ${theme('colors.cheese.DEFAULT')}
        `,
      'code-blueberry': `
        0px 0px 0 2px ${theme('colors.black.DEFAULT')},
        8px 8px 0 ${theme('colors.blueberry.DEFAULT')},
        8px 8px 0 2px ${theme('colors.black.DEFAULT')},
        7px 7px 10px 1px ${theme('colors.blueberry.DEFAULT')}
        `,
      'code-tangerine': `
        0px 0px 0 2px ${theme('colors.black.DEFAULT')},
        8px 8px 0 ${theme('colors.tangerine.DEFAULT')},
        8px 8px 0 2px ${theme('colors.black.DEFAULT')},
        7px 7px 10px 1px ${theme('colors.tangerine.DEFAULT')}
        `,
      'code-lime': `
        0px 0px 0 2px ${theme('colors.black.DEFAULT')},
        8px 8px 0 ${theme('colors.lime.DEFAULT')},
        8px 8px 0 2px ${theme('colors.black.DEFAULT')},
        7px 7px 10px 1px ${theme('colors.lime.DEFAULT')}
        `,
      'code-mint': `
        0px 0px 0 2px ${theme('colors.black.DEFAULT')},
        8px 8px 0 ${theme('colors.mint.DEFAULT')},
        8px 8px 0 2px ${theme('colors.black.DEFAULT')},
        7px 7px 10px 1px ${theme('colors.mint.DEFAULT')}
        `,
      'code-punch': `
        0px 0px 0 2px ${theme('colors.black.DEFAULT')},
        8px 8px 0 ${theme('colors.punch.DEFAULT')},
        8px 8px 0 2px ${theme('colors.black.DEFAULT')},
        7px 7px 10px 1px ${theme('colors.punch.DEFAULT')}
        `,
      'code-dark-cheese': `
        1px 1px 0 ${theme('colors.cheese.DEFAULT')},
        6px 6px 14px 0px ${theme('colors.cheese.DEFAULT')}b5
        `,
      'code-dark-blueberry': `
        1px 1px 0 ${theme('colors.blueberry.DEFAULT')},
        6px 6px 14px 0px ${theme('colors.blueberry.DEFAULT')}b5
        `,
      'code-dark-tangerine': `
        1px 1px 0 ${theme('colors.tangerine.DEFAULT')},
        6px 6px 14px 0px ${theme('colors.tangerine.DEFAULT')}b5
        `,
      'code-dark-lime': `
        1px 1px 0 ${theme('colors.lime.DEFAULT')},
        6px 6px 14px 0px ${theme('colors.lime.DEFAULT')}b5
        `,
      'code-dark-mint': `
        1px 1px 0 ${theme('colors.mint.DEFAULT')},
        6px 6px 14px 0px ${theme('colors.mint.DEFAULT')}b5
        `,
      'code-dark-punch': `
        1px 1px 0 ${theme('colors.punch.DEFAULT')},
        6px 6px 14px 0px ${theme('colors.punch.DEFAULT')}b5
        `
    }),
    fontFamily: {
      mono: ['Fira Code'],
      sans: ['Nunito Sans']
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
