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

export type Courses = Course[]