<script setup lang="ts">
import { computed } from 'vue'
import { Tickets } from '@element-plus/icons-vue'

import router from '@/router'
import { useProblemStore } from '@/stores/problem'

const problemStore = useProblemStore()

const genre = computed(() => problemStore.genre)

const start = () => {
  problemStore.loadProblem()
  router.push({ name: 'try', params: { id: '1' } })
}
</script>

<template>
  <div style="text-align: center">
    <div style="display: flex; justify-content: space-around">
      <div>
        <h4>職種選択</h4>
        <el-radio-group v-model="genre">
          <el-radio value="1" size="large" border>エンジニア</el-radio>
        </el-radio-group>
        <div>
          <el-button size="large" @click="start" style="margin-top: 2em; padding: 3em 2em">
            <el-icon size="30"><Tickets /></el-icon>
            <span style="font-size: 32px">学習開始</span>
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
