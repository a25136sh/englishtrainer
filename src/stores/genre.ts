import { ref } from 'vue'
import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import axios from 'axios'

interface GenreType {
  id: number
  name: string
  display_name: string
  created_at: string
}

export const useGenreStore = defineStore('genre', () => {
  const genres = ref<Array<GenreType>>([])

  const loadGenre = () => {
    axios
      .get(`${import.meta.env.VITE_API_HOST}/genres`)
      .then((response) => {
        console.log(response.data)
        genres.value = response.data.genres
      })
      .catch((error) => {
        ElMessage.error({
          message: '職種の取得に失敗しました',
        })
        console.error(error)
        genres.value = [
          {
            id: 1,
            name: 'backend_engineer',
            display_name: 'Backend Engineer',
            created_at: '2025-11-07T15:29:10',
          },
        ]
      })
  }

  return { genres, loadGenre }
})
