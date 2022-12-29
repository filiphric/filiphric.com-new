<template>
  <NuxtLink :to="link" class="w-full text-center">
    <span class="prettyLink">{{ title }}</span>
  </NuxtLink>
</template>
<script setup lang="ts">
defineProps({
  link: {
    type: String,
    default: undefined
  },
  title: {
    type: String,
    default: undefined
  }
})
</script>
