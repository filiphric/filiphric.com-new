<template>
  <div 
    class="mx-2 grid items-center bg-white p-9 dark:bg-black-lighter md:mx-0 border-2 border-black" 
    :class="blockClass" 
    data-cy="workshop-item"
  >
    <NuxtLink :to="'/workshop/' + item.slug" @click="useTrackEvent('Workshop - ' + item.title)">
      <Image :src="item.image" class="mb-7" :alt="item.title" />
    </NuxtLink>
    <div>
      <NuxtLink :to="'/workshop/' + item.slug">
        <h2 class="font-black text-3xl">
          {{ item.title }}
        </h2>
      </NuxtLink>
      <div class="mt-5 text-xs">
        Next workshop date:
      </div>
      <span v-if="upcomingWorkshop">{{ item.days }}, starting {{ item.date }}</span><span v-else>Coming soon</span>
      <div class="mt-7">
        {{ item.description }}
      </div>
      <NuxtLink :to="'/workshop/' + item.slug" class="animatedIcon prettyLink animatedIcon mt-7 inline-block font-bold">
        Learn more <IconArrowForward class="inline transition-all ease-in-out" />
      </NuxtLink>
    </div>
  </div>
</template>
<script setup lang="ts">
import { isGreaterThanToday } from '@/helpers/isGreaterThanToday'

const props = defineProps<{
  item: {
    title: string,
    slug: string,
    image: string,
    description: string,
    featured: boolean,
    startDate: string
    date: string
    time: string
    days: string
  },
  colorIndex: number
}>()

const upcomingWorkshop = computed(() => {
  return isGreaterThanToday(props.item.startDate)
})

const blockClass = computed(() => useColorCycle(props.colorIndex))
</script>
