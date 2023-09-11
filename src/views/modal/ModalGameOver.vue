<script setup>
import { ref, onMounted, toRef } from "vue"
import { useRouter } from "vue-router"
import { useUserStore } from "@/stores/modules/user.js"
import { showDialog } from 'vant';
const router = useRouter()
const emit = defineEmits(["doGameRewardSth"])
let status = ref(true)
let users = ref({})

const myInput = ref("")
function changeStatus() {
  status.value = false
  emit("doGameRewardSth")
  router.push("/")
}
const back = () => {
  status.value = false
  emit("doGameRewardSth")
  router.push("/")
}

const isOpen = ref(false)
const box = ref(null)
const message =
  ref(`
1.电脑端：登录京东官网账号→【我的京东】→【我的钱包】→【礼品卡】→【绑定礼品卡】→输入卡密；
2.手机端：打开京东APP→【我的】→【我的钱包】→【礼品卡】→【绑定新卡】→输入卡密。 `)
const tipOverDesc = () => {
  showDialog({
    message:message
  })
}

onMounted(() => {
  const user = useUserStore()
  let userMsg = user.getUser()
  users.value = userMsg
  if (users.value.prize_code) {
    myInput.value = users.value.prize_code
  }
})
</script>
<template>
  <div class="box-contain-over overy" v-show="status">
    <div class="box-over">
      <div class="text-over">
        恭喜您获得了活动奖励！
        <div class="text-tips-over">附赠您的奖品卡密</div>
        <input :value="myInput" type="text" class="text-input-over" placeholder="复制" />
        <div class="text-desc-over">
          卡密用于兑换奖品。
          <br />
          点此了解→
          <span class="text-desc-tips-over" @click="tipOverDesc">【兑换方法】</span>
        </div>
      </div>
      <div class="button-over" @click="back">好的</div>
      <div class="close-over" @click="changeStatus"></div>
    </div>
    <div class="floating-box" ref="box" v-if="isOpen">
      {{ message }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box-contain-over {
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
  .floating-box {
    width: 700px;
    height: 400px;
    position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;

    top: 300px;
    color: white;
    text-align: left;
    background-color:#3a3a3c;
    border-radius:30px ;
  }
  .box-over {
    width: 556px;
    height: 716px;
    background-image: url(@/assets/imgs/modal/game_over_code.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;

    position: relative;
    padding: 35px;
    box-sizing: border-box;
    margin-top: 150px;
    .text-over {
      font-size: 36px;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: #fa4b3f;
      text-align: center;
      margin-top: 150px;
      .text-tips-over {
        font-size: 28px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        text-align: left;
        margin-top: 30px;
      }
      .text-input-over {
        width: 476px;
        height: 72px;
        line-height: 72px;
        background: #ffffff;
        border-radius: 4px 4px 4px 4px;
        margin-top: 27px;
        padding: 5px 10px;
        font-size: 24px;
        font-family: PingFang SC-Medium, PingFang SC;
        font-weight: 500;
        color: #999999;
      }
      .text-input-over::placeholder {
        font-size: 28px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #1782ff;
        text-align: right;
      }
      .text-desc-over {
        font-size: 28px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
        text-align: left;
        margin-top: 24px;
        .text-desc-tips-over {
          font-size: 28px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #1782ff;
        }
      }
    }
    .button-over {
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
  .close-over {
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
