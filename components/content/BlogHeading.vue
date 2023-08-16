<template>
  <div class="grid grid-cols-1 place-content-center md:mb-3 md:grid-cols-2" data-cy="blog-heading">
    <div class="self-center" :class="image ? '' : 'col-span-2'">
      <h1 class="mb-7 mt-14 max-w-5xl text-center text-5xl font-extrabold md:text-left md:text-6xl lg:text-7xl">
        {{ title }}
      </h1>
      <BlogInfo
        :cypress-version="cypressVersion"
        :date="date"
        :reading-time="readingTime"
      />
    </div>
    <Image v-if="image" :src="image" class="place-self-center self-center md:w-full" :alt="title" />
  </div>
  <hr class="mx-auto my-14 w-28 border-gray-400 md:hidden">
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
  image: {
    type: String,
    default: ''
  },
  readingTime: {
    type: String,
    default: ''
  }
})

</script>
