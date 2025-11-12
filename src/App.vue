<script setup lang="ts">
import router from '@/router'
import { RouterView } from 'vue-router'
import { UserFilled } from '@element-plus/icons-vue'
import { useUserStore } from './stores/user'

const userStore = useUserStore()

const backHome = () => {
  router.push('/')
}
</script>

<template>
  <header>
    <div class="title" @click="backHome">
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
  <footer>
    <div><b>Group 3</b></div>
    <div>
      <a href="https://github.com/a25136sh/englishtrainer"
        >https://github.com/a25136sh/englishtrainer</a
      >
    </div>
    <div>
      <a href="https://github.com/iwashi623/genred_english"
        >https://github.com/iwashi623/genred_english</a
      >
    </div>
  </footer>
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

.title img {
  cursor: pointer;
}

.title span {
  cursor: pointer;
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
