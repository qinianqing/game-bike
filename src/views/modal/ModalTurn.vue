<script setup>
import { ref ,onMounted} from "vue"
const emit = defineEmits(["doSth"])
let status = ref(true)
import { useRouter } from "vue-router"
const router = useRouter()
import { useUserStore } from "@/stores/modules/user.js"

function changeStatus() {
  status.value = false
  emit("doSth")
  router.push("/")
}
let userDetail = ref({})
let channel = ref(true)
let miine = ref(0)

onMounted(()=>{
  const user = useUserStore()
  const userMsg = user.getUser()
  miine.value = user.getMile()
  userDetail.value = userMsg
  if(userDetail.value.game_chance === 0){
    channel.value = false
    status.value = true
  }
})
const ganmeAgin = ()=>{
  location.reload();
}
</script>
<template>
  <div class="box-contain overy" v-show="status">
    <div class="box">
      <div class="text">
        游戏结束
        <br />
        您本次骑行公里数：{{ miine }}KM
        <div class="text-tips">
          转发活动，寻求微信好友助力，
          <br />
          获得更多游戏机会
        </div>
      </div>
      <div :class="channel? 'button' :'buttons'" @click="ganmeAgin">再玩一次</div>
      <div class="close" @click="changeStatus"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box-contain {
  width: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  .box {
    width: 556px;
    height: 659px;
    background-image: url(@/assets/imgs/modal/game_over_turn.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 35px;
    box-sizing: border-box;
    margin-top: 150px;
    .text {
      font-size: 33px;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: #fa4b3f;
      text-align: center;
      .text-tips {
        margin-top: 50px;
        font-size: 24px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
      }
    }
    .button {
      width: 349px;
      height: 80px;
      background: linear-gradient(176deg, #fa773f 0%, #fa4b3f 100%);
      box-shadow: 0px 4px 12px 0px rgba(250, 75, 63, 0.3),
        inset 2px 4px 8px 2px rgba(255, 255, 255, 0.25);
      border-radius: 64px 64px 64px 64px;
      opacity: 1;
      border: 4px solid;
      position: absolute;
      bottom: 46px;
      text-align: center;
      line-height: 80px;
      font-size: 28px;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
    }
    .buttons {
      width: 349px;
      height: 80px;
      background: linear-gradient(176deg, #fa773f 0%, #fa4b3f 100%);
      box-shadow: 0px 4px 12px 0px rgba(250, 75, 63, 0.3),
        inset 2px 4px 8px 2px rgba(255, 255, 255, 0.25);
      border-radius: 64px 64px 64px 64px;
      opacity: 1;
      border: 4px solid;
      position: absolute;
      bottom: 46px;
      text-align: center;
      line-height: 80px;
      font-size: 28px;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      filter: grayscale(100%); /* 这会使图标变成灰色 */
    pointer-events: none; /* 这会禁止鼠标点击图标 */
    }
  }
  .close {
    width: 56px;
    height: 56px;
    background-image: url(@/assets/imgs/modal/close.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    bottom: -116px;
  }
}
</style>
