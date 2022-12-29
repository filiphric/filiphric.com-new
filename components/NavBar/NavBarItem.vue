<template>
  <NuxtLink class="prettyLink" :to="link">
    {{ title }}
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
