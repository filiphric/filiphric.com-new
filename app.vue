<template>
  <Search v-if="searchOn" @hide="searchOn = false" />
  <NuxtPage />
</template>
<script setup lang="ts">
import '@stripe/stripe-js'
import { useMagicKeys } from '@vueuse/core'
import { useStore } from '~/stores/useStore'

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

const store = useStore()

// Load user data on app initialization
onMounted(async () => {
  await store.loadUser()
})

onBeforeMount(() => {
  if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})
</script>
