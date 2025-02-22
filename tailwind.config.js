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
          '50': '#fffaeb',
          '100': '#fff0c6',
          '200': '#ffd76d',
          '300': '#ffc84a',
          '400': '#ffb120',
          '500': '#f98d07',
          '600': '#dd6702',
          '700': '#b74606',
          '800': '#94350c',
          '900': '#7a2c0d',
          '950': '#461502',
        },
        blueberry: {
          DEFAULT: '#c39ac9',
          '50': '#fbf8fc',
          '100': '#f6f0f7',
          '200': '#efe3f1',
          '300': '#e2cde5',
          '400': '#ceacd4',
          '500': '#c39ac9',
          '600': '#a670ad',
          '700': '#8f5b95',
          '800': '#774e7b',
          '900': '#614063',
          '950': '#422645',
        },
        tangerine: {
          DEFAULT: '#ff9b5e',
          '50': '#fff5ed',
          '100': '#ffe7d4',
          '200': '#ffcca9',
          '300': '#ff9b5e',
          '400': '#fe7839',
          '500': '#fc5313',
          '600': '#ed3909',
          '700': '#c52709',
          '800': '#9c2110',
          '900': '#7e1d10',
          '950': '#440c06',
        },
        lime: {
          DEFAULT: '#bada55',
          '50': '#f9fce9',
          '100': '#f1f8cf',
          '200': '#e1f1a5',
          '300': '#cbe670',
          '400': '#bada55',
          '500': '#96bc26',
          '600': '#74961a',
          '700': '#587219',
          '800': '#475b19',
          '900': '#3d4d1a',
          '950': '#1f2a09',
        },
        mint: {
          DEFAULT: '#9cd1bb',
          '50': '#f0f9f5',
          '100': '#dbf0e5',
          '200': '#bae0ce',
          '300': '#9cd1bb',
          '400': '#5bac8d',
          '500': '#399071',
          '600': '#28735b',
          '700': '#205c4a',
          '800': '#1c493b',
          '900': '#183c32',
          '950': '#0c221d',
        },
        punch: {
          DEFAULT: '#ff657a',
          '50': '#fff1f2',
          '100': '#ffe3e5',
          '200': '#ffccd2',
          '300': '#ffa1ac',
          '400': '#ff657a',
          '500': '#f93a59',
          '600': '#e71743',
          '700': '#c30d37',
          '800': '#a30e36',
          '900': '#8b1035',
          '950': '#4e0317',
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
