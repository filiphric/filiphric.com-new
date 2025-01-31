<template>
  <div>
    <div class="flex grow flex-wrap justify-start">
      <div 
        v-for="(item, index) in courses" 
        :key="item.title" 
        class="p-7 w-full"
      >
        <CoursesItem :item="item" :color-index="index" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Course } from '~/types/courses'

defineProps<{
  courses: Course[]
}>()

</script>

