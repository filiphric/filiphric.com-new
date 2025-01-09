<template>
  <div class="relative inline-block">
    <div class="bg-lime absolute top-0 left-0 border-black border-2 px-5 py-2 w-full h-full"></div>
    <NuxtLink 
      :to="to" 
      class="relative inline-block border-black border-2 bg-white px-7 py-3 font-bold transition-all hover:-translate-y-2 text-black hover:-translate-x-2 uppercase cursor-pointer w-full"
    >
      <slot/>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  to?: string
}>()
</script> 