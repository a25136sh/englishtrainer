<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

import router from '@/router'
import { useUserStore } from '@/stores/user'
import { useProblemStore } from '@/stores/problem'

const userStore = useUserStore()
const problemStore = useProblemStore()

const poll = ref(0)
const trivias: Map<string, Array<string>> = new Map([
  [
    '1',
    [
      '“Backend” は元々鉄道の用語でした。19世紀のアメリカ鉄道で、列車の後ろ側（後部車両）を “back end”、前側を “front end” と呼んでいたのが起源です。',
      '“Serverless” は実はサーバーがないわけではありません。実際は “server-less management”（サーバー管理が少ない）という意味。AWSのマーケティングが強すぎて誤解を生んだネタです。',
      '“Race Condition” の語源は競馬です。複数の馬（スレッド）が同時にゴール（共有リソース）に突っ込むイメージから。',
      '“Microservices” という言葉は2011年にドイツのワークショップで初めて登場しましたが、流行らせたのはNetflixとAmazonです。',
      '“Garbage Collection” は実はマーク・トウェインの小説から、記憶領域の「ゴミ集め」という比喩が大ウケしてそのまま定着しました。',
    ],
  ],
  [
    '2',
    [
      '“Phishing” の綴りは電話回線を不正利用する行為を “phreaking” と書いたハッカーが、釣り（fishing）を真似して “phishing” と綴ったのが起源です。',
      '“Honeypot” は攻撃者を誘い込むシステムを「クマが蜂蜜に釣られるように」という意味で名付けたものです。',
      '“Exploit” はフランス語の “exploit”（偉大な行為）から来ていて、元々は英雄的な意味です。',
      '“Rainbow Table” は2003年に作った人が「色々なハッシュが虹の色みたいに並ぶ」と冗談で名付けたら定着しました。',
      '“Bug”（バグ）の語源は本当に蛾（moth）で、ハーバード大学のコンピュータが故障した原因を調べたらリレーの中に本物の蛾が挟まっていたことが由来。',
    ],
  ],
  [
    '3',
    [
      '客を待たせるとき単に “Hold on” と言うと失礼ですが、“May I～?” を入れるだけで顧客のイライラが20%減るという研究結果があります。',
      '紀元前3000年頃の古代エジプトの粘土板に「お客さんのクレーム対応記録」が残っています。内容は「届いた銅の品質が悪いので返金して！」というもの。',
      'サポート界隈では「激おこユーザー」のことを “irate”（アイレート）と呼びます。ラテン語で「怒り狂った」という意味の古い言葉です。',
      '「顧客は常に正しい」という有名なフレーズを生んだのはロンドンのデパート「Selfridges」の創業者でした。',
      '“Escalation” は「エスカレーター」と同じ語源で、ラテン語の “scala”（階段）から来ています。',
    ],
  ],
  [
    '4',
    [
      '世界一有名なセールスエンジニアはスティーブ・ジョブズです。彼はNeXT時代に自分で顧客企業にデモをしに行っていました。',
      '“Chalk Talk” は昔のセールスエンジニアが顧客の会議室で黒板にアーキテクチャ図をガンガン描きながら説明していたことから生まれた言葉です。',
      '英語圏のSEコミュニティで、デモが神がかり的に上手い人を本当に “Demo God” と呼びます。',
      '“Sandbagging” はセールスでわざと見積もりを低く言って追加料金をせしめる行為。ギャングが砂袋（sandbag）で人を殴っていた犯罪スラングが由来。',
      '昔のSunでは、めちゃくちゃ失礼な顧客には社内で「Bozo Bit」（ボゾ＝ピエロ、つまりバカの意味）を立てて、全員で要注意扱いにしてました。',
    ],
  ],
  [
    '5',
    [
      '“PM” は元々1800年代のイギリス海軍で造船プロジェクトの責任者を指していました。',
      '“Gantt Chart” の発明は当時は誰も注目せず、第二次世界大戦でようやく爆発的に広まりました。',
      '“Critical Path（クリティカルパス）” はDuPontの化学工場建設で「これが遅れたら全部遅れる道筋」を計算するために発明されました。',
      '“The Project Manager’s Prayer” という有名な祈りが英語圏のPMコミュニティに古くから伝わっています。',
      '“Parkinson’s Law” は歴史学者が発表した「仕事は与えられた時間いっぱいまで膨張する」という法則。締切を甘くすると絶対に遅れる理由です。',
    ],
  ],
])

const pollingResult = () => {
  poll.value += 1
  const problemId = problemStore.problems[problemStore.index]?.id
  axios
    .get(
      `${import.meta.env.VITE_API_HOST}/problems/${problemId}/result?user_id=${userStore.userId}`,
    )
    .then((response) => {
      if (new Date(`${response.data.created_at}Z`) > new Date(problemStore.lastTryTime)) {
        problemStore.score = response.data.score
        problemStore.tryFilePath = response.data.try_file_path
        console.log(response.data)
        router.push({ name: 'result' })
      } else {
        console.log(`Try: ${problemStore.lastTryTime}`)
        console.log(`Get: ${response.data.created_at}`)
        setTimeout(pollingResult, 1000)
      }
    })
    .catch((error) => {
      if (error.response.status == 404) {
        setTimeout(pollingResult, 1000)
      } else {
        ElMessage.error({
          message: '問題の取得に失敗しました',
        })
      }
    })
}

onMounted(() => {
  setTimeout(pollingResult, 1000)
})
</script>

<template>
  <div style="text-align: center">
    <h3>しばらくお待ちください...</h3>
    <div>結果を待機中({{ poll }})</div>
    <div>
      <div style="margin-top: 5em; color: #888; font-weight: bold">英語トリビア</div>
      <el-carousel
        height="150px"
        direction="vertical"
        trigger="click"
        arrow="never"
        indicator-position="none"
        :interval="5000"
        :autoplay="true"
      >
        <el-carousel-item v-for="item in trivias.get(problemStore.genre)" :key="item">
          <div style="display: flex; justify-content: center; color: #999">
            <div style="width: 400px">
              {{ item }}
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<style scoped></style>
