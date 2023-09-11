import { defineStore } from "pinia"
const useCounterStore = defineStore("counter", {
  state: () => {
    return {
      count: 0
    }
  },
  getters: {},
  actions: {}
})

export default useCounterStore
