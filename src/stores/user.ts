import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { ElMessage } from 'element-plus'

export const useUserStore = defineStore('user', () => {
  const userId = ref(1)
  const userName = ref<string>('guest')

  const login = (username: string) => {
    axios
      .post(`${import.meta.env.VITE_API_HOST}/login`, {
        username: username,
      })
      .then((response) => {
        console.log(response.data)
        userId.value = parseInt(response.data.user_id)
        userName.value = response.data.username
        localStorage.setItem('userName', response.data.username)
        ElMessage.success({
          message: 'ログイン完了',
        })
      })
      .catch((error) => {
        console.log(error)
        ElMessage.error({
          message: 'ログイン失敗',
        })
      })
  }

  const logout = () => {
    userId.value = 1
    userName.value = 'guest'
    ElMessage.info({
      message: 'ログアウトしました',
    })
  }

  return { userId, userName, login, logout }
})
