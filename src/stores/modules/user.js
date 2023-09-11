import { defineStore } from "pinia"
export const useUserStore = defineStore("user", {
  state: () => {
    return {
      openId: "",
      unionid: "",
      user: {
        avatar: "",
        game_chance: "",
        nickname: "",
        openid: "",
        prize_code: "",
        prize_name: "",
        subscribe: ""
      },
      miles: 0,
      share_code: ""
    }
  },
  actions: {
    setOpenId(openId) {
      this.openId = openId
    },
    getOpenId() {
      return this.openId
    },
    setUser(data) {
      this.user = data
    },
    getUser() {
      return this.user
    },
    setPrize(data) {
      this.user.prize_code = data
    },
    getMile() {
      return this.miles.toFixed(2)
    },
    setMile(data) {
      this.miles = data
    },
    setShareCode(data) {
      this.share_code = data
    },
    getShareCode() {
      return this.share_code
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "user",
        storage: localStorage
      }
    ]
  }
})
