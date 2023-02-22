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
          lighter: '#313549',
          light: '#181B25',
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
        'block-none': 'none',
        // light mode blocks used for code and blog list
        'block-cheese': `
          0px 0px 0 2px ${theme('colors.black.DEFAULT')},
          8px 8px 0 ${theme('colors.cheese.DEFAULT')},
          8px 8px 0 2px ${theme('colors.black.DEFAULT')},
          7px 7px 10px 1px ${theme('colors.cheese.DEFAULT')}
          `,
        'block-blueberry': `
          0px 0px 0 2px ${theme('colors.black.DEFAULT')},
          8px 8px 0 ${theme('colors.blueberry.DEFAULT')},
          8px 8px 0 2px ${theme('colors.black.DEFAULT')},
          7px 7px 10px 1px ${theme('colors.blueberry.DEFAULT')}
          `,
        'block-tangerine': `
          0px 0px 0 2px ${theme('colors.black.DEFAULT')},
          8px 8px 0 ${theme('colors.tangerine.DEFAULT')},
          8px 8px 0 2px ${theme('colors.black.DEFAULT')},
          7px 7px 10px 1px ${theme('colors.tangerine.DEFAULT')}
          `,
        'block-lime': `
          0px 0px 0 2px ${theme('colors.black.DEFAULT')},
          8px 8px 0 ${theme('colors.lime.DEFAULT')},
          8px 8px 0 2px ${theme('colors.black.DEFAULT')},
          7px 7px 10px 1px ${theme('colors.lime.DEFAULT')}
          `,
        'block-mint': `
          0px 0px 0 2px ${theme('colors.black.DEFAULT')},
          8px 8px 0 ${theme('colors.mint.DEFAULT')},
          8px 8px 0 2px ${theme('colors.black.DEFAULT')},
          7px 7px 10px 1px ${theme('colors.mint.DEFAULT')}
          `,
        'block-punch': `
          0px 0px 0 2px ${theme('colors.black.DEFAULT')},
          8px 8px 0 ${theme('colors.punch.DEFAULT')},
          8px 8px 0 2px ${theme('colors.black.DEFAULT')},
          7px 7px 10px 1px ${theme('colors.punch.DEFAULT')}
          `,
        // light mode blocks for hovered state
        'block-hover-cheese': `
          0px 0px 0 2px ${theme('colors.black.DEFAULT')},
          12px 12px 0 ${theme('colors.cheese.DEFAULT')},
          12px 12px 0 2px ${theme('colors.black.DEFAULT')},
          7px 7px 10px 1px ${theme('colors.cheese.DEFAULT')}
          `,
        'block-hover-blueberry': `
          0px 0px 0 2px ${theme('colors.black.DEFAULT')},
          12px 12px 0 ${theme('colors.blueberry.DEFAULT')},
          12px 12px 0 2px ${theme('colors.black.DEFAULT')},
          7px 7px 10px 1px ${theme('colors.blueberry.DEFAULT')}
          `,
        'block-hover-tangerine': `
          0px 0px 0 2px ${theme('colors.black.DEFAULT')},
          12px 12px 0 ${theme('colors.tangerine.DEFAULT')},
          12px 12px 0 2px ${theme('colors.black.DEFAULT')},
          7px 7px 10px 1px ${theme('colors.tangerine.DEFAULT')}
          `,
        'block-hover-lime': `
          0px 0px 0 2px ${theme('colors.black.DEFAULT')},
          12px 12px 0 ${theme('colors.lime.DEFAULT')},
          12px 12px 0 2px ${theme('colors.black.DEFAULT')},
          7px 7px 10px 1px ${theme('colors.lime.DEFAULT')}
          `,
        'block-hover-mint': `
          0px 0px 0 2px ${theme('colors.black.DEFAULT')},
          12px 12px 0 ${theme('colors.mint.DEFAULT')},
          12px 12px 0 2px ${theme('colors.black.DEFAULT')},
          7px 7px 10px 1px ${theme('colors.mint.DEFAULT')}
          `,
        'block-hover-punch': `
          0px 0px 0 2px ${theme('colors.black.DEFAULT')},
          12px 12px 0 ${theme('colors.punch.DEFAULT')},
          12px 12px 0 2px ${theme('colors.black.DEFAULT')},
          7px 7px 10px 1px ${theme('colors.punch.DEFAULT')}
          `,
        // dark  mode blocks used for code and blog list
        'block-dark-cheese': `
          1px 1px 0 ${theme('colors.cheese.DEFAULT')},
          6px 6px 14px 0px ${theme('colors.cheese.DEFAULT')}b5
          `,
        'block-dark-blueberry': `
          1px 1px 0 ${theme('colors.blueberry.DEFAULT')},
          6px 6px 14px 0px ${theme('colors.blueberry.DEFAULT')}b5
          `,
        'block-dark-tangerine': `
          1px 1px 0 ${theme('colors.tangerine.DEFAULT')},
          6px 6px 14px 0px ${theme('colors.tangerine.DEFAULT')}b5
          `,
        'block-dark-lime': `
          1px 1px 0 ${theme('colors.lime.DEFAULT')},
          6px 6px 14px 0px ${theme('colors.lime.DEFAULT')}b5
          `,
        'block-dark-mint': `
          1px 1px 0 ${theme('colors.mint.DEFAULT')},
          6px 6px 14px 0px ${theme('colors.mint.DEFAULT')}b5
          `,
        'block-dark-punch': `
          1px 1px 0 ${theme('colors.punch.DEFAULT')},
          6px 6px 14px 0px ${theme('colors.punch.DEFAULT')}b5
          `,
        // dark mode blocks for hovered state
        'block-dark-hover-cheese': `
          1px 1px 0 ${theme('colors.cheese.DEFAULT')},
          8px 8px 16px 0px ${theme('colors.cheese.DEFAULT')}b5
          `,
        'block-dark-hover-blueberry': `
          1px 1px 0 ${theme('colors.blueberry.DEFAULT')},
          8px 8px 16px 0px ${theme('colors.blueberry.DEFAULT')}b5
          `,
        'block-dark-hover-tangerine': `
          1px 1px 0 ${theme('colors.tangerine.DEFAULT')},
          8px 8px 16px 0px ${theme('colors.tangerine.DEFAULT')}b5
          `,
        'block-dark-hover-lime': `
          1px 1px 0 ${theme('colors.lime.DEFAULT')},
          8px 8px 16px 0px ${theme('colors.lime.DEFAULT')}b5
          `,
        'block-dark-hover-mint': `
          1px 1px 0 ${theme('colors.mint.DEFAULT')},
          8px 8px 16px 0px ${theme('colors.mint.DEFAULT')}b5
          `,
        'block-dark-hover-punch': `
          1px 1px 0 ${theme('colors.punch.DEFAULT')},
          8px 8px 16px 0px ${theme('colors.punch.DEFAULT')}b5
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
    'shadow-block-tangerine',
    'shadow-block-lime',
    'shadow-block-mint',
    'shadow-block-punch',
    'hover:shadow-block-hover-cheese',
    'hover:shadow-block-hover-blueberry',
    'hover:shadow-block-hover-tangerine',
    'hover:shadow-block-hover-lime',
    'hover:shadow-block-hover-mint',
    'hover:shadow-block-hover-punch',
    'dark:shadow-block-dark-cheese',
    'dark:shadow-block-dark-blueberry',
    'dark:shadow-block-dark-tangerine',
    'dark:shadow-block-dark-lime',
    'dark:shadow-block-dark-mint',
    'dark:shadow-block-dark-punch',
    'dark:hover:shadow-block-dark-hover-cheese',
    'dark:hover:shadow-block-dark-hover-blueberry',
    'dark:hover:shadow-block-dark-hover-tangerine',
    'dark:hover:shadow-block-dark-hover-lime',
    'dark:hover:shadow-block-dark-hover-mint',
    'dark:hover:shadow-block-dark-hover-punch'
  ],
  plugins: []
}
