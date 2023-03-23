<template>
  <NuxtLink :to="item.slug" class="col-span-1 mx-2 grid min-h-blog-item grid-flow-row place-content-between rounded-3xl bg-white p-9 dark:bg-black-lighter md:mx-0 md:max-w-md" :class="styleClasses" data-cy="blog-item">
    <div v-if="item.image" class="mb-7 grid place-items-center">
      <NuxtPicture :src="item.image" class="w-10/12" :alt="item.title" />
    </div>
    <h2 class="text-3xl font-bold">
      {{ item.title }}
    </h2>
    <div class="grid grid-flow-row place-content-end">
      <p class="mt-4 text-gray-400">
        {{ item.readingTime?.text }}
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
  item: Partial<{
    title: string,
    slug: string,
    image: string,
    date: string,
    readingTime: {
      text: string
    },
    description: string
  }>
}>()

const randomizedColor = randomColor()

const styleClasses = `shadow-block-${randomizedColor} dark:shadow-block-dark-${randomizedColor} transition ease-in-out dark:duration-300`
</script>
