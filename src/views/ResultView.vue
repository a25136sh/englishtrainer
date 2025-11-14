<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import router from '@/router'
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

const pushNext = () => {
  problemStore.nextProblem()
  router.push({ name: 'try', params: { id: problemStore.genre } })
}

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
    <h4>あなたの音声</h4>
    <audio
      controls
      :src="`https://s3.ap-northeast-1.amazonaws.com/${problemStore.try_file_path.slice(5)}`"
    />
    <h4>正解の音声</h4>
    <audio
      controls
      src="https://70f45ec6-38a9-4685-abe4-cc5b076ed4e6.mdnplay.dev/shared-assets/audio/t-rex-roar.mp3"
    />
    <div class="control">
      <el-button size="large" v-if="problemStore.isLast">終了</el-button>
      <el-button size="large" @click="pushNext" v-else>次へ</el-button>
    </div>
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
.control {
  margin-top: 1em;
}
</style>
