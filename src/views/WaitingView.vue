<script setup lang="ts">
import axios from 'axios'
import { onMounted } from 'vue'
import { ElMessage } from 'element-plus'

import router from '@/router'
import { useUserStore } from '@/stores/user'
import { useProblemStore } from '@/stores/problem'

const userStore = useUserStore()
const problemStore = useProblemStore()

const pollingResult = () => {
  const problemId = problemStore.problems[problemStore.index]?.id
  axios
    .get(
      `${import.meta.env.VITE_API_HOST}/problems/${problemId}/result?user_id=${userStore.userId}`,
    )
    .then((response) => {
      if (new Date(`${response.data.created_at}Z`) > new Date(problemStore.lastTryTime)) {
        problemStore.score = response.data.score
        problemStore.tryFilePath = response.data.try_file_path
        console.log(response.data)
        router.push({ name: 'result' })
      } else {
        console.log(`Try: ${problemStore.lastTryTime}`)
        console.log(`Get: ${response.data.created_at}`)
        setTimeout(pollingResult, 1000)
      }
    })
    .catch((error) => {
      if (error.response.status == 404) {
        setTimeout(pollingResult, 1000)
      } else {
        ElMessage.error({
          message: '問題の取得に失敗しました',
        })
      }
    })
}

onMounted(() => {
  setTimeout(pollingResult, 1000)
})
</script>

<template>
  <div style="text-align: center">
    <h3>しばらくお待ちください...</h3>
  </div>
</template>

<style scoped></style>
