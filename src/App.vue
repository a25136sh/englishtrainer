<script setup lang="ts">
import { RouterView } from 'vue-router'
import { UserFilled } from '@element-plus/icons-vue'
import { useUserStore } from './stores/user'

const userStore = useUserStore()
</script>

<template>
  <header>
    <div class="title">
      <img class="logo" src="@/assets/logo.png" />
      <span class="wdxl-lubrifont-jp-n-regular">専門職英会話</span>
      <span class="mochiy-pop-p-one-regular" style="margin-top: -6px">トレーナー</span>
    </div>
    <div class="user">
      <span class="username">{{ userStore.username }}</span>
      <el-avatar :icon="UserFilled" />
    </div>
  </header>
  <el-divider border-style="dashed" />
  <main>
    <RouterView />
  </main>
  <footer>Group 3</footer>
</template>

<style scoped>
header {
  line-height: 1.5;
  background: #323e56;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: -1em 3em -1.5em 2em;
}

.logo {
  display: block;
  width: 100px;
  height: 100px;
  margin-right: 0.5em;
}

.title {
  color: #fff;
  font-size: 2em;
  display: flex;
  align-items: center;
}

.user {
  float: right;
}

.username {
  margin-right: 1em;
  color: #fff;
}

footer {
  text-align: center;
  color: #fff;
  margin-top: 1em;
}
</style>
