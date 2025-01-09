export interface Course {
  id: string
  title: string
  slug: string
  description: string
  price_id: string
  image_url: string
  coming_soon: boolean
  created_at: string
  updated_at: string
}

export type Courses = Course[]