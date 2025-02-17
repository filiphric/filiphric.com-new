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
            :src="profile?.avatar_url || ''" 
            :alt="profile?.full_name || 'User'" 
            class="w-24 h-24 rounded-full"
          >
          <div class="flex flex-col gap-1 justify-center">
            <h1 class="text-4xl font-bold">{{ profile?.full_name }}</h1>
            <div class="flex items-center gap-1">
              <p class="text-gray-500">{{ profile?.email }}</p>
              <p class="text-gray-500 mx-2">|</p>
              <NuxtLink 
                v-if="profile?.github_username"
                :to="`https://github.com/${profile.github_username}`" 
                target="_blank"
                class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-1"
              >
                <IconGithub class="w-4 h-4" />
                <p class="py-1.5">{{ profile.github_username }}</p>
              </NuxtLink>
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <!-- Tabs Navigation -->
          <div class="border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
            <nav class="-mb-px flex space-x-8 min-w-max px-1">
              <button
                @click="navigateToTab('profile')"
                :class="[
                  'py-4 px-1 border-b-2 font-medium text-sm md:text-base whitespace-nowrap',
                  activeTab === 'profile'
                    ? 'border-black text-black dark:border-white dark:text-white'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'
                ]"
              >
                Your Profile
              </button>
              <button
                @click="navigateToTab('courses')"
                :class="[
                  'py-4 px-1 border-b-2 font-medium text-sm md:text-base whitespace-nowrap',
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
                  'py-4 px-1 border-b-2 font-medium text-sm md:text-base whitespace-nowrap',
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
                  'py-4 px-1 border-b-2 font-medium text-sm md:text-base whitespace-nowrap',
                  activeTab === 'certificates'
                    ? 'border-black text-black dark:border-white dark:text-white'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'
                ]"
              >
                Your Certificates
              </button>
              <button
                @click="handleBillingClick"
                class="py-4 px-1 font-medium text-sm md:text-base whitespace-nowrap text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300 flex items-center gap-1"
              >
                Billing & Invoices
                <IconExternalLink class="w-4 h-4" />
              </button>
            </nav>
          </div>

          <!-- Tabs Content -->
          <div v-if="activeTab === 'profile'" class="space-y-6">
            <div class="bg-ivory-dark dark:bg-black-dark p-6 rounded-lg">
              <div class="space-y-5">
                <div class="flex items-center gap-4">
                  <p class="w-32 text-gray-500">Full Name:</p>
                  <div v-if="isEditingName" class="flex items-center gap-2">
                    <input
                      v-model="editedName"
                      type="text"
                      class="border-2 border-black dark:border-black-lightest pr-2 pl-1.5 py-1 dark:bg-black-dark -ml-2 focus:outline-none"
                      :placeholder="profile?.full_name || ''"
                    >
                    <button
                      @click="saveProfileName"
                      class="text-lime hover:text-lime-dark"
                    >
                      Save
                    </button>
                    <button
                      @click="cancelEditName"
                      class="text-gray-500 hover:text-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                  <div v-else class="flex items-center gap-2">
                    <p class="py-1.5">{{ profile?.full_name }}</p>
                    <button
                      @click="startEditName"
                      class="text-gray-500 hover:text-gray-700"
                    >
                      <IconEdit class="ml-4 w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div class="flex items-center gap-4">
                  <p class="w-32 text-gray-500">Email:</p>
                  <p class="py-1.5">{{ profile?.email }}</p>
                </div>
                <div class="flex items-center gap-4">
                  <p class="w-32 text-gray-500">GitHub:</p>
                  <NuxtLink 
                    v-if="profile?.github_username"
                    :to="`https://github.com/${profile.github_username}`" 
                    target="_blank"
                    class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-1"
                  >
                    <IconGithub class="w-4 h-4" />
                    <p class="py-1.5">{{ profile.github_username }}</p>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
          <div v-if="activeTab === 'courses'">
            <div v-if="purchasedCourses?.length" class="grid gap-4">
              <div 
                v-for="item in purchasedCourses" 
                :key="item.course_id"
              >
                <div class="grid sm:grid-cols-2 lg:flex items-center justify-between bg-ivory-dark dark:bg-black-dark p-4 gap-7">
                  <Image 
                    :src="item.courses.image_url" 
                    :alt="item.courses.title"
                    class="w-full lg:w-40 lg:h-40"
                  />
                  <div class="lg:flex lg:gap-7 grid grid-cols-1 gap-7">
                    <div class="flex-1">
                      <h3 class="text-3xl lg:text-2xl font-bold py-7 lg:py-2">{{ item.courses.title }}</h3>
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
                    <div class="flex flex-col gap-2 place-self-center">
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
                      <button
                        @click="openReviewModal(item.courses)"
                        class="text-sm font-bold text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        {{ courseReviews[item.courses.id] ? 'Edit my Review' : 'Add a Review' }}
                      </button>
                    </div>
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
              <div 
                v-if="!profile?.full_name"
                class="bg-amber-200 dark:bg-amber-900 border-l-4 border-amber-500 p-4 mb-4"
              >
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-sm text-amber-700 dark:text-amber-200">
                      Looks like your name is missing from your profile. Please add it so it appears on your certificate.
                    </p>
                  </div>
                </div>
              </div>
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
  <CoursesReviewModal
    v-if="selectedCourse"
    :is-open="showReviewModal"
    :course-id="selectedCourse.id"
    :existing-review="courseReviews[selectedCourse.id]"
    @close="showReviewModal = false"
    @submit="handleReviewSubmit"
  />
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import type { Course } from '~/types/courses'
import type { Profile } from '~/types/supabase'
import type { CourseReview } from '~/types/courses'
import { useSupabaseReviews } from '~/composables/useSupabaseReviews'

