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
              v-if="courseInfo"
              :info="courseInfo" 
              :price-id="courseInfo.price_id"
              class="cursor-pointer"
            />
          </div>
        </div>
        <div class="w-full md:w-1/2 overflow-hidden rotate-1">
          <Image :src="courseInfo?.image_url" alt="99 Cypress Tips Course" class="w-full h-auto" />
        </div>
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
          <div class="text-4xl font-bold mb-2">10+</div>
          <div>Hours of Content</div>
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
            I have a decade of experience with teaching hundreds of developers and testers. I specialize in helping people level up their testing practices. Whether you are starting with test automation or you are looking to level up, I'm ready to help.
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

const router = useRouter()
const { getCourseBySlug } = useSupabaseCourses()

const navigateToLogin = () => {
  const returnUrl = window.location.pathname
  useCookie('authRedirect').value = returnUrl
  router.push('/login')
}

const { data: courseInfo } = await useAsyncData<Course | null>('course-info', async () => {
  const { course, error } = await getCourseBySlug('99-cypress-tips')
  
  if (error) {
    console.error('Error fetching course:', error)
    return null
  }
  
  return course
})
</script>
