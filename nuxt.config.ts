import svgLoader from 'vite-svg-loader'
const hostname = process.env.NODE_ENV === 'production' ? 'https://filiphric.com' : 'http://localhost:3000'

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
    documentDriven: false
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
  nitro: {
    prerender: {
      routes: ['/sitemap.xml', '/rss.xml']
    }
  },
  plausible: {
    apiHost: `${hostname}/stats`
  },
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
