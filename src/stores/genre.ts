import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGenreStore = defineStore('genre', () => {
  const genres = ref([
    {
      name: 'アプリケーションエンジニア',
      id: 1,
    },
    {
      name: '医者',
      id: 2,
    },
    {
      name: 'プロジェクトマネージャ',
      id: 3,
    },
  ])

  return { genres }
})
