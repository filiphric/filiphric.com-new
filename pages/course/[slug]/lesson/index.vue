<template>
  <NuxtLayout>
    <div class="max-w-8xl mx-auto px-4 mt-7">
      <!-- Loading State -->
      <div v-if="loading" class="flex flex-col items-center justify-center min-h-[50vh]">
        <LoaderAnimation />
        <p class="mt-4 text-lg">Loading course content...</p>
      </div>

      <template v-else>
 

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
        <div v-else class="flex flex-col md:flex-row border-2 border-black shadow-block-tangerine">
          <!-- Video Player Section (2/3) -->
          <div class="w-full md:w-2/3 bg-ivory-dark dark:bg-black">
            <div class="flex">
              <CoursePlayer 
                :playback-id="currentLesson?.mux_id || ''" 
                :lesson-id="currentLesson?.id || ''"
                @ended="onVideoEnded"
                @lessonWatched="onLessonWatched"
              />
            </div>
          </div>

          <div class="w-full md:w-1/3 bg-ivory-dark dark:bg-black">
            <div>
              <div class="flex justify-between items-center mb-4 bg-white w-full h-full p-4 dark:bg-black-lighter">
                <div>
                  <h2 class="text-xl font-bold">{{ courseTitle }}</h2>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    {{ watchedPercentage }}% complete
                  </p>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-sm">Autoplay</span>
                  <button 
                    @click="toggleAutoplay"
                    :class="[
                      'w-12 h-6 rounded-full transition-colors relative block',
                      autoplay ? 'bg-lime' : 'bg-gray-200 dark:bg-gray-400'
                    ]"
                  >
                    <span 
                      :class="[
                        'absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform border-2 border-black',
                        autoplay ? 'translate-x-0' : '-translate-x-5'
                      ]"
                    />
                  </button>
                </div>
              </div>
              <div>
                <div 
                  v-for="lesson in lessons" 
                  :key="lesson.id"
                  :class="[
                    'py-2 px-4 cursor-pointer transition-colors',
                    currentLesson?.id === lesson.id 
                      ? 'border-y-2 border-black bg-white dark:bg-white cursor-default dark:text-black' 
                      : 'dark:hover:bg-black-lighter hover:bg-lime group course-item'
                  ]"
                  @click="navigateToLesson(lesson.id)"
                >
                  <div class="flex items-center gap-3">
                    <span v-if="watchedLessons.includes(lesson.id)" class="text-lime group-hover:text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </span>
                    <span v-else class="text-sm font-medium h-5 w-5 flex items-center justify-center">{{ lesson.video_order }}.</span>
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

const { getCourseById } = useSupabaseCourses()
const { getWatchedLessons } = useSupabaseWatchedLessons()

// Add computed property for watched percentage
const watchedPercentage = computed(() => {
  if (!lessons.value.length) return 0
  const watchedCount = watchedLessons.value.length
  const totalLessons = lessons.value.length
  return Math.ceil((watchedCount / totalLessons) * 100)
})

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
const courseTitle = ref('')
const watchedLessons = ref<string[]>([])

// Fetch course and lessons data
const fetchData = async () => {
  try {
    loading.value = true
    // Get course ID from slug
    const { course, error: courseError } = await getCourseIdFromSlug(route.params.slug as string)
    if (courseError || !course) throw new Error('Course not found')

    // Get course title
    const { course: courseData } = await getCourseById(course.id)
    courseTitle.value = courseData?.title || ''

    // Check if user has access
    if (!user.value) {
      showAccessAlert.value = true
      return
    }

    const { hasAccess, error: accessError } = await checkCourseAccess(course.id, user.value.id)
    if (accessError) throw accessError

    if (!hasAccess) {
      showAccessAlert.value = true
      return
    }

    // Get lessons
    const { lessons: lessonsData, error: lessonsError } = await getCourseLessons(course.id)
    if (lessonsError) throw lessonsError

    lessons.value = lessonsData || []

    // Get watched lessons
    if (user.value) {
      const { lessons: watched } = await getWatchedLessons(user.value.id)
      watchedLessons.value = watched
    }

    // Set current lesson
    const lessonId = route.query.id as string
    if (lessonId) {
      currentLesson.value = lessons.value.find(l => l.id === lessonId) || lessons.value[0]
    } else {
      currentLesson.value = lessons.value[0]
    }

  } catch (err) {
    console.error('Error fetching course data:', err)
    error.value = 'Error loading course data. Please try refreshing the page.'
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

const onLessonWatched = (lessonId: string) => {
  if (!watchedLessons.value.includes(lessonId)) {
    watchedLessons.value = [...watchedLessons.value, lessonId]
  }
}

// Watch for route changes
watch(() => route.params.slug, fetchData, { immediate: true })
</script> 