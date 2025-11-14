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
  axios
    .get(
      `${import.meta.env.VITE_API_HOST}/problems/${problemStore.index + 1}/result?user_id=${userStore.userId}`,
    )
    .then((response) => {
      problemStore.score = response.data.score
      problemStore.try_file_path = response.data.try_file_path
      router.push({ name: 'result' })
    })
    .catch((error) => {
      if (error.response.status == 404) {
        setTimeout(pollingResult, 700)
      } else {
        ElMessage.error({
          message: '問題の取得に失敗しました',
        })
      }
    })
}

onMounted(() => {
  setTimeout(pollingResult, 700)
})
</script>

<template>
  <div style="text-align: center">
    <h3>しばらくお待ちください...</h3>
  </div>
</template>

<style scoped></style>
