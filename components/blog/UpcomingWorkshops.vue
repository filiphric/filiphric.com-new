<template>
  <div v-if="upcomingWorkshop.length">
    <h2 class="mt-7 text-2xl font-bold">
      {{ upcomingWorkshop.length > 1 ? `Upcoming workshops:` : 'Upcoming workshop:' }}
    </h2>
    <div v-for="workshop in upcomingWorkshop" :key="workshop.slug">
      <NuxtLink 
        :to="`/workshop/${workshop.slug}`" 
        class="mt-5 block bg-ivory-dark p-5 dark:bg-black-lighter" 
        @click="useTrackEvent('sidebarWorkshopClick')"
      >
        <Image :src="workshop.image" :alt="workshop.title" />
        <h2 class="text-2xl font-extrabold">
          {{ workshop.title }}
        </h2>
        <p class="text-gray-400">
          {{ workshop.days }}
        </p>
        <p>{{ workshop.date }}</p>
        <button class="mt-5 w-full bg-white dark:bg-black-lighter px-7 py-3 text-xl font-black uppercase hover:shadow-block-lime transition-all hover:-translate-y-2 border-2 border-black dark:border-black-dark hover:-translate-x-2">
          Register here
        </button>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isGreaterThanToday } from '@/helpers/isGreaterThanToday'
import { Workshop } from '~/types/workshop';

const { data: workshopsData } = await useAsyncData('workshops', () => 
  queryContent<Workshop>('/workshops').findOne()
)

const upcomingWorkshop = computed(() => {
  const result = workshopsData.value?.body.filter((item: any) => isGreaterThanToday(item.startDate))
  return result || []
})


</script> 