import { defineStore } from 'pinia'
import type { Profile } from '~/types/supabase'
import { useLoadUser } from '~/composables/useLoadUser'

export const useStore = defineStore('store', {
  state: () => ({
    isDark: false,
    user: null as Profile | null
  }),
  actions: {
    setUser(user: Profile | null) {
      this.user = user
    },
    async loadUser() {
      await useLoadUser()
    }
  },
  persist: true
})
