<template>
  <div class="mx-2 grid items-center  bg-white p-9 dark:bg-black-lighter md:mx-0" :class="styleClasses" data-cy="workshop-item">
    <NuxtLink :to="'/workshop/' + item.slug" @click="useTrackEvent('Workshop - ' + item.title)">
      <Image :src="item.image" :class="item.featured ? 'mb-0 md:mb-7' : 'mb-7'" :alt="item.title" />
    </NuxtLink>
    <div>
      <NuxtLink :to="'/workshop/' + item.slug">
        <h2 class="font-black" :class="item.featured ?'md:text-5xl text-3xl' : 'text-3xl'">
          {{ item.title }}
        </h2>
      </NuxtLink>
      <div v-if="item.featured" class="dark:shadow-block-dark-lime mt-5 inline-block bg-white px-3 py-0.5 font-black uppercase shadow-block-lime dark:bg-transparent">
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

const featuredItem = props.item.featured ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'

const styleClasses = `shadow-block ${featuredItem}`
</script>
