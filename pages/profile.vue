<template>
  <NuxtLayout>
    <div class="mx-auto mt-14 p-7">      
      <div v-if="loading" class="text-center">
        <div class="mb-4">
          <LoaderAnimation />
        </div>
        <p class="text-xl">{{ loadingMessage }}</p>
      </div>

      <div v-else-if="error" class="text-center text-red-500">
        {{ error }}
      </div>
      
      <div v-else class="space-y-7">
        <div class="flex items-center gap-5">
          <img 
            :src="profile?.avatar_url" 
            :alt="profile?.full_name" 
            class="w-24 h-24 rounded-full"
          >
          <div class="flex flex-col gap-1 justify-center">
            <h1 class="text-4xl font-bold">{{ profile?.full_name }}</h1>
            <div class="flex items-center gap-1">
              <p class="text-gray-500">{{ profile?.email }}</p>
              <p class="text-gray-500 mx-2">|</p>
              <NuxtLink :to="`https://github.com/${profile?.github_username}`" target="_blank" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-1">
                <IconGithub class="w-4 h-4" />
                <p>{{ profile?.github_username }}</p>
              </NuxtLink>
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <!-- Tabs Navigation -->
          <div class="border-b border-gray-200 dark:border-gray-700">
            <nav class="-mb-px flex space-x-8">
              <button
                @click="navigateToTab('courses')"
                :class="[
                  'py-4 px-1 border-b-2 font-medium whitespace-nowrap',
                  activeTab === 'courses'
                    ? 'border-black text-black dark:border-white dark:text-white'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'
                ]"
              >
                Your Courses
              </button>
              <button
                @click="navigateToTab('membership')"
                :class="[
                  'py-4 px-1 font-medium whitespace-nowrap',
                  activeTab === 'membership'
                    ? 'border-black text-black dark:border-white dark:text-white'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'
                ]"
              >
                Membership
              </button>
              <button
                @click="navigateToTab('certificates')"
                :class="[
                  'py-4 px-1 font-medium whitespace-nowrap',
                  activeTab === 'certificates'
                    ? 'border-black text-black dark:border-white dark:text-white'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'
                ]"
              >
                Your Certificates
              </button>
              <button
                @click="handleBillingClick"
                class="py-4 px-1 font-medium whitespace-nowrap text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300 flex items-center gap-1"
              >
                Billing & Invoices
                <IconExternalLink class="w-4 h-4" />
              </button>
            </nav>
          </div>

          <!-- Tabs Content -->
          <div v-if="activeTab === 'courses'">
            <div v-if="purchasedCourses?.length" class="grid gap-4">
              <div 
                v-for="item in purchasedCourses" 
                :key="item.course_id"
              >
                <div class="flex items-center justify-between bg-ivory-dark dark:bg-black-dark p-4 gap-7">
                  <Image 
                    :src="item.courses.image_url" 
                    :alt="item.courses.title"
                    class="w-40 h-40"
                  />
                  <div class="flex-1">
                    <h3 class="text-2xl font-bold">{{ item.courses.title }}</h3>
                    <p class="text-gray-500">{{ item.courses.description }}</p>
                    <div class="mt-4">
                      <div class="flex items-center gap-2">
                        <div class="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div 
                            class="bg-lime h-2.5 rounded-full transition-all duration-500"
                            :style="{ width: calculateProgress(item.courses) + '%' }"
                          />
                        </div>
                        <span class="text-sm text-gray-500">{{ calculateProgress(item.courses) }}%</span>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col gap-2">
                    <ActionButton 
                      :to="`/course/${item.courses.slug}/lesson`"
                      class="font-md"
                    >
                      {{ completedCourses.length ? 'Go to course' : 'Continue Learning' }}
                    </ActionButton>
                    <NuxtLink 
                      v-if="calculateProgress(item.courses) === 100"
                      @click="navigateToTab('certificates')"
                      class="font-bold bg-lime text-white dark:text-black rounded-md px-1.5 py-0.5 mt-1 inline-block mx-auto max-w-fit cursor-pointer"
                    >
                      Certificate available
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-gray-500">
              You haven't purchased any courses yet.
              <NuxtLink to="/courses" class="prettyLink ml-2">
                Browse Courses
              </NuxtLink>
            </div>
          </div>
          <div v-if="activeTab === 'certificates'" class="space-y-6">
            <div v-if="completedCourses.length">
              <div v-for="course in completedCourses" :key="course.id" class="mb-6 p-4 bg-ivory-dark dark:bg-black-dark">
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="text-xl font-bold">{{ course.title }}</h3>
                    <p class="text-sm text-gray-500">Course completed</p>
                  </div>
                  <ActionButton>
                    <button @click="downloadCertificate(course.slug)" class="uppercase flex items-center gap-2">
                      <IconDownload class="w-5 h-5" />
                      Download Certificate
                    </button>
                  </ActionButton>
                </div>
              </div>
            </div>
            <div v-else class="text-center py-7">
              <p class="text-gray-500">After completing a course, your certificates will be here!</p>
            </div>
          </div>
          <div v-if="activeTab === 'membership'">
            <h2 class="font-extrabold text-4xl py-7">Membership is coming soon!</h2>
            <p>Get exclusive access to private live streams, Q&A sessions and a discounts on all future courses and workshops.</p>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const user = useSupabaseUser()
