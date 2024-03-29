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
    'hover:shadow-block-hover-punch'
  ],
  plugins: []
}
