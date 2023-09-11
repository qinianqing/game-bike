<script setup>
import { ref } from "vue"
import ModalShare from "./ModalShare.vue";

const emit = defineEmits(["doSth"])
let status = ref(true)
let howShareStatus = ref(false)
function changeStatus() {
  status.value = false
  emit("doSth")
}
const howShare = () =>{
  howShareStatus.value = true
  status.value = false
}
</script>
<template>
  <div class="box-contain overy" v-show="status" @click="changeStatus">
    <div class="box">
      <div class="text">
        很遗憾！
        <br />
        今日游玩次数不足，暂时无法游戏。
        <br />
        明天再来吧～
        <div class="text-tips">小贴士：分享游戏可获得2次游玩次数哦～<br/>
去试试吧</div>
      </div>
      <div class="button" @click="howShare">如何分享游戏?</div>
      <div class="close" @click="changeStatus"></div>
    </div>
  </div>
  <ModalShare v-if="howShareStatus"></ModalShare>
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
    background-image: url(@/assets/imgs/modal/count.png);
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
      text-align: center;
      font-size: 28px;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
    }
    .text-tips{
      font-size: 24px;
font-family: PingFang SC-Regular, PingFang SC;
font-weight: 400;
color: #999999;
margin-top:52px ;
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
