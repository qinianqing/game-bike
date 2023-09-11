<script setup>
import { ref, onMounted } from "vue"
import paper from "@/assets/imgs/home/paper.png"
import Qrcode from 'qrcode.vue'
import { useUserStore } from "@/stores/modules/user.js"
const { VITE_SHARE  } = import.meta.env
let paperUrl = ref(paper)
const emit = defineEmits(["doShareSth"])
let status = ref(true)
function changeStatus() {
  status.value = false
  emit("doShareSth")
}
let url = ref("")
onMounted(()=>{
console.log(VITE_SHARE)
const user = useUserStore()
const openid = user.getOpenId()
url.value = `${VITE_SHARE}?share_code=${openid}`
})
</script>
<template scoped>
  <div class="box-contain-paper overy" v-show="status" @click="changeStatus">
    <div class="box-paper">
      <img :src="paperUrl" alt="" />
      <div class="paperOne-paper">截图保存后</div>
      <div class="paperOneAfter-paper"></div>
      <div class="ci">每天最多获得2次额外机会</div>
      <div class="paperTwo-paper">分享给朋友扫码即可～</div>
      <div class="paperThree-paper">冲鸭!乡村教师</div>
      <Qrcode :value="url" size=60 class="paperThour-paper"></Qrcode>
      <div class="close-paper" @click="changeStatus"></div>
    </div>
  </div>
</template>

<style lang="scss">
.box-contain-paper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  .box-paper {
    width: 556px;
    height: 988px;
    background-color: #ffffff;
    border-radius: 20px;
    position: relative;
    img {
      width: 556px;
      height: 780px;
    }
    .paperOne-paper {
      font-size: 45px;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
      position: absolute;
      top:810px;
      left: 29px;
    }
    .paperOneAfter-paper {
      width: 98px;
      height: 12px;
      background: linear-gradient(90deg, #3c9bff 0%, rgba(60, 155, 255, 0) 100%);
      border-radius: 10px 10px 10px 10px;
      opacity: 1;
      position: absolute;
      top:858px;
      left: 29px;
    }
    .paperTwo-paper {
      font-size: 24px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      position: absolute;
      top:915px;
      left: 28px;
    }
    .ci{
      font-size: 24px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      position: absolute;
      top:880px;
      left: 28px;
    }
    .paperThree-paper {
      font-size: 24px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      position: absolute;
      bottom:22px;
      right: 25px;
    }
    .paperThour-paper {
      width: 120px;
      height: 120px;
      background: rgba(217, 217, 217, 0.6);
      border-radius: 8px 8px 8px 8px;
      opacity: 1;
      position: absolute;
      bottom:66px;
      right: 41px;
    }
  }
  .close-paper {
    width: 56px;
    height: 56px;
    background-image: url(@/assets/imgs/modal/close.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    bottom: -100px;
    left: 250px;
  }
}
</style>
