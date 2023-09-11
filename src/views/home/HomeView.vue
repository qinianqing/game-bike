<script setup>
import { useRouter } from "vue-router"
import ModalRule from "@/views/modal/ModalRule.vue"
import ModalShareVue from "@/views/modal/ModalSharePaper.vue"
import ModalGameOver from "@/views/modal/ModalGameOver.vue"
import musicFile from "@/assets/imgs/game/music.mp4"
import goTop from "@/assets/imgs/home/go_top.png"
import { ref, onMounted, onUnmounted } from "vue"
import { useUserStore } from "@/stores/modules/user.js"
import ModalCount from "@/views/modal/ModalCount.vue"
import ModalAdd from "@/views/modal/ModalAdd.vue"
import ModalActivityEnd from "@/views/modal/ModalActivityEnd.vue"



let ruleStatus = ref(false)
let shareStatus = ref(false)
let gameRewardStatus = ref(false)
let subscribeStatus = ref(false)
let gameEndTime = ref(false)

let goTopUrl = ref(goTop)

let channel = ref(true)

let rewardChannel = ref(true)

let userDetail = ref({})
function clickRule() {
  ruleStatus.value = true
}
function sayHello() {
  ruleStatus.value = false
}
const router = useRouter()
function gameStart() {
 if(userDetail?.value?.game_chance === 0 || !userDetail.value?.game_chance || userDetail.value.subscribe !== 1){
  channel.value = false
  subscribeStatus.value = true
 }else{
  router.push("/game")
 }

}
function rankTurn() {
  router.push("/rank")
}
const shareGame = async () => {
  shareStatus.value = true
}
const shareClose = () => {
  shareStatus.value = false
}
const gameReward = () => {
  if(!userDetail.value.prize_code){
    gameEndTime.value = true
  }else{
    gameRewardStatus.value = true
  }
}
const doGameReward = () => {
  gameRewardStatus.value = false
}

const doGameEndRewardSth =()=>{
  gameEndTime.value = false
}

onMounted(async() => {
  initAudio()
  // const time = new Date().getTime()
  // console.log(time)// 1694054798070
  // if(+time < 1694054798070 || +time > 1694361599000){
  //   channel.value = false
  //   return
  // }
  channel.value = false
  const user = useUserStore()
  const userMsg = user.getUser()
  userDetail.value = userMsg
  if(userDetail.value.subscribe !== 1){
    subscribeStatus.value = true
    return
  }
  if(userDetail.value.game_chance === 0){
    channel.value = false
  }
  if(!userDetail.value.prize_code){
    rewardChannel.value = false
  }

})
const audio = ref(new Audio()) // 创建一个Audio对象引用
const audioStatus = ref(false) // 标识当前音乐是否正在播放
const musicUrl = ref(musicFile) // 存储音乐文件的URL
// 初始化音频对象并加载音乐文件
async function initAudio() {
  audio.value.src = musicUrl.value // 设置音频对象的音乐文件URL
  audio.value.load() // 加载音乐文件
  // audio.value.play() // 开始播放音乐
}

// 控制音乐的播放或暂停
const toggleAudio = () => {
  if (audioStatus.value) {
    audio.value.pause() // 暂停音乐
    audioStatus.value = false
  } else {
    audio.value.play() // 播放音乐
    audioStatus.value = true
  }
}

// 监听音频对象的加载和播放状态变化事件
audio.value.addEventListener("loadedmetadata", () => {
  console.log("音乐文件已加载")
})
audio.value.addEventListener("ended", () => {
  console.log("音乐播放结束")
  audioStatus.value = false
})

