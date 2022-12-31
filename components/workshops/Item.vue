<template>
  <NuxtLink :to="item.slug" class="mx-2 grid w-full place-content-between rounded-3xl p-9 md:mx-0" :class="styleClasses">
    <nuxt-picture :src="item.image" class="mb-7 grid place-items-center" />
    <div>
      <h2 class="text-3xl font-bold">
        {{ item.title }}
      </h2>
      <div class="grid grid-flow-row place-content-end">
        {{ item.description }}
      </div>
    </div>
  </NuxtLink>
</template>
<script setup lang="ts">
import { randomColor } from '@/helpers/randomColor'

const props = defineProps<{
  item: {
    title: string,
    slug: string,
    image: string,
    description: string,
    featured: boolean
  }
}>()

const randomizedColor = randomColor()
const featuredItem = props.item.featured ? 'grid-flow-col w-full' : 'md:grid-flow-row md:min-h-blog-item'

const styleClasses = `shadow-block-${randomizedColor} hover:shadow-block-hover-${randomizedColor} dark:shadow-block-dark-${randomizedColor} dark:hover:shadow-block-dark-hover-${randomizedColor} transition ease-in-out hover:-translate-y-1 hover:-translate-x-1 dark:duration-300 dark:hover:translate-x-0 dark:hover:translate-y-0 ${featuredItem}`
</script>
