<script setup lang="ts">
import router from '@/router'
import { useProblemStore } from '@/stores/problem'

const problemStore = useProblemStore()

const start = () => {
  problemStore.loadProblem()
  router.push({ name: 'try', params: { id: '1' } })
}
</script>

<template>
  <div style="text-align: center">
    <el-button size="large" @click="start">
      <span style="font-size: 32px">学習開始</span>
    </el-button>
  </div>
</template>
