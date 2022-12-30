<template>
  <NuxtLink :to="link" class="w-full text-center">
    <span class="prettyLink" @click="useTrackEvent(title)">{{ title }}</span>
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
    default: 'NavBarLink'
  }
})
</script>
