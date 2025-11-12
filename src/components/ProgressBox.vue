<script setup lang="ts">
import { ref } from 'vue'
import { Tools } from '@element-plus/icons-vue'

import { useProblemStore } from '@/stores/problem'

const problemStore = useProblemStore()

const difficulty = ref(Math.floor(Math.random() * 5))
</script>

<template>
  <div class="property">
    <div style="margin-bottom: 1em; background: #555; padding: 0.5em 0; color: #fff">
      <span>ジャンル:</span>
      <strong>
        エンジニア
        <el-icon><Tools /></el-icon>
      </strong>
    </div>
    <el-progress
      :percentage="(1 / problemStore.problems.length) * 100"
      :format="() => `1/${problemStore.problems.length}`"
      style="margin: 0 1em"
    />
    難易度: <el-rate v-model="difficulty" disabled size="small" />
  </div>
</template>

<style scoped>
.property {
  margin: 2em auto 0;
  width: 300px;
  border: 1px solid #444;
  padding: 0 0 1em 0;
}
</style>
