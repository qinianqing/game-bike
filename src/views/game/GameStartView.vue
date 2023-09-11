<script setup>
import { ref, onMounted, onBeforeUnmount, onUnmounted, watch } from "vue"
import imgOne from "@/assets/imgs/game/one.png"
import imgTwo from "@/assets/imgs/game/two.png"
import imgThree from "@/assets/imgs/game/three.png"
import musicFile from "@/assets/imgs/game/music.mp4"
import djFile from "@/assets/imgs/game/dj.mp3"
import { Howl } from "howler"
import ModalShareVue from "@/views/modal/ModalTurn.vue"
import ModalGameOver from "@/views/modal/ModalGameOver.vue"
import { useUserStore } from "@/stores/modules/user.js"
import { GameReport, getPrize } from "@/api/game"
import ModalShareSuceessVue from "@/views/modal/ModalTurnReward.vue"

let actions = ref(null)
let deg = ref(0)
let mile = ref(0)
let ganmeEnd = ref(false)
let tips = ref(true)
let gameOver = ref(false)
let gameSuccess = ref(false)

const audioUrl = ref(null)
const sound = new Howl({ src: [djFile] })

//定时器变量 方便在页面销毁的时候清楚定时器
const timer = ref(null)
//页面在刷新的时候可以加loading显示 方便页面展示
const loading = ref(false)
//使countdown定时增加 如果增加到我们想要的时间 也就是变量autoRefreshTime 执行刷新
const countdown = ref(0)
//定时刷新的时间 现在设置的为3 也就是2秒刷新一次数据
const autoRefreshTime = ref(4)
const mileCountdown = ref(0)
const mileAutoRefreshTime = ref(2)

const currentImage = ref("")
const images = ref([imgOne, imgThree, imgTwo, imgOne])
const currentImageIndex = ref(0)
const timers = ref(null)
onMounted(() => {
  initAudio()
})

const startGame = () => {
  timer.value = window.setInterval(() => {
    //不loading的时候才会执行
    if (!loading.value) {
      //countdown小于我们想要的定时时间的时候 定时器也是一秒执行一次 就继续+1
      if (countdown.value < autoRefreshTime.value) {
        countdown.value = countdown.value + 1
        //当定时器到时间的时候 去干我们想干的事情 refresh()
        if (countdown.value === autoRefreshTime.value) {
          refresh()
        }
      }
      if (mileCountdown.value < mileAutoRefreshTime.value) {
        mileCountdown.value = mileCountdown.value + 1
        //当定时器到时间的时候 去干我们想干的事情 refresh()
        if (mileCountdown.value === mileAutoRefreshTime.value) {
          refreshMiles()
        }
      }
    }
  }, 100)
}
onUnmounted(() => {
  clearInterval(timers.value)
  clearTimeout(timer.value)
  audio.value.pause() // 暂停音乐
  audioStatus.value = false
})
const clickLeft = () => {
  if (audioUrl.value === null) {
    sound.play()
  } else {
    sound.pause()
  }
  deg.value -= 5
  actions.value.style.transform = `rotate(${deg.value}deg)`
}

const clickRight = () => {
  if (audioUrl.value === null) {
    sound.play()
  } else {
    sound.pause()
  }
  deg.value += 5
  actions.value.style.transform = `rotate(${deg.value}deg)`
}

const randomChangeBy20 = num => {
  // 生成一个随机布尔值
  let isAdd = Math.random() >= 0.4
  // 生成一个介于0到20之间的随机数
  let randomNum = Math.random() * 30
  if (isAdd) {
    // 执行加法
    num += randomNum
  } else {
    // 执行减法
    num -= randomNum
  }
  return num
}
const refresh = () => {
  loading.value = true
  loading.value = false
  countdown.value = 0
  deg.value = randomChangeBy20(deg.value)
  if (Math.abs(deg.value) > 29) {
    deg.value === 30
  }
  actions.value.style.transform = `rotate(${deg.value}deg)`
}

const refreshMiles = () => {
  loading.value = true
  //然后这个定时器可以不加，拿到想要的值后执行便可，即拿到数据后我们需要做的善后工作，重置初始值
  // setTimeout(() => {
  loading.value = false
  mileCountdown.value = 0
  mile.value += 1.82
  // }, 1000)
}

onBeforeUnmount(() => {
  window.clearInterval(timer)
  audio.value.pause() // 暂停音乐
  audioStatus.value = false
  mile.value = 0
})

const audio = ref(new Audio()) // 创建一个Audio对象引用
const audioStatus = ref(true) // 标识当前音乐是否正在播放
const musicUrl = ref(musicFile) // 存储音乐文件的URL
const djFileUrl = ref(djFile)

let recordTimer = ref()

