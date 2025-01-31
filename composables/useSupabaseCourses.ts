import { useSupabaseClient } from '#imports'
import { useStore } from '~/stores/useStore'
import type { Course } from '~/types/courses'

interface UserCourseJoin {
  course_id: Course['id']
  courses: Course
}

export const useSupabaseCourses = () => {
  const client = useSupabaseClient()
  const store = useStore()

  const getCourseById = async (id: string) => {
    const { data, error } = await client
      .from('courses')
      .select('*')
      .eq('id', id)
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
          url,
          slug,
          image_url,
          description,
          course_lessons (
            id
          )
        )
      `)
      .eq('user_id', userId) as { data: UserCourseJoin[] | null, error: any }

    if (!error && data) {
      const courseDetails = data.map(item => ({
        ...item.courses,
        lessons: item.courses.course_lessons
      }))
      store.setPurchasedCourses(courseDetails)
    }

    return { courses: data, error }
  }

  return {
    getUserCourses,
    getCourseById
  }
} 