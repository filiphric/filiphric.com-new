<template>
  <div class="grid grid-cols-1 place-content-center place-self-center md:mb-3 " :class="image && 'md:grid-cols-2'">
    <div class="my-14 grid place-items-center self-center md:place-items-start">
      <h1 class="place-self-center text-5xl font-extrabold md:text-left lg:text-6xl">
        <slot name="heading" />
      </h1>
      <div v-if="image" :class="hidingEnabled && 'hidden'" class="w-3/4 place-self-center self-center p-8 dark:mix-blend-lighten md:hidden">
        <NuxtPicture :src="image" />
      </div>
      <p class="my-5 text-2xl font-semibold text-gray-400 md:text-left lg:text-3xl">
        <slot name="description" />
      </p>
      <slot name="paragraph" />
    </div>
    <div v-if="image" class="hidden place-self-center self-center p-8 dark:mix-blend-lighten md:block md:w-full">
      <NuxtPicture :src="image" />
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps({
  image: {
    default: undefined,
    type: String
  },
  hidingEnabled: {
    type: Boolean,
    default: false
  }
})
</script>
