<template>
  <NuxtLink :to="to" class="mt-3 inline-block border-black border-2 bg-white px-5 py-2 font-bold transition-all hover:-translate-y-2 hover:-translate-x-2 hover:shadow-block-lime dark:bg-black-lighter duration-300">
    <slot/>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  to?: string
}>()
</script> 