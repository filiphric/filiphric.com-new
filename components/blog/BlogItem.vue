<template>
  <NuxtLink 
    :to="item.slug" 
    :class='blockClass'
    class="grid min-h-blog-item grid-flow-row place-content-between bg-white p-9 dark:bg-black-lighter md:max-w-md transition ease-in-out duration-200 border-2 border-black" 
    data-cy="blog-item"
  >
    <div v-if="item.image" class="mb-7 grid place-items-center">
      <Image :src="item.image" class="w-10/12" :alt="item.title" />
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
const props = defineProps<{
  item: {
    title: string,
    slug: string,
    image: string,
    date: string,
    readingTime: {
      text: string
    },
    description: string
  },
  colorIndex: number
}>()

const blockClass = computed(() => useColorCycle(props.colorIndex))
</script>
