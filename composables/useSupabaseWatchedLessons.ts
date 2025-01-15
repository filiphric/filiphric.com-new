import { useSupabaseClient } from '#imports'

interface WatchedLesson {
  id: string
  user_id: string
  lesson_id: string
  watched_at: string
}

interface Database {
  public: {
    Tables: {
      watched_lessons: {
        Row: WatchedLesson
        Insert: Omit<WatchedLesson, 'id' | 'watched_at'>
        Update: Partial<WatchedLesson>
      }
    }
  }
}

export const useSupabaseWatchedLessons = () => {
  const supabase = useSupabaseClient<Database>()

  const getWatchedLessons = async (userId: string) => {
    try {
      const { data: lessons, error } = await supabase
        .from('watched_lessons')
        .select('lesson_id')
        .eq('user_id', userId)

      if (error) {
        throw error
      }

      return {
        lessons: lessons?.map(l => l.lesson_id) || [],
        error: null
      }
    } catch (error: any) {
      console.error('Error fetching watched lessons:', error.message)
      return {
        lessons: [],
        error
      }
    }
  }

  const markLessonAsWatched = async (userId: string, lessonId: string) => {
    try {
      const { data, error } = await supabase
        .from('watched_lessons')
        .upsert({
          user_id: userId,
          lesson_id: lessonId
        })
        .select()
        .single()

      if (error) {
        throw error
      }

      return {
        watchedLesson: data,
        error: null
      }
    } catch (error: any) {
      console.error('Error marking lesson as watched:', error.message)
      return {
        watchedLesson: null,
        error
      }
    }
  }

  return {
    getWatchedLessons,
    markLessonAsWatched
  }
} 