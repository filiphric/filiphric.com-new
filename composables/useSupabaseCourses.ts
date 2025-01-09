import { useSupabaseClient } from '#imports'
import { useStore } from '~/stores/useStore'
import type { Course } from '~/types/courses'

export const useSupabaseCourses = () => {
  const client = useSupabaseClient()
  const store = useStore()

  const getCourseBySlug = async (slug: string) => {
    const { data, error } = await client
      .from('courses')
      .select('*')
      .eq('slug', slug)
      .single()

    return { course: data as Course | null, error }
  }

  const getUserCourses = async (userId: string) => {
    const { data, error } = await client
      .from('user_courses')
      .select(`
        course_id,
        courses (
          id,
          title,
          slug,
          image_url,
          description
        )
      `)
      .eq('user_id', userId)

    if (!error && data) {
      const courseDetails = data.map(item => item.courses)
      store.setPurchasedCourses(courseDetails)
    }

    return { courses: data, error }
  }

  return {
    getCourseBySlug,
    getUserCourses
  }
} 