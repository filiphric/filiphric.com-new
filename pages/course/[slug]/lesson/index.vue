<template>
  <NuxtLayout>
    <div class="max-w-8xl mx-auto px-4 mt-7">
      <!-- Loading State -->
      <div v-if="loading" class="flex flex-col items-center justify-center min-h-[50vh]">
        <LoaderAnimation />
        <p class="mt-4 text-lg">Loading course content...</p>
      </div>

      <template v-else>
        <!-- Show course title if available -->
        <h1 class="text-5xl font-extrabold md:text-left lg:text-6xl my-7">{{ currentLesson?.video_title || '' }}</h1>

        <!-- Access message when user is not logged in -->
        <div v-if="showAccessAlert" class="w-full p-8 rounded-lg text-center">
          <h2 class="text-2xl font-bold mb-4">Access Required</h2>
          <p class="mb-6 text-lg">Please <NuxtLink to="/login" class="font-extrabold prettyLink">log in</NuxtLink> to access this course content.</p>
          <div class="flex gap-4 justify-center">
            <ActionButton
              :to="`/course/${route.params.slug}`"
              class="border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-black-lighter"
            >
              Go to course page
            </ActionButton>
          </div>
        </div>

        <!-- Main content only shown when user has access -->
        <div v-else class="flex flex-col md:flex-row">
          <!-- Video Player Section (2/3) -->
          <div class="w-full md:w-2/3 bg-ivory-dark dark:bg-black">
            <div class="flex">
              <CoursePlayer 
                :playback-id="currentLesson?.mux_id || ''" 
                @ended="onVideoEnded"
              />
            </div>
          </div>

          <div class="w-full md:w-1/3 bg-ivory-dark dark:bg-black">
            <div class="p-4">
              <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-bold">Course Lessons</h2>
                <div class="flex items-center gap-2">
                  <span class="text-sm">Autoplay</span>
                  <button 
                    @click="toggleAutoplay"
                    :class="[
                      'w-12 h-6 rounded-full transition-colors relative',
                      autoplay ? 'bg-lime' : 'bg-gray-300 dark:bg-gray-700'
                    ]"
                  >
                    <span 
                      :class="[
                        'absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform border-2 border-black',
                        autoplay ? 'translate-x-0.5' : '-translate-x-5'
                      ]"
                    />
                  </button>
                </div>
              </div>
              <div class="space-y-2">
                <div 
                  v-for="lesson in lessons" 
                  :key="lesson.id"
                  :class="[
                    'p-2 cursor-pointer transition-colors',
                    currentLesson?.id === lesson.id 
                      ? 'border-2 border-black bg-white cursor-default dark:text-black' 
                      : 'hover:bg-lime dark:hover:bg-black-lighter'
                  ]"
                  @click="navigateToLesson(lesson.id)"
                >
                  <div class="flex items-center gap-3">
                    <span class="text-sm font-medium">{{ lesson.video_order }}.</span>
                    <div>
                      <h3 class="font-medium">{{ lesson.video_title }}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Description section -->
        <div v-if="!showAccessAlert" class="mt-4">
          <MDC :value="currentLesson?.video_description || ''" tag="article" />
        </div>
      </template>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const user = useSupabaseUser()
const { 
  getCourseIdFromSlug, 
  checkCourseAccess, 
  getCourseLessons,
  autoplay,
  toggleAutoplay,
  getNextLesson
} = useSupabaseCourseLessons()

interface Lesson {
  id: string
  video_title: string
  video_description: string
  video_order: number
  mux_id: string
}

const lessons = ref<Lesson[]>([])
const currentLesson = ref<Lesson | null>(null)
const loading = ref(true)
const error = ref('')
const showAccessAlert = ref(false)

// Fetch course and lessons data
const fetchData = async () => {
  try {
    // Get course ID from slug
    const { course, error: courseError } = await getCourseIdFromSlug(route.params.slug as string)
    if (courseError || !course) throw new Error('Course not found')

    // Check if user has access
    if (!user.value) {
      showAccessAlert.value = true
      return
    }
    
    const { hasAccess, error: accessError } = await checkCourseAccess(course.id, user.value.id)
    if (accessError || !hasAccess) {
      return navigateTo(`/course/${route.params.slug}`)
    }

    // Get lessons
    const { lessons: lessonData, error: lessonsError } = await getCourseLessons(course.id)
    if (lessonsError) throw lessonsError

    lessons.value = lessonData || []

    // Set current lesson
    if (route.query.id) {
      currentLesson.value = lessons.value.find(l => l.id === route.query.id) || lessons.value[0]
    } else {
      currentLesson.value = lessons.value[0]
      // Update URL with first lesson ID
      router.replace({ query: { id: currentLesson.value?.id } })
    }
  } catch (err) {
    console.error('Error fetching course data:', err)
    error.value = 'Error loading course content'
  } finally {
    loading.value = false
  }
}

// Navigate to a specific lesson
const navigateToLesson = (lessonId: string) => {
  router.push({ query: { id: lessonId } })
  currentLesson.value = lessons.value.find(l => l.id === lessonId) || null
}

// Handle video end event
const onVideoEnded = () => {
  if (!autoplay.value || !currentLesson.value) return
  
  const nextLesson = getNextLesson(lessons.value, currentLesson.value.id)
  if (nextLesson) {
    navigateToLesson(nextLesson.id)
  }
}

// Watch for route changes
watch(() => route.params.slug, fetchData, { immediate: true })
</script> 