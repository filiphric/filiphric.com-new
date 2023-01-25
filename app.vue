<template>
  <NuxtPage />
</template>
<script setup lang="ts">
const route = useRoute()
useHead({
  link: [
    {
      rel: 'canonical',
      href: `https://filiphric.com${route.path}`
    }
  ]
})
</script>
