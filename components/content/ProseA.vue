<script setup lang="ts">
defineProps({
  href: {
    type: String,
    default: ''
  },
  blank: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <NuxtLink :href="href" target="_blank" class="prettyLink font-bold">
    <slot />
  </NuxtLink>
</template>