window.addEventListener("popstate", () => {
  audio.value.pause() // 暂停音乐
  audioStatus.value = false
})
onUnmounted(()=>{
  audio.value.pause() // 暂停音乐
  audioStatus.value = false
  const user = useUserStore()
  const userMsg = user.getUser()
  userDetail.value = userMsg
})
</script>
<template>
  <div class="home">
    <div :class="audioStatus ? 'music-icon' : 'music-icon-close'" @click="toggleAudio"></div>
    <div class="logo"></div>
    <div class="banner"></div>
    <div class="share" @click="shareGame"></div>
    <div class="rewards" @click="gameReward"></div>
    <div class="rule" @click="clickRule"></div>
    <div class="rank" @click="rankTurn"></div>
    <div :class="channel? 'go' :'gos'" @click="gameStart">
      <img :src="goTopUrl" alt="" />
      <div class="go-text">剩余{{userDetail?.game_chance ? userDetail.game_chance : 0}}次</div>
    </div>
  </div>
  <ModalRule v-if="ruleStatus" @doSth="sayHello"></ModalRule>
  <ModalShareVue v-if="shareStatus" @doShareSth="shareClose"></ModalShareVue>
  <ModalGameOver v-if="gameRewardStatus" @doGameRewardSth="doGameReward"></ModalGameOver>
  <ModalCount v-if="(userDetail.game_chance === 0 || !userDetail.game_chance) && userDetail.subscribe === 1"></ModalCount>
  <ModalAdd v-if="subscribeStatus"></ModalAdd>
  <ModalActivityEnd v-if="gameEndTime" @doGameEndRewardSth="doGameEndRewardSth"></ModalActivityEnd>
</template>

<style lang="scss">
.home {
  width: 100%;
  height: 100vh;
  background-image: url("@/assets/imgs/home/main.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .music-icon {
    position: absolute;
    right: 11px;
    top: 81px;
    width: 54px;
    height: 54px;
    border-radius: 50%;
    background-image: url("@/assets/imgs/game/music_start.png");
    background-size: 100%;
    background-repeat: no-repeat;
    animation: spin 2s linear infinite;
  }
  .music-icon-close {
    position: absolute;
    right: 11px;
    top: 81px;
    width: 54px;
    height: 54px;
    border-radius: 50%;
    background-image: url("@/assets/imgs/game/music_end.png");
    background-size: 100%;
    background-repeat: no-repeat;
    animation: spin 2s linear infinite;
  }
  .logo {
    position: absolute;
    background-image: url("@/assets/imgs/home/logo.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 174px;
    height: 40px;
    top: 32px;
    left: 16px;
  }
  .banner {
    position: absolute;
    background-image: url("@/assets/imgs/home/banner.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 555px;
    height: 195px;
    top: 80px;
    left: 107px;
  }
  .share {
    position: absolute;
    background-image: url("@/assets/imgs/home/share.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 112px;
    height: 112px;
    top: 494px;
    right: 15px;
  }
  .reward {
    position: absolute;
    background-image: url("@/assets/imgs/home/reward.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 112px;
    height: 112px;
    top: 623px;
    right: 15px;
    filter: grayscale(100%); /* 这会使图标变成灰色 */
    pointer-events: none; /* 这会禁止鼠标点击图标 */
  }
  .rewards{
    position: absolute;
    background-image: url("@/assets/imgs/home/reward.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 112px;
    height: 112px;
    top: 623px;
    right: 15px;
  }
  .rule {
    position: absolute;
    background-image: url("@/assets/imgs/home/rule.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 112px;
    height: 112px;
    top: 244px;
    right: 15px;
  }
  .rank {
    position: absolute;
    background-image: url("@/assets/imgs/home/rank.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 112px;
    height: 112px;
    top: 369px;
    right: 15px;
  }
  .gos{
    position: absolute;
    background-image: url("@/assets/imgs/home/go.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 360px;
    height: 151px;
    bottom: 77px;
    left: 195px;
    text-align: center;
    filter: grayscale(100%); /* 这会使图标变成灰色 */
    pointer-events: none; /* 这会禁止鼠标点击图标 */
    img {
      width: 177px;
      height: 47px;
      position: absolute;
      top: 15px;
      left: 94px;
    }
    .go-text {
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
      position: absolute;
      top:67px;
      left: 142px;
    }
   }
  .go {
    position: absolute;
    background-image: url("@/assets/imgs/home/go.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 360px;
    height: 151px;
    bottom: 77px;
    left: 195px;
    text-align: center;
    img {
      width: 177px;
      height: 47px;
      position: absolute;
      top: 15px;
      left: 94px;
    }
    .go-text {
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
      position: absolute;
      top:67px;
      left: 142px;
    }
  }
}
</style>
