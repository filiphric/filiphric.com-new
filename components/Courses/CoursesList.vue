<template>
  <div>
    <div class="flex grow flex-wrap justify-start">
      <div 
        v-for="(item, index) in courses" 
        :key="item.title" 
        class="p-7 w-full md:w-1/2 lg:w-1/3"
      >
        <CoursesItem :item="item" :color-index="index" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CourseItem } from '~/types/courses'

defineProps<{
  courses: CourseItem[]
}>()

</script>

