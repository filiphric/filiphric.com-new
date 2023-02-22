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
        <NuxtLink :to="`/workshop/${workshop.slug}`" class="mt-5 block bg-ivory-dark p-5 dark:bg-black-dark" @click="useTrackEvent('sidebarWorkshopClick')">
          <NuxtImg :src="workshop.image" />
          <h2 class="text-2xl font-extrabold">
            {{ workshop.title }}
          </h2>
          <p class="text-gray-400">
            {{ workshop.days }}
          </p>
          <p>{{ workshop.date }}</p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { MaybeComputedRef } from '@vueuse/core'
import { isGreaterThanToday } from '@/helpers/isGreaterThanToday'

defineProps<{ links: Array<{
  id: string,
  text: string
}> }>()
const { data } = await useAsyncData('workshops', () => queryContent<MaybeComputedRef<any>>('/workshops').findOne())

const upcomingWorkshop = computed(() => {
  const result = data.value.body.filter((item: any) => isGreaterThanToday(item.startDate))
  return result
})

</script>
