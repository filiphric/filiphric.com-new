import { useSupabaseClient } from '#imports'

interface CourseReview {
  id: string
  course_id: string
  user_id: string
  rating: number
  review_text: string | null
  is_anonymous: boolean
  created_at: string
  updated_at: string
}

export const useSupabaseReviews = () => {
  const client = useSupabaseClient()

  const getUserReviewForCourse = async (userId: string, courseId: string) => {
    const { data, error } = await client
      .from('course_reviews')
      .select('*')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .maybeSingle()

    // If no review exists, return null without error
    if (!data && !error) {
      return { review: null, error: null }
    }

    return { review: data as CourseReview | null, error }
  }

  const createReview = async (review: Omit<CourseReview, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await client
      .from('course_reviews')
      .insert(review)
      .select()
      .single()

    return { review: data as unknown as CourseReview, error }
  }

  const updateReview = async (reviewId: string, updates: Partial<CourseReview>) => {
    const { data, error } = await client
      .from('course_reviews')
      .update(updates)
      .eq('id', reviewId)
      .select()
      .single()

    return { review: data as unknown as CourseReview, error }
  }

  return {
    getUserReviewForCourse,
    createReview,
    updateReview
  }
} 