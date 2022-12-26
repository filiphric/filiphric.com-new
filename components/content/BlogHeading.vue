<template>
  <div class=" grid grid-cols-1 place-content-center md:mb-3 md:grid-cols-2">
    <div class="self-center">
      <h1 class="mt-14 mb-7 max-w-5xl text-center text-5xl font-extrabold md:text-left md:text-6xl lg:text-7xl">
        {{ title }}
      </h1>
      <BlogInfo
        :cypress-version="cypressVersion"
        :date="date"
        :reading-time="readingTime"
      />
    </div>
    <nuxt-img v-if="isDark && darkImage" :src="darkImage" class="place-self-center self-center mix-blend-lighten md:w-full" />
    <nuxt-img v-if="!isDark && lightImage" :src="lightImage" class="place-self-center self-center md:w-full" />
  </div>
  <hr class="mx-auto mb-14 w-28 border-gray-400 md:hidden">
</template>
<script setup lang="ts">
import { usePreferredDark } from '@vueuse/core'

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
    type: String
  },
  lightImage: {
    type: String
  },
  readingTime: {
    type: String,
    default: ''
  }

})

const isDark = usePreferredDark()

</script>
