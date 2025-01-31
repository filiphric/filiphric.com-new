<template>
  <NuxtLayout>
    <div class="min-h-[70vh] flex items-center justify-center">
      <div class="max-w-md mx-auto p-7 text-center">
        <!-- Loading State -->
        <div v-if="state === 'loading'">
          <LoaderAnimation />
          <p class="text-xl">Please wait...</p>
        </div>

        <!-- Success State -->
        <div v-else-if="state === 'success'" class="mb-7">
          <div class="mb-7">
            <svg class="w-16 h-16 text-lime mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 class="text-4xl font-bold mb-4">Payment Successful!</h1>
          <Image 
            :src="course?.image_url" 
            :alt="course?.title || ''"
            class="w-96 h-96 mx-auto my-12"
          />
          <p class="text-xl mb-7">You now have access to <strong>{{ course?.title }}</strong></p>
          <ActionButton :to="`${course?.url}/lesson`" class="h-14 w-64 text-lg">
            Go to course
          </ActionButton>
        </div>

        <!-- Error State -->
        <div v-else>
          <div class="mb-7">
            <svg class="w-16 h-16 text-red-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          
          <h1 class="text-4xl font-bold mb-4">Payment Failed</h1>
          <p class="text-xl mb-7">Something went wrong with your payment. Please try again.</p>
          <p class="text-xl mb-7">If you have any questions, please contact me at <a href="mailto:filip@filiphric.sk" class="font-bold prettyLink">filip@filiphric.sk</a></p>
          <ActionButton to="/courses" class="h-14 w-64 text-lg">
            Back to Courses
          </ActionButton>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { Course } from '~/types/courses'

const route = useRoute()
const loading = ref(true)
const course = ref<Course | null>(null)
const { getCourseById } = useSupabaseCourses()

const state = computed(() => {
  if (loading.value) return 'loading'
  if (route.query.success === 'true' && course.value) return 'success'
  return 'error'
})

// Fetch course data if courseId is present
watchEffect(async () => {
  if (route.query.course) {
    const { course: courseData } = await getCourseById(route.query.course as string)
    course.value = courseData
    loading.value = false
  } else {
    loading.value = false
  }
})
</script> 