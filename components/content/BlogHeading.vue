<template>
  <div class="grid grid-cols-1 place-content-center md:mb-3 md:grid-cols-2">
    <div class="self-center" :class="darkImage || lightImage ? '' : 'col-span-2'">
      <h1 class="mt-14 mb-7 max-w-5xl text-center text-5xl font-extrabold md:text-left md:text-6xl lg:text-7xl">
        {{ title }}
      </h1>
      <BlogInfo
        :cypress-version="cypressVersion"
        :date="date"
        :reading-time="readingTime"
      />
    </div>
    <div v-if="darkImage || lightImage">
      <nuxt-picture :src="darkImage" class="hidden place-self-center self-center mix-blend-lighten dark:block md:w-full" />
      <nuxt-picture :src="lightImage" class="place-self-center self-center dark:hidden md:w-full" />
    </div>
  </div>
  <hr class="mx-auto mb-14 w-28 border-gray-400 md:hidden">
</template>
<script setup lang="ts">
defineProps({
  date: {
    type: String,
    default: ''
  },
  cypressVersion: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  darkImage: {
    type: String,
    default: ''
  },
  lightImage: {
    type: String,
    default: ''
  },
  readingTime: {
    type: String,
    default: ''
  }

})

</script>
