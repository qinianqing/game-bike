<script setup>
import { ref } from "vue"
const emit = defineEmits(["doSth"])
let status = ref(true)
import { useRouter } from "vue-router"
const router = useRouter()

function changeStatus() {
  status.value = false
  emit("doSth")
  router.push("/")
}
const ganmeAgin = () => {
  location.reload()
}
</script>
<template>
  <div class="box-contains" v-show="status">
    <div class="box-gg">

    </div>
    <div class="gg"></div>
  </div>
</template>

<style lang="scss" scoped>
.box-contains {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  .box-gg {
    width: 556px;
    height: 1100px;
    background-image: url(@/assets/imgs/game/game_start_rule.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    top: 20px;
     left:95px;

  }
  .gg {
      width: 360px;
      height: 151px;
      background-image: url("@/assets/imgs/game/gg.png");
      background-size: 100%;
      background-repeat: no-repeat;
      position: absolute;
    bottom: 30px;
     left:190px;
    }
}
</style>
