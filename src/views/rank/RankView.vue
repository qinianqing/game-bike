<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { RankList } from "@/api/rank"
import { useUserStore } from "@/stores/modules/user.js"
const router = useRouter()
let list = ref([])
let userDetail = ref({})
let users = ref({})
let change = ref(true)
onMounted(async () => {
  const user = useUserStore()
  let userMsg = user.getUser()

  users.value = userMsg
  if(users?.value?.game_chance === 0 || !users.value?.game_chance){
    change.value = false
  }
  const rankList = await RankList({ openid: users.value.openid })
  if (rankList && rankList.rank.length > 0) {
    list.value = rankList.rank
  }
  const myList = rankList.rank.filter(item=>item.openid === users.value.openid)
  userDetail.value = userMsg
  userDetail.value.miles = 0
  userDetail.value.rank = "未上榜"
  if (rankList?.my && rankList.my.length > 0 && myList.length > 0) {
    userDetail.value.miles = rankList?.my[0].grade
    userDetail.value.rank = "上榜"
  }
})


const tryGame = () => {
  router.push("/game")
}
</script>
<template>
  <div class="rank">
    <div class="top"></div>
    <div class="list-contain">
      <div class="title">
        <div class="title-left">排名</div>
        <div class="title-middle">昵称</div>
        <div class="title-right">分数</div>
      </div>
      <div class="list">
        <div class="item" v-for="(item, index) in list">
          <div class="item-index">
            <div class="index-number" v-if="index > 2">{{ index + 1 }}</div>
            <div class="index-image" v-if="index < 3"></div>
          </div>
          <div class="item-name">
            <img :src="item.avatar" alt="" />
            <div class="name">{{ item.nickname }}</div>
          </div>
          <div class="item-source">{{ item.grade }}</div>
        </div>
      </div>
    </div>
    <div class="user">
      <div class="myself">我</div>
      <div class="myself-name-contain">
        <img :src="userDetail.avatar" alt="" />
        <div class="myself-name">{{ userDetail.nickname }}</div>
      </div>
      <div class="rank-detail">
        <div class="rank-detail-title">{{ userDetail.rank }}</div>
        <div class="rank-detail-miles">{{ userDetail.miles }}KM</div>
      </div>
      <div :class="change ? 'continue' : 'continues'" @click="tryGame">继续游戏</div>
    </div>
  </div>
</template>

<style lang="scss">
.rank {
  width: 100%;
  height: 100vh;
  position: relative;
  .top {
    position: absolute;
    background-image: url("@/assets/imgs/rank/rank-top.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 100%;
    height: 385px;
    top: 0;
    left: 0;
  }
  .list-contain {
    width: 100%;
    height: calc(100vh - 325px);
    overflow-y: scroll;
    background-color: #ffffff;
    border-radius: 40px 40px 0px 0px;
    position: relative;
    top: 325px;
    box-sizing: border-box;
    padding: 30px 0px 162px 0px;
    .title {
      width: 100%;
      height: 84px;
      line-height: 84px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      font-size: 28px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      .title-left {
        width: 20%;
        text-align: center;
      }
      .title-middle {
        width: 45%;
      }
      .title-right {
        width: 15%;
      }
    }
    .list {
      width: 100%;
      overflow: hidden;
      .item {
        width: 100%;
        height: 162px;
        line-height: 162px;
        background: #ffffff;
        display: flex;
        box-sizing: border-box;
        position: relative;
        .item-index {
          font-size: 28px;
          font-family: PingFang SC-Medium, PingFang SC;
          font-weight: 500;
          color: #666666;
          width: 20%;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 45px;
          .index-number {
            font-size: 28px;
            font-family: PingFang SC-Medium, PingFang SC;
            font-weight: 500;
            color: #666666;
          }
          .index-image {
            width: 64px;
            height: 64px;
            background-image: url("@/assets/imgs/rank/one.png");
            background-size: 100% 100%;
            background-repeat: no-repeat;
          }
        }
        .item-name {
          width: 54%;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          img {
            width: 82px;
            height: 82px;
            border-radius: 50%;
            display: inline-block;
            vertical-align: middle;
            margin-right: 22px;
          }
          .name {
            font-size: 28px;
            font-family: PingFang SC-Medium, PingFang SC;
            font-weight: 500;
            color: #333333;
            display: inline-block;
          }
        }
        .item-source {
          width: 15%;
          font-size: 36px;
          font-family: DIN Alternate-Bold, DIN Alternate;
          font-weight: bold;
          color: #ff2952;
        }
      }
      .item:nth-child(1) {
        background: linear-gradient(180deg, #ffffff 0%, #fff2f2 100%);
      }
      .item:nth-child(2) {
        background: linear-gradient(180deg, #ffffff 0%, #fdf2ff 100%);
        .item-index {
          .index-image {
            background-image: url("@/assets/imgs/rank/two.png");
          }
        }
      }
      .item:nth-child(3) {
        background: linear-gradient(180deg, #ffffff 0%, #f2f8ff 100%);
        .item-index {
          .index-image {
            background-image: url("@/assets/imgs/rank/three.png");
          }
        }
      }
      .item:nth-of-type(n + 4)::after {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        content: "";
        width: 80%;
        border-radius: 0px 0px 0px 0px;
        border: 1px solid #efefef;
      }
    }
  }
  .user {
    position: fixed;
    width: 690px;
    height: 130px;
    line-height: 130px;
    bottom: 40px;
    background: #fff4f4;
    margin-left: 30px;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .myself {
      width: 10%;
      text-align: center;
      font-size: 28px;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: #ff2952;
    }
    .myself-name-contain {
      width: 38%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      img {
        width: 82px;
        height: 82px;
        border-radius: 50%;
        display: inline-block;
        vertical-align: middle;
        margin-right: 22px;
        border: 2px solid #ff2952;
      }
      .myself-name {
        font-size: 28px;
        font-family: PingFang SC-Medium, PingFang SC;
        font-weight: 500;
        color: #333333;
        display: inline-block;
      }
    }
    .rank-detail {
      width: 20%;
      position: relative;
      top: -45px;
      text-align: center;
      .rank-detail-title {
        font-size: 28px;
        font-family: PingFang SC-Semibold, PingFang SC;
        font-weight: 600;
        color: #ff2952;
        height: 39px;
      }
      .rank-detail-miles {
        font-size: 24px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        height: 34px;
        color: #ff2952;
      }
    }
    .continue {
      width: 166px;
      height: 70px;
      text-align: center;
      line-height: 70px;
      background: linear-gradient(136deg, #ffa270 0%, #ff3370 100%);
      border-radius: 68px 68px 68px 68px;
      font-size: 28px;
      font-family: PingFang SC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ffffff;
      margin-right: 20px;
    }
    .continues {
      width: 166px;
      height: 70px;
      text-align: center;
      line-height: 70px;
      background: linear-gradient(136deg, #ffa270 0%, #ff3370 100%);
      border-radius: 68px 68px 68px 68px;
      font-size: 28px;
      font-family: PingFang SC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ffffff;
      margin-right: 20px;
      filter: grayscale(100%); /* 这会使图标变成灰色 */
      pointer-events: none; /* 这会禁止鼠标点击图标 */
    }
  }
}
</style>
