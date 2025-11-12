<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { useProblemStore } from '@/stores/problem'
import ProgressBox from '@/components/ProgressBox.vue'

const problemStore = useProblemStore()

const score = ref(0)
const review = computed(() => {
  if (score.value < 20) {
    return 'まだまだだね'
  } else if (score.value < 50) {
    return 'もうちょっと'
  } else if (score.value < 90) {
    return 'よく出来たね'
  } else {
    return '完璧！'
  }
})

onMounted(() => {
  setTimeout(() => {
    score.value = problemStore.score
  }, 0)
})
</script>

<template>
  <div style="text-align: center">
    <h2>回答結果</h2>
    <el-progress type="dashboard" :percentage="score">
      <template #default="{ percentage }">
        <span class="percentage-value">{{ percentage }}</span>
        <span class="percentage-label">{{ review }}</span>
      </template>
    </el-progress>
    <ProgressBox />
  </div>
</template>

<style scoped>
.percentage-value {
  display: block;
  font-size: 60px;
}
.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 12px;
}
</style>
