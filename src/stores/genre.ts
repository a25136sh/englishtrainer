import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGenreStore = defineStore('genre', () => {
  const genres = ref([
    {
      name: 'エンジニア',
      id: 1,
    },
  ])

  return { genres }
})