const route = useRoute()
const router = useRouter()
const user = useSupabaseUser()
const loading = ref(true)
const error = ref('')
const store = useStore()
const loadingMessage = ref('Loading profile...')
const { getCurrentUser } = useSupabaseAuth()
const { getProfile, updateProfile } = useSupabaseProfile()
const { getUserCourses } = useSupabaseCourses()
const { getWatchedLessons } = useSupabaseWatchedLessons()
const { getUserReviewForCourse, createReview, updateReview } = useSupabaseReviews()

// Set active tab based on URL parameter
const activeTab = computed({
  get: () => (route.query.tab as string) || 'courses',
  set: (value) => {
    router.push({ query: { ...route.query, tab: value } })
  }
})

interface UserCourseJoin {
  course_id: string
  courses: Course
}

interface StoreCourse extends Course {
  slug: string
}

const profile = ref<Profile | null>(null)
const purchasedCourses = ref<UserCourseJoin[]>([])
const watchedLessons = ref<string[]>([])
const showReviewModal = ref(false)
const selectedCourse = ref<Course | null>(null)
const courseReviews = ref<Record<string, CourseReview>>({})

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
      
      if (profileData && userData) {
        profile.value = {
          id: profileData.id,
          email: userData.email || profileData.email,
          first_name: profileData.first_name,
          last_name: profileData.last_name,
          created_at: profileData.created_at,
          updated_at: profileData.updated_at,
          stripe_customer: profileData.stripe_customer,
          avatar_url: userData.user_metadata?.avatar_url || profileData.avatar_url,
          full_name: userData.user_metadata?.full_name || profileData.full_name,
          github_username: userData.user_metadata?.github_username || profileData.github_username
        }
      }

      // Get purchased courses
      const { courses: coursesData, error: coursesError } = await getUserCourses(user.value.id)
      if (coursesError) throw coursesError

      purchasedCourses.value = coursesData || []
      store.setPurchasedCourses(coursesData?.map(item => {
        const urlParts = (item.courses.url || '').split('/')
        return {
          ...item.courses,
          slug: urlParts[urlParts.length - 1] || item.courses.id
        }
      }) || [])

      // Get watched lessons
      const { lessons: watched } = await getWatchedLessons(user.value.id)
      watchedLessons.value = watched || []

      // Load user's reviews for purchased courses
      if (coursesData) {
        for (const item of coursesData) {
          const { review } = await getUserReviewForCourse(user.value.id, item.courses.id)
          if (review) {
            courseReviews.value[item.courses.id] = review
          }
        }
      }
    }
  } catch (err) {
    console.error('Error fetching profile:', err)
    error.value = 'Error loading profile data. Please try refreshing the page.'
  } finally {
    loading.value = false
  }
})

const calculateProgress = (course: UserCourseJoin['courses']) => {
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

const downloadCertificate = async (courseSlug: string | undefined) => {
  if (!courseSlug) return
  
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

const isEditingName = ref(false)
const editedName = ref('')

const startEditName = () => {
  isEditingName.value = true
  editedName.value = profile.value?.full_name || ''
}

const saveProfileName = async () => {
  if (!profile.value?.id || !editedName.value.trim()) return

  try {
    loading.value = true
    const { error: updateError } = await updateProfile(profile.value.id, {
      full_name: editedName.value.trim()
    })

    if (updateError) {
      throw updateError
    }

    profile.value.full_name = editedName.value.trim()
    isEditingName.value = false
  } catch (err) {
    console.error('Error updating profile:', err)
    error.value = err instanceof Error ? err.message : 'Error updating profile. Please try again later.'
  } finally {
    loading.value = false
  }
}

const cancelEditName = () => {
  isEditingName.value = false
  editedName.value = profile.value?.full_name || ''
}

const openReviewModal = (course: Course) => {
  selectedCourse.value = course
  showReviewModal.value = true
}

const handleReviewSubmit = async (reviewData: { rating: number, review_text: string | null, is_anonymous: boolean }) => {
  if (!selectedCourse.value || !user.value) return

  try {
    const existingReview = courseReviews.value[selectedCourse.value.id]
    
    if (existingReview) {
      const { review } = await updateReview(existingReview.id, reviewData)
      if (review) {
        courseReviews.value[selectedCourse.value.id] = review
      }
    } else {
      const { review } = await createReview({
        course_id: selectedCourse.value.id,
        user_id: user.value.id,
        ...reviewData
      })
      if (review) {
        courseReviews.value[selectedCourse.value.id] = review
      }
    }
    showReviewModal.value = false
  } catch (err) {
    console.error('Error submitting review:', err)
    error.value = 'Error submitting review. Please try again.'
  }
}
</script> 