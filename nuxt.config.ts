import { defineNuxtConfig } from 'nuxt/config'
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
          content: 'https://og.filiphric.com/api/og?image'
        },
        {
          property: 'og:url',
          content: 'https://filiphric.com/'
        },
        {
          property: 'og:image',
          content: 'https://og.filiphric.com/api/og?image'
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
          content: 'https://og.filiphric.com/api/og?image'
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
    '@nuxtjs/supabase'
  ],

  nitro: {
    preset: 'vercel-static',
    prerender: {
      routes: ['/sitemap.xml', '/rss.xml'],
      concurrency: 1,
      failOnError: false
    },
    routeRules: {
      '/robots.txt': {
        headers: {
          'Content-Type': 'text/plain'
        }
      }
    },
    plugins: [
      '~/server/plugins/robots.ts'
    ]
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
      stripeApiKey: 
      'pk_live_51KefBzBnBECxBVfmEylMMx3HYzX4uzLsuxiG5M56wvvg9cJOiiFm96WwLeYVNvj2vlAC9phbDWeLP151bZhXGxcF00Yxg9Yq3s',
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
    strict: true,
    typeCheck: false,
    tsConfig: {
      type: 'module',
      compilerOptions: {
        module: 'ES2015',
        moduleResolution: 'nodenext',
        verbatimModuleSyntax: false
      }
    }
  },

  compatibilityDate: '2024-07-19',

  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirectOptions: {
      callback: '/auth/callback',
      exclude: ['/*']
    }
  }

})
