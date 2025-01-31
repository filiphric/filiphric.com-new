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
const client = useSupabaseClient()

// Fetch internal courses from Supabase
const { data: internalData } = await useAsyncData('courses', async () => {
  const { data, error } = await client
    .from('courses')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching courses:', error)
    return []
  }
  
  return data
})

const { data: externalData } = await useAsyncData('external-courses', () => 
  queryContent('/courses_external').findOne()
)

const internalCourses = computed(() => 
  internalData.value || []
)

interface ExternalCourse {
  body: Array<{
    title: string
    description: string
    image: string
    url: string
  }>
}

const externalCourses = computed(() => 
  (externalData.value as ExternalCourse)?.body || []
)
</script>
