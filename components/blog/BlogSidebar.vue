<template>
  <div class="col-span-2 hidden lg:block">
    <div v-if="links.length">
      <h2 class="text-2xl font-bold">
        Table of contents:
      </h2>
      <ul>
        <NuxtLink
          v-for="link in links"
          :key="link.id"
          :to="'#' + link.id"
          class="prettyLink block max-w-fit"
        >
          {{ link.text }}
        </NuxtLink>
      </ul>
    </div>
    <div v-if="upcomingWorkshop.length">
      <h2 class="mt-7 text-2xl font-bold">
        {{ upcomingWorkshop.length > 1 ? `Upcoming workshops:` : 'Upcoming workshop:' }}
      </h2>
      <div v-for="workshop in upcomingWorkshop" :key="workshop.slug">
        <NuxtLink :to="`/workshop/${workshop.slug}`" class="mt-5 block bg-ivory-dark p-5 dark:bg-black-lighter" @click="useTrackEvent('sidebarWorkshopClick')">
          <Image :src="workshop.image" :alt="workshop.title" />
          <h2 class="text-2xl font-extrabold">
            {{ workshop.title }}
          </h2>
          <p class="text-gray-400">
            {{ workshop.days }}
          </p>
          <p>{{ workshop.date }}</p>
          <button class="mt-5 w-full bg-white px-7 py-3 text-xl font-black uppercase shadow-block-lime transition-all hover:-translate-y-1 hover:-translate-x-1 hover:shadow-block-hover-lime dark:bg-black-light dark:shadow-block-dark-lime dark:duration-300 dark:hover:translate-x-0 dark:hover:translate-y-0 dark:hover:bg-black-lighter dark:hover:shadow-block-dark-hover-lime">Register here</button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { type MaybeRefOrGetter } from '@vueuse/core'
import { isGreaterThanToday } from '@/helpers/isGreaterThanToday'

defineProps<{ links: Array<{
  id: string,
  text: string
}> }>()

const { data } = await useAsyncData('workshops', () => queryContent<MaybeRefOrGetter<any>>('/workshops').findOne())

const upcomingWorkshop = computed(() => {
  const result = data.value.body.filter((item: any) => isGreaterThanToday(item.startDate))
  return result
})

</script>
