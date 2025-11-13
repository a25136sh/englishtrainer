import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { ElMessage } from 'element-plus'

export const useProblemStore = defineStore('problem', () => {
  const genre = ref('1')
  const index = ref(0)
  const score = ref(80)
  const problems = ref<
    Array<{
      id: number
      genre_id: number
      text: string
      answer_file_path: string
      created_at: string
    }>
  >([])

  const isLast = computed(() => {
    return problems.value.length - 1 == index.value
  })

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
        problems.value = [
          {
            id: 1,
            genre_id: 1,
            text: 'What time was mentioned in the recording?',
            answer_file_path: '/answers/problem_001.mp3',
            created_at: '2025-11-07T15:30:14',
          },
        ]
      })
  }
  const nextProblem = () => {
    index.value += 1
  }
  const clearProblem = () => {
    problems.value = []
  }

  return { genre, index, score, problems, isLast, loadProblem, nextProblem, clearProblem }
})
