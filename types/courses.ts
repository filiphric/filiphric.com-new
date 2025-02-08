export interface Course {
  id: string
  title: string
  url: string
  description: string
  price_id?: string
  image_url: string
  coming_soon: boolean
  created_at?: string
  updated_at?: string
  course_lessons?: {
    id: string
  }[]
  slug?: string
}

export interface CourseReview {
  id: string
  course_id: string
  user_id: string
  rating: number
  review_text: string | null
  is_anonymous: boolean
  created_at: string
  updated_at: string
}

export type Courses = Course[]