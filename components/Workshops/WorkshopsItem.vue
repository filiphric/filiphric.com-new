<template>
  <div class="mx-2 grid items-center rounded-3xl p-9 md:mx-0" :class="styleClasses" data-cy="workshop-item">
    <NuxtLink :to="'/workshop/' + item.slug" @click="useTrackEvent('Workshop - ' + item.title)">
      <NuxtImg :src="item.image" :class="item.featured ? 'mb-0 md:mb-7' : 'mb-7'" :alt="item.title" />
    </NuxtLink>
    <div>
      <NuxtLink :to="'/workshop/' + item.slug">
        <h2 class="font-black" :class="item.featured ?'md:text-5xl text-3xl' : 'text-3xl'">
          {{ item.title }}
        </h2>
      </NuxtLink>
      <div v-if="item.featured" class="mt-5 inline-block rounded-md bg-white px-3 py-0.5 font-black uppercase shadow-block-lime dark:bg-transparent dark:shadow-block-dark-lime">
        Featured
      </div>
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
import { randomColor } from '@/helpers/randomColor'
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
  }
}>()

const upcomingWorkshop = computed(() => {
  return isGreaterThanToday(props.item.startDate)
})

const randomizedColor = randomColor()
const featuredItem = props.item.featured ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'

const styleClasses = `shadow-block-${randomizedColor} hover:shadow-block-hover-${randomizedColor} dark:shadow-block-dark-${randomizedColor} dark:hover:shadow-block-dark-hover-${randomizedColor} transition ease-in-out hover:-translate-y-1 hover:-translate-x-1 dark:duration-300 dark:hover:translate-x-0 dark:hover:translate-y-0 ${featuredItem}`
</script>
