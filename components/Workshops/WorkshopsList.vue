<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-7">
      <div 
        v-for="(item, index) in data?.body" 
        :key="item.title" 
        class="p-7 md:flex-1"
      >
        <WorkshopsItem :item="item" :colorIndex="index" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { type MaybeRefOrGetter } from '@vueuse/core'

const { data } = await useAsyncData('workshops', () => queryContent<MaybeRefOrGetter<any>>('/workshops').findOne())
</script>
