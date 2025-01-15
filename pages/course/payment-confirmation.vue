<template>
  <NuxtLayout>
    <div class="min-h-[70vh] flex items-center justify-center">
      <div class="max-w-md mx-auto p-7 text-center">
        <!-- Success State -->
        <template v-if="success">
          <div v-if="loading">
            <LoaderAnimation />
            <p class="text-xl">Please wait...</p>
          </div>
          <div v-if="course && !loading" class="mb-7">
            
            <div class="mb-7">
              <svg class="w-16 h-16 text-lime mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 class="text-4xl font-bold mb-4">Payment Successful!</h1>
            <Image 
              :src="course.image_url" 
              :alt="course.title"
              class="w-96 h-96 mx-auto my-12"
            />
            <p class="text-xl mb-7">You now have access to <strong>{{ course.title }}</strong></p>
            <ActionButton :to="`/course/${course?.slug}/lesson`" class="h-14 w-64 text-lg">
              Go to course
            </ActionButton>
          </div>
        </template>

        <!-- Error State -->
        <template v-else>
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
        </template>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute()
const success = computed(() => route.query.success === 'true')
const courseId = computed(() => route.query.course as string)
const course = ref<any>(null)
const loading = ref(true)
const { getCourseById } = useSupabaseCourses()

// Fetch course data if courseId is present
watchEffect(async () => {
  if (courseId.value) {
    const { course: courseData } = await getCourseById(courseId.value)
    if (courseData) {
      course.value = courseData
      loading.value = false
    }
  }
})

// Redirect if no query parameters
if (!route.query.success) {
  navigateTo('/courses')
}
</script> 