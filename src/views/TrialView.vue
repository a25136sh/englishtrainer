<script setup lang="ts">
import { ref } from 'vue'
import { Microphone, Tools } from '@element-plus/icons-vue'

const difficulty = ref(Math.floor(Math.random() * 5))
const text = ref(
  'In order to increase the number of examines for the information architecture course, I think it is important to reach out more to the developer community. Specifically, I think possible to increase the number of potentialncreasing opportunities to get to know, such as sponsoring language conferences.',
)
</script>

<template>
  <div style="text-align: center">
    <h3>以下のテキストを読み上げてください</h3>
    <h1>
      <el-skeleton v-if="text == ''" />
      <div class="playfair-display">
        {{ text }}
      </div>
    </h1>
    <el-divider />
    <el-button circle style="width: 10em; height: 10em">
      <el-icon size="100"><Microphone /></el-icon>
    </el-button>
    <div class="property">
      <div style="margin-bottom: 1em; background: #555; padding: 0.5em 0; color: #fff">
        <span>ジャンル:</span>
        <strong>
          エンジニア
          <el-icon><Tools /></el-icon>
        </strong>
      </div>
      <el-progress :percentage="100" :format="() => '1/1'" style="margin: 0 1em" />
      難易度: <el-rate v-model="difficulty" disabled size="small" />
    </div>
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
