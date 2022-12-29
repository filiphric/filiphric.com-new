<template>
  <NuxtLink :to="item.slug" class="col-span-1 grid min-h-blog-item grid-flow-row place-content-between rounded-3xl p-9 md:max-w-md" :class="styleClasses">
    <div v-if="item.image" class="mb-7 grid place-items-center">
      <nuxt-picture :src="item.image" class="w-10/12" />
    </div>
    <h2 class="text-3xl font-bold">
      {{ item.title }}
    </h2>
    <div class="grid grid-flow-row place-content-end">
      <p class="mt-4 text-gray-400">
        {{ item.readingTime.text }}
      </p>
      <p>
        {{ item.description }}
      </p>
    </div>
  </NuxtLink>
</template>
<script setup lang="ts">
import { randomColor } from '@/helpers/randomColor'

defineProps<{
  item: {
    title: string,
    slug: string,
    image: string,
    date: string,
    readingTime: {
      text: string
    },
    description: string
  }
}>()

const randomizedColor = randomColor()

const styleClasses = `shadow-block-${randomizedColor} hover:shadow-block-hover-${randomizedColor} dark:shadow-block-dark-${randomizedColor} dark:hover:shadow-block-dark-hover-${randomizedColor} transition ease-in-out hover:-translate-y-1 hover:-translate-x-1 dark:duration-300 dark:hover:translate-x-0 dark:hover:translate-y-0`
</script>
