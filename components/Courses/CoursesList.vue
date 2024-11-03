<template>
  <div>
    <div class="flex grow flex-wrap">
      <div v-for="item in data?.body" :key="item.title" :class="item.featured ? 'md:basis-full md:flex-1' : 'md:flex-1'" class="p-7">
        <CoursesItem :item="item" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { type MaybeRefOrGetter } from '@vueuse/core'

const { data } = await useAsyncData('courses', () => queryContent<MaybeRefOrGetter<any>>('/courses').findOne())
</script>

