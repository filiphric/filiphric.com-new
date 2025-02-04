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
        <div v-else class="grid md:grid-cols-3 border-2 border-black shadow-block-tangerine mt-10 mx-7 md:mx-0">
          <!-- Video Player Section (2/3) -->
          <div class="col-span-3 md:col-span-2 bg-ivory-dark dark:bg-black aspect-video flex place-content-center">
            <CoursePlayer 
              :playback-id="currentLesson?.mux_id || ''" 
              :lesson-id="currentLesson?.id || ''"
              :autoplay="autoplay"
              @ended="onVideoEnded"
              @lessonWatched="onLessonWatched"
            />
          </div>

          <!-- Lesson List Section (1/3) -->
          <div class="bg-ivory-dark dark:bg-black md:w-full md:aspect-[8/9] md:h-full col-span-3 md:col-span-1 max-h-96 md:max-h-none border-l-2 border-black">
            <div class="h-full w-full grid grid-rows-[auto_1fr]">
              <div class="bg-white w-full py-4 pl-4 pr-3 dark:bg-black-lighter grid grid-cols-2 content-between border-b-2 border-black">
                <div>
                  <h2 class="text-lg font-bold">{{ courseTitle }}</h2>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    <NuxtLink 
                      v-if="watchedPercentage === 100"
                      to="/profile?tab=certificates"
                      class="font-bold bg-lime text-white rounded-md px-1.5 py-0.5 mt-1 dark:hover:underline inline-block"
                    >
                      Certificate available
                    </NuxtLink>
                    <div v-else>
                      {{ watchedPercentage }}% complete
                    </div>
                  </p>
                </div>
                <div class="flex items-center gap-2 justify-self-end">
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
              <div class="overflow-y-auto" ref="lessonsContainer">
                <div 
                  v-for="lesson in lessons" 
                  :key="lesson.id"
                  :data-lesson-id="lesson.id"
                  :class="[
                    'py-1 px-4 cursor-pointer transition-colors text-sm min-h-10 flex',
                    currentLesson?.id === lesson.id 
                      ? 'border-y-2 border-black bg-white dark:bg-white cursor-default dark:text-black' 
                      : 'dark:hover:bg-black-lighter hover:bg-lime group course-item'
                  ]"
                  @click="navigateToLesson(lesson.id)"
                >
                  <div class="flex items-center gap-3">
                    <span v-if="watchedLessons.includes(lesson.id)" class="text-lime group-hover:text-white">
                      <IconCheckmarkRound class="w-4 h-4 fill-lime dark:group-hover:fill-lime group-hover:fill-black" />
                    </span>
                    <span v-else class="text-sm font-medium h-4 w-4 flex items-center justify-center">{{ lesson.video_order }}.</span>
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
        <div v-if="!showAccessAlert" class="mt-14">
          <!-- Show course title if available -->
          <h1 class="text-5xl font-extrabold md:text-left lg:text-6xl my-7">{{ currentLesson?.video_title || '' }}</h1>
          <Suspense>
            <MDC
              :key="currentLesson?.id"
              :value="currentLesson?.video_description || ''"
              tag="article"
            />
          </Suspense>
          <hr class="pt-7" />
          <div class="text-sm text-right">Found a problem? <NuxtLink to="https://discord.gg/6c2BqtWHsp" class="font-bold prettyLink cursor-pointer">Please contact me on Discord <IconDiscord class="w-6 h-6 inline-block ml-1 pb-1"/></NuxtLink></div>
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
const lessonsContainer = ref<HTMLElement | null>(null)

// Function to scroll to active lesson
const scrollToActiveLesson = () => {
  if (!lessonsContainer.value) return
  
  const lessonId = route.query.id as string
  if (!lessonId) return

  const activeLessonElement = lessonsContainer.value.querySelector(`[data-lesson-id="${lessonId}"]`)
  if (activeLessonElement) {
    const containerTop = lessonsContainer.value.getBoundingClientRect().top
    const elementTop = (activeLessonElement as HTMLElement).getBoundingClientRect().top
    const scrollOffset = elementTop - containerTop
    lessonsContainer.value.scrollTop = scrollOffset
  }
}

// Watch for both loading state and container existence
watch([loading, lessonsContainer], ([isLoading, container]) => {
  if (!isLoading && container) {
    nextTick(scrollToActiveLesson)
  }
}, { immediate: true })

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