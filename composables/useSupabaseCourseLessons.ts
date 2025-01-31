import { useSupabaseClient } from '#imports'

interface Lesson {
  id: string
  video_title: string
  video_description: string
  video_order: number
  mux_id: string
}

interface Course {
  id: string
}

export const useSupabaseCourseLessons = () => {
  const client = useSupabaseClient()
  const autoplay = ref(false)

  const toggleAutoplay = () => {
    autoplay.value = !autoplay.value
  }

  const getNextLesson = (lessons: Lesson[], currentLessonId: string) => {
    const currentIndex = lessons.findIndex(lesson => lesson.id === currentLessonId)
    return currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null
  }

  const getCourseIdFromSlug = async (slug: string) => {
    const { data: course, error } = await client
      .from('courses')
      .select('id')
      .eq('slug', slug)
      .single()

    return { course: course as Course | null, error }
  }

  const checkCourseAccess = async (courseId: string, userId: string) => {
    const { count, error } = await client
      .from('user_courses')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('course_id', courseId)

    return { hasAccess: count !== 0, error }
  }

  const getCourseLessons = async (courseId: string) => {
    const { data: lessons, error } = await client
      .from('course_lessons')
      .select('*')
      .eq('course_id', courseId)
      .order('video_order')

    return { lessons: lessons as Lesson[] | null, error }
  }

  return {
    getCourseIdFromSlug,
    checkCourseAccess,
    getCourseLessons,
    autoplay,
    toggleAutoplay,
    getNextLesson
  }
} 