const loading = ref(true)
const error = ref('')
const store = useStore()
const loadingMessage = ref('Loading profile...')
const { getCurrentUser } = useSupabaseAuth()
const { getProfile } = useSupabaseProfile()
const { getUserCourses } = useSupabaseCourses()
const { getWatchedLessons } = useSupabaseWatchedLessons()

// Set active tab based on URL parameter
const activeTab = computed({
  get: () => (route.query.tab as string) || 'courses',
  set: (value) => {
    router.push({ query: { ...route.query, tab: value } })
  }
})

interface ProfileData {
  id: string
  updated_at?: string
  username?: string
  full_name?: string
  avatar_url?: string
  email?: string
  github_username?: string
}

interface UserCourse {
  course_id: string
  courses: {
    id: string
    title: string
    slug: string
    url: string
    image_url: string
    description: string
    course_lessons?: {
      id: string
    }[]
  }
}

const profile = ref<ProfileData | null>(null)
const purchasedCourses = ref<UserCourse[]>([])
const watchedLessons = ref<string[]>([])

// Redirect if not logged in - wait for client-side hydration
onMounted(() => {
  watchEffect(() => {
    if (!user.value) {
      navigateTo('/login')
    }
  })
})

onMounted(async () => {
  try {
    if (user.value) {
      // Get profile data
      const { profile: profileData, error: profileError } = await getProfile(user.value.id)
      if (profileError) throw profileError

      // Get GitHub profile data
      const { user: userData, error: userError } = await getCurrentUser()
      if (userError) throw userError
      
      profile.value = {
        ...(profileData as ProfileData),
        avatar_url: userData?.user_metadata?.avatar_url,
        full_name: userData?.user_metadata?.full_name,
        email: userData?.email
      }

      // Get purchased courses
      const { courses: coursesData, error: coursesError } = await getUserCourses(user.value.id)
      if (coursesError) throw coursesError

      purchasedCourses.value = coursesData || []
      store.setPurchasedCourses(coursesData?.map(item => item.courses) || []) // Save to store

      // Get watched lessons
      const { lessons: watched } = await getWatchedLessons(user.value.id)
      watchedLessons.value = watched || []
    }
  } catch (err) {
    console.error('Error fetching profile:', err)
    error.value = 'Error loading profile data. Please try refreshing the page.'
  } finally {
    loading.value = false
  }
})

const calculateProgress = (course: UserCourse['courses']) => {
  if (!course.course_lessons?.length) return 0
  const watchedCount = watchedLessons.value.filter(id => 
    course.course_lessons?.some(lesson => lesson.id === id)
  ).length
  return Math.ceil((watchedCount / course.course_lessons.length) * 100)
}

const handleBillingClick = async () => {
  try {
    if (!user.value?.id) {
      throw new Error('You must be logged in to access billing')
    }

    if (!store.user?.stripe_customer) {
      throw new Error('No customer account found')
    }

    const { data, error: apiError } = await useFetch('/api/billing-portal', {
      method: 'POST',
      body: { 
        userId: user.value.id, 
        customer: store.user.stripe_customer
      }
    })

    if (apiError.value) {
      throw apiError.value
    }

    if (!data.value?.url) {
      throw new Error('No portal URL received')
    }

    loadingMessage.value = 'Redirecting to billing portal...'
    loading.value = true
    // Redirect to Stripe Customer Portal
    window.location.href = data.value.url
  } catch (err) {
    console.error('Error accessing billing portal:', err)
    error.value = err instanceof Error ? err.message : 'Error accessing billing portal. Please try again later.'
  }
}

// Add navigation methods
const navigateToTab = (tab: string) => {
  activeTab.value = tab
}

// Add computed property for completed courses
const completedCourses = computed(() => {
  return purchasedCourses.value
    .filter(item => calculateProgress(item.courses) === 100)
    .map(item => item.courses)
})

const downloadCertificate = async (courseSlug: string) => {
  try {
    loadingMessage.value = 'Generating certificate...'
    loading.value = true
    
    const userName = profile.value?.full_name || user.value?.email
    if (!userName) {
      throw new Error('User name not found')
    }

    const response = await fetch(`/api/certificate?name=${encodeURIComponent(userName)}`)
    if (!response.ok) {
      throw new Error('Failed to generate certificate')
    }
    
    const blob = await response.blob()
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = `certificate-${courseSlug}.png`
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    window.URL.revokeObjectURL(link.href)
  } catch (err) {
    console.error('Error downloading certificate:', err)
    error.value = err instanceof Error ? err.message : 'Failed to download certificate. Please try again.'
  } finally {
    loading.value = false
  }
}
</script> 