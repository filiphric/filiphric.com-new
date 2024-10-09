<template>
  <Search :show="searchOn" @hide="searchOn = false" />
  <NuxtPage />
</template>
<script setup lang="ts">
import '@stripe/stripe-js'
import { useMagicKeys } from '@vueuse/core'

const { meta, k, escape } = useMagicKeys()
const searchOn = ref(false)

watchEffect(() => {
  if (meta.value && k.value) { searchOn.value = !searchOn.value }
  if (escape.value) { searchOn.value = !searchOn.value }
})

const route = useRoute()

useHead({
  title: 'Teaching testers about development and developers about testing',
  link: [
    {
      rel: 'canonical',
      href: `https://filiphric.com${route.path}`
    }
  ]
})

onBeforeMount(() => {
  if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})
</script>