let recordCount = ref(0)
// 初始化音频对象并加载音乐文件
async function initAudio() {
  audio.value.src = musicUrl.value // 设置音频对象的音乐文件URL
  await audio.value.load() // 加载音乐文件
  audio.value.play() // 开始播放音乐
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

const gg = () => {
  tips.value = false
  startGame()
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

// 在全局范围内禁止页面双击
window.addEventListener("beforeunload", function (event) {
  event.preventDefault()
  event.returnValue = ""
})

// 可以直接侦听一个 ref
watch(deg, async (newQuestion, oldQuestion) => {
  console.log(newQuestion, oldQuestion)
  console.log("===", Math.abs(newQuestion))
  if (Math.abs(newQuestion) > 60) {
    clearInterval(timer)
    clearInterval(timer.value)
    ganmeEnd.value = true
    const user = useUserStore()
    user.setMile(Math.abs(mile.value))
    GameReport({
      openid: user.getOpenId(),
      game_grade: Math.abs(mile.value)
    })
  }
})

watch(mile, async (newValues, oldValues) => {
  console.log(newValues, oldValues)
  if (Math.abs(newValues) > 9999) {
    clearInterval(timer)
    clearInterval(timer.value)
    gameSuccess.value =true
    const user = useUserStore()
    user.setMile(Math.abs(newValues))
     GameReport({
      openid: user.getOpenId(),
      game_grade: Math.abs(newValues)
    })
    mile.value = 0
  }
})
</script>
<template>
  <div class="box">
    <div :class="audioStatus ? 'music-icon' : 'music-icon-close'" @click="toggleAudio"></div>
    <div class="wind"></div>
    <div class="banner"></div>
    <div class="logo"></div>
    <div class="miles">
      <div class="miles-number">{{ mile.toFixed(2) }}</div>
      <div class="miles-km">km</div>
    </div>
    <div class="action" ref="actions"></div>
    <div class="left" @click="clickLeft"></div>
    <div class="right" @click="clickRight"></div>
  </div>
  <div class="box-contains" v-show="tips">
    <div class="box-gg"></div>
    <div class="gg" @click="gg"></div>
  </div>
  <ModalShareVue v-if="ganmeEnd"></ModalShareVue>
  <ModalGameOver v-if="gameOver"></ModalGameOver>
  <ModalShareSuceessVue v-if="gameSuccess"></ModalShareSuceessVue>
</template>
<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100vh;
  background-image: url("@/assets/imgs/game/bg.gif");
  background-size: 100%;
  background-repeat: no-repeat;
  .wind {
    background-image: url("@/assets/imgs/game/wind.png");
    background-size: 100%;
    background-repeat: no-repeat;
    width: 720px;
    height: 750px;
    position: absolute;
    top: 242px;
    left: 30px;
  }
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
  .banner {
    position: absolute;
    background-image: url("@/assets/imgs/game/logo.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 181px;
    height: 41px;
    top: 27px;
    left: 20px;
  }
  .logo {
    position: absolute;
    background-image: url("@/assets/imgs/game/banner.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    top: 116px;
    left: 106px;
    width: 557px;
    height: 123px;
  }
  .miles {
    width: 134px;
    height: 134px;
    text-align: center;
    border-radius: 50%;
    position: absolute;
    top: 252px;
    left: 308px;
    border: 2px solid #a1e2fb;
    background: linear-gradient(0deg, #38a9fa 0%, #8ed1f9 99%);
    .miles-number {
      width: 106px;
      height: 21px;
      font-size: 28px;
      font-family: Alimama ShuHeiTi;
      font-weight: bold;
      color: #ffffff;
      position: absolute;
      bottom: 70px;
      left: 13px;
    }
    .miles-km {
      width: 33px;
      height: 19px;
      font-size: 24px;
      font-family: Alimama ShuHeiTi;
      font-weight: bold;
      color: #ffffff;
      position: absolute;
      left: 49px;
      bottom: 40px;
    }
  }
  .action {
    width: 142px;
    height: 458px;
    background-image: url("@/assets/imgs/game/action.gif");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    top: 561px;
    left: 300px;
  }
  .left {
    width: 275px;
    height: 151px;
    background-image: url("@/assets/imgs/game/left.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    bottom: 67px;
    left: 37px;
  }
  .right {
    width: 275px;
    height: 151px;
    background-image: url("@/assets/imgs/game/right.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    bottom: 67px;
    right: 37px;
  }
}
.box-contains {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  .box-gg {
    width: 556px;
    height: 1100px;
    background-image: url(@/assets/imgs/game/game_start_rule.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    top: 20px;
    left: 95px;
  }
  .gg {
    width: 360px;
    height: 151px;
    background-image: url("@/assets/imgs/game/gg.png");
    background-size: 100%;
    background-repeat: no-repeat;
    position: absolute;
    bottom: 30px;
    left: 190px;
  }
}
.box-images {
  position: fixed;
  width: 750px;
  height: 100vh;
  z-index: 999;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  img {
    width: 118px;
    height: 164px;
  }
}
</style>
