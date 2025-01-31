<template>
  <NuxtLayout>
    <div class="max-w-6xl mx-auto px-4">
      <!-- Hero Section -->
      <div class="mt-14 md:mt-28 flex flex-col-reverse md:flex-row items-center gap-7 md:gap-14 sm:mx-7">
        <div class="w-full md:w-1/2 text-center md:text-left">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 md:mb-7">
            99 Cypress Tips
          </h1>
          <p class="text-lg md:text-xl lg:text-2xl mb-5 md:mb-7">
            Level up your Cypress skills with bite-sized, practical tips that you can immediately apply to your testing workflow.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <CoursesPaymentButton 
              v-if="courseInfo && !hasPurchased"
              :info="courseInfo" 
              :price-id="courseInfo.price_id"
              class="cursor-pointer"
            />
            <ActionButton 
              v-if="courseInfo && hasPurchased"
              :to="`/course/${courseInfo.slug}/lesson`"
              class="h-14 w-64 text-lg text-center"
            >
              Go to course
            </ActionButton>
          </div>
        </div>
        <div class="w-full md:w-1/2 overflow-hidden rotate-1">
          <Image :src="courseInfo?.image_url" alt="99 Cypress Tips Course" class="w-full h-auto" />
        </div>
      </div>

      <div class="mt-14 wrapper">
        <div class="mb-4 placeholder mx-auto flex flex-col items-center justify-center">
          <LoaderAnimation />
          <p class="text-xl text-center mt-4">Loading video...</p>
        </div>
        <mux-player
          playback-id="4aZqc4EvP5464v9vBvULOTlRYrs9SwkGR8fFG018izD00"
          theme="minimal"
          thumbnail-time="107"
        />
      </div>

      <!-- Course Modules -->
      <div class="mt-28">
        <h2 class="text-4xl font-bold mb-14 text-center">What You'll Learn</h2>
        <div class="grid gap-7">
          <div class="flex justify-center bg-white p-7 py-4 font-bold shadow-block dark:bg-black-dark">
            <div class="w-full p-7">
              <div class="mb-2 flex">
                <div class="w-1/12">
                  <span class="mt-2 block h-2 w-2 rounded-full bg-lime" />
                </div>
                <div class="w-11/12">
                  <span class="block text-xl font-extrabold">Testing Fundamentals</span>
                  <span class="text-md font-normal">Master Cypress setup, configuration, and core concepts</span>
                </div>
              </div>
              <div class="mb-2 flex">
                <div class="w-1/12">
                  <span class="mt-2 block h-2 w-2 rounded-full bg-punch" />
                </div>
                <div class="w-11/12">
                  <span class="block text-xl font-extrabold">Advanced Patterns</span>
                  <span class="text-md font-normal">Learn professional testing patterns and best practices</span>
                </div>
              </div>
              <div class="mb-2 flex">
                <div class="w-1/12">
                  <span class="mt-2 block h-2 w-2 rounded-full bg-blueberry" />
                </div>
                <div class="w-11/12">
                  <span class="block text-xl font-extrabold">Network Testing</span>
                  <span class="text-md font-normal">Master API testing and network request interception</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Course Stats -->
      <div class="mt-28 grid md:grid-cols-4 gap-7">
        <div class="bg-white p-7 shadow-block dark:bg-black-dark text-center">
          <div class="text-4xl font-bold mb-2">99</div>
          <div>Practical Tips</div>
        </div>
        <div class="bg-white p-7 shadow-block dark:bg-black-dark text-center">
          <div class="text-4xl font-bold mb-2">2+</div>
          <div>Hours of laser-focused content</div>
        </div>
        <div class="bg-white p-7 shadow-block dark:bg-black-dark text-center">
          <div class="text-4xl font-bold mb-2">∞</div>
          <div>Lifetime Access</div>
        </div>
        <div class="bg-white p-7 shadow-block dark:bg-black-dark text-center">
          <div class="text-4xl font-bold mb-2">24/7</div>
          <div>Support</div>
        </div>
      </div>

      <!-- About Me Section -->
      <div class="mt-28 flex flex-col-reverse md:flex-row items-center gap-7 md:gap-14 sm:mx-7">
        <div class="w-full md:w-1/2 text-center md:text-left">
          <h2 class="text-4xl font-bold mb-5 md:mb-7">About Your Instructor</h2>
          <p class="text-lg md:text-xl lg:text-2xl mb-5 md:mb-7">
            I have a close to a decade of experience with teaching hundreds of developers and testers. I specialize in helping people level up their testing practices. Whether you are starting with test automation or you are looking to level up, I'm ready to help.
          </p>
          <div class="flex flex-wrap gap-4">
            <NuxtLink 
              to="/about" 
              class="prettyLink max-w-fit"
            >
              More about me
            </NuxtLink>
            <NuxtLink 
              to="/talks-webinars" 
              class="prettyLink max-w-fit"
            >
              Talks & webinars
            </NuxtLink>
          </div>
        </div>
        <div class="shadow-block w-full md:w-1/2 overflow-hidden bg-white dark:bg-transparent rotate-1">
          <Image src="/small_square_kdhln0.png" alt="Filip Hric" class="w-full h-auto" />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { Course } from '~/types/courses';
import "@mux/mux-player";
import "@mux/mux-player/themes/minimal";

const { getCourseBySlug } = useSupabaseCourses()
const store = useStore()
const user = useSupabaseUser()
const { getUserCourses } = useSupabaseCourses()

// Load purchased courses if user is logged in
onMounted(async () => {
  if (user.value) {
    const { courses: coursesData, error: coursesError } = await getUserCourses(user.value.id)
    if (coursesError) {
      console.error('Error fetching user courses:', coursesError)
    }
  }
})

const { data: courseInfo } = await useAsyncData<Course | null>('course-info', async () => {
  const { course, error } = await getCourseBySlug('99-cypress-tips')
  
  if (error) {
    console.error('Error fetching course:', error)
    return null
  }
  
  return course
})

const hasPurchased = computed(() => {
  return store.purchasedCourses.some(course => course.id === courseInfo.value?.id)
})

</script>

<style scoped>
.wrapper {
  aspect-ratio: 16 / 9;
  width: 100%;
  position: relative;
}
mux-player, .placeholder {
  position: absolute;
  inset: 0;
}
.placeholder {
  background-size: contain;
  background-repeat: no-repeat;
}
</style>