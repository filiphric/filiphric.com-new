<template>
  <div v-if="upcomingWorkshop" class="mt-14">
    <h2 class="my-14 text-6xl font-bold">
      Upcoming workshop
    </h2>
    <WorkshopsItem :item="upcomingWorkshop" />
  </div>
</template>
<script setup lang="ts">
import { type MaybeRefOrGetter } from '@vueuse/core'
import { isGreaterThanToday } from '@/helpers/isGreaterThanToday'

const { data } = await useAsyncData('workshops', () => queryContent<MaybeRefOrGetter<any>>('/workshops').findOne())

const upcomingWorkshop = computed(() => {
  const result = data?.value?.body.filter((item: any) => isGreaterThanToday(item.startDate))[0]
  return result
})

</script>
