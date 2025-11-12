<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Check, Microphone } from '@element-plus/icons-vue'
import axios from 'axios'

import { useProblemStore } from '@/stores/problem'
import router from '@/router'
import ProgressBox from '@/components/ProgressBox.vue'

const problemStore = useProblemStore()

const text = computed(() => {
  return problemStore.problems[problemStore.index]?.text || ''
})
const recording = ref(false)
const chunks = ref<Blob[]>([])
const recorder = ref<MediaRecorder>()
const analyzing = ref(false)

const micOn = () => {
  recording.value = true
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream) => {
      if (!recorder.value) {
        recorder.value = new MediaRecorder(stream)
        recorder.value.ondataavailable = async (event) => {
          const blob = event.data
          chunks.value.push(blob)
        }
        recorder.value.onstop = async () => {
          const file = new File(chunks.value, '1_1.mp3')

          const params = new FormData()
          params.append('file', file)

          axios
            .post(`${import.meta.env.VITE_API_HOST}/upload`, params)
            .then((response) => {
              console.log(response)
              analyzing.value = true
              ElMessage.info({
                message: '回答を解析中...',
              })
              router.push({ name: 'wait' })
            })
            .catch((err) => {
              ElMessage.error({
                message: '音声ファイルのアップロードに失敗',
              })
              console.log(err)
              recording.value = false
            })
            .finally(() => {
              chunks.value = []
            })
        }
      }
      recorder.value.start(1000)
    })
    .catch((err) => {
      console.log(err)
      ElMessage.error({
        message: 'マイクを許可してください',
      })
      recording.value = false
    })
}

const micOff = () => {
  if (!analyzing.value) recorder.value?.stop()
}
</script>

<template>
  <div style="text-align: center">
    <h3>以下のテキストを読み上げてください</h3>
    <h1>
      <el-skeleton v-if="text == ''" />
      <div class="playfair-display" v-else>
        {{ text }}
      </div>
    </h1>
    <el-divider />
    <el-button circle style="width: 10em; height: 10em">
      <el-icon size="100" v-if="!recording">
        <Microphone @click="micOn" />
      </el-icon>
      <el-icon size="100" v-else>
        <Check @click="micOff" />
      </el-icon>
    </el-button>
    <div class="recording" v-if="recording">●REC</div>
    <ProgressBox />
  </div>
</template>

<style lang="css" scoped>
.recording {
  color: red;
  animation: blink 1s ease-in-out infinite alternate;
}

@keyframes blink {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
