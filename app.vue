<template>
  <NuxtPage />
</template>
<script setup lang="ts">
useHead({
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
      hid: 'description',
      name: 'description',
      content: 'Filip Hric personal blog and Cypress.io courses and workshops'
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
      rel: 'canonical',
      href: 'https://filiphric.com'
    },
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
})
</script>
