import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => ({
    isDark: false
  })
})
