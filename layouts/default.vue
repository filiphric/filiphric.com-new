<template>
  <Search :show="searchOn" @hide="searchOn = false" />
  <div class="mx-3 md:mx-10 lg:mx-20">
    <NavBar />
    <slot />
  </div>
  <Footer class="px-3 md:px-10 lg:px-20" />
</template>
<script setup lang="ts">
import { useMagicKeys } from '@vueuse/core'

const { meta, k, escape } = useMagicKeys()
const searchOn = ref(false)

watchEffect(() => {
  if (meta.value && k.value) { searchOn.value = true }
  if (escape.value) { searchOn.value = false }
})

</script>
