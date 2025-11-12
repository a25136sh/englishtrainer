import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const userId = ref(1)
  const username = ref('guest')

  return { userId, username }
})
