import { defineStore } from 'pinia'
import type { Profile } from '~/types/supabase'
import type { Course } from '~/types/courses'
import { useLoadUser } from '~/composables/useLoadUser'

interface StoreCourse extends Course {
  slug: string
}

export const useStore = defineStore('store', {
  state: () => ({
    isDark: false,
    user: null as Profile | null,
    purchasedCourses: [] as StoreCourse[]
  }),
  actions: {
    setUser(user: Profile | null) {
      this.user = user
    },
    setPurchasedCourses(courses: StoreCourse[]) {
      this.purchasedCourses = courses
    },
    async loadUser() {
      await useLoadUser()
    },
    persist: true
  }
})
