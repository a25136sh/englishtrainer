<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { UserFilled } from '@element-plus/icons-vue'
import { userManager, signOutRedirect } from './oidc'

import router from '@/router'
import { useUserStore } from './stores/user'

const userStore = useUserStore()

const userTab = ref(false)
const isSmartPhone = computed(() => {
  if (window.matchMedia && window.matchMedia('(max-device-width: 640px)').matches) {
    return true
  } else {
    return false
  }
})

const backHome = () => {
  router.push('/')
}
const cognito = async () => {
  await userManager.signinRedirect({
    extraQueryParams: { lang: 'ja' },
  })
}
const signout = async () => {
  localStorage.clear()
  await signOutRedirect()
}
userManager.signinCallback().then((user) => {
  console.log(user)
  userStore.login(String(user?.profile['cognito:username']))
})
onMounted(() => {
  const userName = localStorage.getItem('userName')
  if (userName) userStore.login(userName)
})
</script>

<template>
  <header class="et_header">
    <div class="title" @click="backHome">
      <img class="logo" src="@/assets/logo.png" />
      <span class="wdxl-lubrifont-jp-n-regular">専門職英会話</span>
      <span class="mochiy-pop-p-one-regular" style="margin-top: -6px">トレーナー</span>
    </div>
    <div class="user" @click="userTab = true" style="cursor: pointer">
      <span class="username">{{ userStore.userName }}</span>
      <el-avatar :icon="UserFilled" />
    </div>
  </header>
  <el-divider border-style="dashed" />
  <main>
    <RouterView />
  </main>
  <footer class="et_footer">
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
  <el-drawer v-model="userTab" title="アカウント情報" :size="isSmartPhone ? '80%' : '30%'">
    <div v-if="userStore.userName == 'guest'">
      <span>あなたは現在ログインしていません。</span>
      <div style="margin-top: 1em">
        <el-button @click="cognito" type="primary">ログイン</el-button>
      </div>
    </div>
    <div v-else>
      <span
        >あなたは現在 <b>{{ userStore.userName }}</b> としてログインしています。</span
      >
      <div style="margin-top: 1em">
        <el-button @click="signout" type="danger">ログアウト</el-button>
      </div>
    </div>
  </el-drawer>
</template>
