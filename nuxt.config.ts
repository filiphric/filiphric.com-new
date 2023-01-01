import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    },
    layoutTransition: {
      name: 'layout',
      mode: 'out-in'
    }
  },
  content: {
    markdown: {
      remarkPlugins: ['remark-reading-time']
    },
    documentDriven: true
  },
  css: ['~/assets/css/main.css'],
  image: {
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/dcnwsgh7c/image/upload/v1671966368'
    }
  },
  modules: [
    '@nuxt/content',
    '@nuxt/image-edge',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/plausible'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  vite: {
    plugins: [
      svgLoader()
    ]
  }
})
