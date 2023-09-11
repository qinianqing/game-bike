import useUserStore from "./modules/user"
import useCounterStore from "./modules/counter"

export default function useStore() {
  return {
    user: useUserStore(),
    counter: useCounterStore()
  }
}
