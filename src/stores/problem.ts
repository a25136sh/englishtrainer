import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { ElMessage } from 'element-plus'

export const useProblemStore = defineStore('problem', () => {
  const genre = ref('1')
  const index = ref(0)
  const problems = ref([
    {
      id: 1,
      genre_id: 1,
      text: 'What time was mentioned in the recording?',
      answer_file_path: '/answers/problem_001.mp3',
      created_at: '2025-11-07T15:30:14',
    },
  ])
  const loadProblem = () => {
    axios
      .get(`${import.meta.env.VITE_API_HOST}/problems`)
      .then((response) => {
        console.log(response.data)
        problems.value = response.data.problems
      })
      .catch((error) => {
        ElMessage.error({
          message: '問題の取得に失敗しました',
        })
        console.error(error)
      })
  }

  return { genre, index, problems, loadProblem }
})
