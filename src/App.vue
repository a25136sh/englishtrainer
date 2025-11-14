<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { RouterView } from 'vue-router'
import { UserFilled } from '@element-plus/icons-vue'

import router from '@/router'
import { useUserStore } from './stores/user'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()

const userTab = ref(false)
const form = reactive({
  id: '',
  name: '',
  password: '',
})
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
const onSubmit = () => {
  userTab.value = false
  ElMessage.success({
    message: 'ログイン完了',
  })
  userStore.userId = Number(form.id)
  userStore.username = form.name
}
const cancel = () => {
  form.id = ''
  form.name = ''
  form.password = ''
  userTab.value = false
}
</script>

<template>
  <header class="et_header">
    <div class="title" @click="backHome">
      <img class="logo" src="@/assets/logo.png" />
      <span class="wdxl-lubrifont-jp-n-regular">専門職英会話</span>
      <span class="mochiy-pop-p-one-regular" style="margin-top: -6px">トレーナー</span>
    </div>
    <div class="user" @click="userTab = true" style="cursor: pointer">
      <span class="username">{{ userStore.username }}</span>
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
    <div v-if="userStore.username == 'guest'">
      <span>あなたは現在ログインしていません。</span>
      <el-form :model="form" label-width="auto" style="max-width: 600px; margin-top: 2em">
        <el-form-item label="ユーザーID">
          <el-input v-model="form.id" />
        </el-form-item>
        <el-form-item label="ユーザー名">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="パスワード">
          <el-input type="password" v-model="form.password" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
            :disabled="form.id == '' || form.name == '' || form.password == ''"
            >ログイン</el-button
          >
          <el-button @click="cancel">キャンセル</el-button>
        </el-form-item>
      </el-form>
    </div>
    <span v-else
      >あなたは現在 <b>{{ userStore.username }}</b> としてログインしています。</span
    >
  </el-drawer>
</template>
