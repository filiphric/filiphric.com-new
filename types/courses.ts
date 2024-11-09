export interface CourseItem {
  title: string
  description: string
  slug: string
  image: string
  priceId: string
  comingSoon?: boolean
}

export interface Courses {
  body: Array<CourseItem>
}