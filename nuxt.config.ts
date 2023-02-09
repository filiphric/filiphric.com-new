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
    },
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      titleTemplate: '%s ' + 'Filip Hric',
      meta: [
        {
          charset: 'utf-8'
        },
        {
          name: 'viewport', content: 'width=device-width, initial-scale=1'
        },
        {
          name: 'keywords',
          content: 'cypress, cypress.io, Filip Hric, course, workshop, how to, tutorial'
        },
        {
          name: 'image',
          content: 'https://filiphric-com-og.vercel.app/api/og?image'
        },
        {
          property: 'og:url',
          content: 'https://filiphric.com/'
        },
        {
          property: 'og:image',
          content: 'https://filiphric-com-og.vercel.app/api/og?image'
        },
        {
          property: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          property: 'twitter:creator',
          content: '@filip_hric'
        },
        {
          property: 'twitter:image',
          content: 'https://filiphric-com-og.vercel.app/api/og?image'
        }
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico'
        },
        {
          rel: 'apple-touch-icon',
          sizes: '192x192',
          href: '/android-chrome-192x192.png'
        },
        {
          rel: 'apple-touch-icon',
          sizes: '512x512',
          href: '/android-chrome-512x512.png'
        },
        {
          rel: 'alternate',
          type: 'application/rss+xml',
          title: 'Blog RSS Feed',
          href: '/rss.xml'
        }
      ]
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
  runtimeConfig: {
    public: {
      convertkitApiKey: 'WtEuO8Nrmgh8k5YuNpyfiQ',
      stripeApiKey: 'pk_live_51KefBzBnBECxBVfmEylMMx3HYzX4uzLsuxiG5M56wvvg9cJOiiFm96WwLeYVNvj2vlAC9phbDWeLP151bZhXGxcF00Yxg9Yq3s'
    }
  },
  vite: {
    plugins: [
      svgLoader()
    ]
  }
})
