<template>
  <div class="text-center md:text-left">
    <div v-if="date" class=" text-gray-500 dark:text-gray-400 md:text-left">
      {{ formatDate(date) }}
      <div v-if="cypressVersion" class="inline-block">
        <span class="mx-2">|</span><IconCypress class="mr-0.5 inline-block w-6" /> {{ cypressVersion }}
      </div>
      <div v-if="readingTime" class="text-sm">
        {{ readingTime }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { formatDate } from '@/helpers/formatDate'
defineProps({
  date: {
    type: String,
    default: ''
  },
  cypressVersion: {
    type: String,
    default: ''
  },
  readingTime: {
    type: String,
    default: ''
  }
})
</script>
