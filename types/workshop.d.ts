export interface Workshop {
  body: WorkshopItem[]
}

export interface WorkshopItem {
  title: string
  description: string
  slug: string
  image: string
  startDate: string
  date: string
  time: string
  days: string
  type?: string
  priceId?: string
} 