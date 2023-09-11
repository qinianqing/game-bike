<script setup>
import { ref } from "vue"
const emit = defineEmits(["doShareSth"])
let status = ref(true)
function changeStatus() {
  status.value = false
  emit("doShareSth")
}
</script>
<template scoped>
  <div class="box-contain overy" v-show="status" @click="changeStatus">
    <div class="box">
      <div class="text">
        1.点击右上角“三个点”按钮
        <br />
        2.点击【转发给朋友】
        <br />
        3.选择朋友即可分享游戏～
        <div class="text-tips">成功分享游戏后，即可获得1次游戏机会哦～</div>
      </div>
      <div class="close" @click="changeStatus"></div>
    </div>
  </div>
</template>

<style lang="scss">
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
    height: 446px;
    background-image: url(@/assets/imgs/modal/share.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 35px;
    box-sizing: border-box;
    margin-top: 250px;
    .text {
      font-size: 24px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      margin-top: 55px;
      .text-tips {
        font-size: 24px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        margin-top: 28px;
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
