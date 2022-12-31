<template>
  <div class="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
    <div v-for="workshop in data.body" :key="workshop.title" :class="workshop.featured && 'col-span-3'">
      <WorkshopsItem :item="workshop" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { MaybeComputedRef } from '@vueuse/core'
const { data } = useAsyncData('workshops', () => queryContent<MaybeComputedRef<any>>('workshops').findOne())
</script>
