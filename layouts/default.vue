<template>
  <div>
    <div class="mx-auto max-w-screen-xl">
      <Search :show="searchOn" @hide="searchOn = false" />
      <NavBarMobileMenu v-show="showMenu" @close:menu="showMenu = false" />
      <div class="mx-3 md:mx-10 lg:mx-20">
        <NavBar @open:menu="showMenu = true" />
        <slot />
      </div>
    </div>
    <Footer />
  </div>
</template>
<script setup lang="ts">
import { useMagicKeys } from '@vueuse/core'

const { meta, k, escape } = useMagicKeys()
const searchOn = ref(false)
const showMenu = ref(false)

watchEffect(() => {
  if (meta.value && k.value) { searchOn.value = true }
  if (escape.value) { searchOn.value = false }
})

useHead({
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'I teach testers about web development and developers about testing. Blog about Cypress.io full of articles courses and workshops'
    }
  ]
})

</script>
