<template>
  <NuxtPage />
</template>
<script setup lang="ts">
import '@stripe/stripe-js'
const route = useRoute()
useHead({
  title: 'Filip Hric - Teaching testers about development and developers about testing',
  link: [
    {
      rel: 'canonical',
      href: `https://filiphric.com${route.path}`
    }
  ]
})
</script>
