<template>
  <nav class="grid grid-flow-col grid-cols-2 place-items-stretch pt-7">
    <NuxtLink to="/" class="self-center text-2xl">
      Filip Hric
    </NuxtLink>
    <NavBarItems class="hidden md:grid" />
    <!-- mobile menu -->
    <button class="place-self-end" @click="$emit('open:menu')">
      <IconMenu class="h-12 w-12 rounded-full border border-gray-400 fill-gray-200 p-2 md:hidden" />
    </button>
  </nav>
</template>
<script setup lang="ts">
defineEmits(['open:menu'])
</script>
