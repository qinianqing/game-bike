<script setup>
import { ref } from "vue"
const emit = defineEmits(["doGameEndRewardSth"])
let status = ref(true)
function changeStatus() {
  status.value = false
  emit("doGameEndRewardSth")
  // router.push("/")
}
</script>
<template>
  <div class="box-contain overy" v-show="status" @click="changeStatus">
    <div class="box">
      <div class="text">
        很遗憾！很遗憾您没有中奖!
        <br/>
        活动己结束。
        <br />
        感谢您的关注
      </div>
      <div class="button">好的</div>
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
    background-image: url(@/assets/imgs/modal/activity_end.png);
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
