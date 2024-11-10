export interface InternalCourseItem {
  title: string
  description: string
  slug: string
  image: string
  priceId: string
  comingSoon?: boolean
}

export interface ExternalCourseItem {
  title: string
  description: string
  image: string
  url: string
  external: true
}

export type CourseItem = InternalCourseItem | ExternalCourseItem

export interface Courses {
  body: Array<InternalCourseItem>
}

export interface ExternalCourses {
  body: Array<ExternalCourseItem>
}