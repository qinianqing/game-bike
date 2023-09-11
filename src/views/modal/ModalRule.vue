<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useUserStore } from "@/stores/modules/user.js"
const router = useRouter()

const emit = defineEmits([ "doSth" ]);
let status = ref(true)
let channel = ref(true)
let userDetail = ref({})
function changeStatus() {
  status.value = false
  emit('doSth');
}
onMounted(()=>{
  const user = useUserStore()
  const userMsg = user.getUser()
  userDetail.value = userMsg
  if(!userDetail.value || userDetail.value.game_chance === 0){
    channel.value = false
  }
})
const tryGame = ()=>{
const user = useUserStore()
const userMSg = user.getUser()
if(userMSg?.game_chance === 0){
  return
}else{
  router.push("/game")
}
}

</script>
<template>
  <div class="box-contain overy" v-show="status" @click="changeStatus">
    <div class="box">
      <div class="text">
        1、点击屏幕下方左右按钮，保持自行车平衡，别让老师摔倒啦！
        <br />
        2、骑行里程越远，越容易获得奖励哟！每天难度不同，请持续关注！
        <br />
        3、活动仅限【阜新银行】公众号粉丝参与
        <br />
        4、每人每日可免费获得3次参与机会
        <br />
        5、转发活动链接，求助微信好友，可获得更多游戏机会
      </div>
      <div :class=" channel ? 'button' : 'buttons'" @click="tryGame">再玩一次</div>
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
    background-image: url(@/assets/imgs/modal/rule.png);
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
      font-size: 24px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
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
    .buttons{
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
