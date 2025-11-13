<script setup lang="ts">
import { Tickets } from '@element-plus/icons-vue'

import router from '@/router'
import { useGenreStore } from '@/stores/genre'
import { useProblemStore } from '@/stores/problem'

const genreStore = useGenreStore()
const problemStore = useProblemStore()

const ranking = [
  {
    user: 'Tom',
    score: 80,
  },
  {
    user: 'Nabe',
    score: 70,
  },
  {
    user: 'Bob',
    score: 70,
  },
  {
    user: 'Alice',
    score: 65,
  },
  {
    user: 'Carol',
    score: 60,
  },
  {
    user: 'Kretos',
    score: 20,
  },
]

const start = () => {
  problemStore.clearProblem()
  problemStore.loadProblem()
  router.push({ name: 'try', params: { id: problemStore.genre } })
}
</script>

<template>
  <div style="text-align: center">
    <div style="display: flex; justify-content: space-around">
      <div>
        <h4>職種選択</h4>
        <el-radio-group v-model="problemStore.genre">
          <el-radio
            :value="`${genre.id}`"
            size="large"
            v-for="genre in genreStore.genres"
            :key="genre.id"
            border
            >{{ genre.name }}</el-radio
          >
        </el-radio-group>
        <div>
          <el-button size="large" @click="start" style="margin-top: 2em; padding: 3em 2em">
            <el-icon size="30"><Tickets /></el-icon>
            <span style="font-size: 32px">学習開始</span>
          </el-button>
        </div>
      </div>
    </div>
    <div style="display: flex; justify-content: space-around">
      <div style="width: 320px; margin-top: 1em">
        <h4>スコアランキング</h4>
        <el-table :data="ranking" style="width: 320px">
          <el-table-column prop="user" label="ユーザー名" />
          <el-table-column prop="score" label="スコア" width="100" />
        </el-table>
      </div>
    </div>
  </div>
</template>
