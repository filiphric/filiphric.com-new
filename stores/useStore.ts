import { defineStore } from 'pinia'
import type { Profile } from '~/types/supabase'
import { useLoadUser } from '~/composables/useLoadUser'

interface UserCourse {
  id: string
  title: string
  slug: string
  image_url: string
  description: string
}

export const useStore = defineStore('store', {
  state: () => ({
    isDark: false,
    user: null as Profile | null,
    purchasedCourses: [] as UserCourse[]
  }),
  actions: {
    setUser(user: Profile | null) {
      this.user = user
    },
    setPurchasedCourses(courses: UserCourse[]) {
      this.purchasedCourses = courses
    },
    async loadUser() {
      await useLoadUser()
    },
    persist: true
  }
})
