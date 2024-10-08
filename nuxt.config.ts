import svgLoader from 'vite-svg-loader'
const isProduction = process.env.NODE_ENV === 'production'
const hostname = isProduction ? 'https://filiphric.com' : 'http://localhost:3000'

export default defineNuxtConfig({
  sourcemap: true,

  app: {
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
      remarkPlugins: ['remark-reading-time'],
    },
    documentDriven: false
  },

  css: ['~/assets/css/main.css'],

  cloudinary: {
    cloudName: 'dcnwsgh7c'
  },

  modules: [
    '@nuxt/content',
    '@nuxtjs/cloudinary',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/plausible',
    '@nuxt/fonts',
    '@vueuse/nuxt',
  ],

  nitro: {
    preset: 'vercel-static',
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
      // test
      // stripeApiKey: 'pk_test_51KefBzBnBECxBVfm1vTgllxVJpoU0bdU4sHAsZiio5SDFZLmdZTQYfTbfOR1rfRzA382bpL125RUkSGWvmocmOdq00a1b8UHfB'
      stripeApiKey: 'pk_live_51KefBzBnBECxBVfmEylMMx3HYzX4uzLsuxiG5M56wvvg9cJOiiFm96WwLeYVNvj2vlAC9phbDWeLP151bZhXGxcF00Yxg9Yq3s'
    }
  },

  vite: {
    plugins: [
      svgLoader()
    ]
  },

  devtools: {
    enabled: !isProduction && true
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        verbatimModuleSyntax: true
      }
    }
  },

  compatibilityDate: '2024-07-19'
})