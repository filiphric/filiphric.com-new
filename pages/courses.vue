<template>
  <NuxtLayout>
    <ContentBlock image="/courses_p3h8ht.png" alt="Courses">
      <template #heading>
        Courses
      </template>
      <template #description>
        Explore the world of modern web testing with high quality courses.
      </template>
    </ContentBlock>
    
    <!-- Internal Courses -->
    <div class="mb-28">
      <CoursesList :courses="internalCourses" />
    </div>

    <!-- External Courses -->
    <div v-if="externalCourses.length" class="max-w-6xl mx-auto px-7">
      <h2 class="text-4xl font-bold mb-14 text-center">Courses on other sites</h2>
      <CoursesList :courses="externalCourses" />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { Courses, ExternalCourses } from '~/types/courses';


const { data: internalData } = await useAsyncData<Courses>('courses', () => 
  queryContent('/courses').findOne()
)

const { data: externalData } = await useAsyncData<ExternalCourses>('external-courses', () => 
  queryContent('/courses_external').findOne()
)

const internalCourses = computed(() => 
  internalData.value?.body || []
)

const externalCourses = computed(() => 
  externalData.value?.body || []
)
</script>
