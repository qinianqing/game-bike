import { createRouter, createWebHashHistory } from "vue-router"
import { useUserStore } from "@/stores/modules/user.js"
import { UserInfo, ShareGame } from "@/api/home.js"

let constantRoutes = []
const routeFiles = import.meta.globEager("./modules/*.js")
for (const path in routeFiles) {
  constantRoutes.push(routeFiles[path].default)
}

let routes = [
  ...constantRoutes.flat(),
  {
    path: "/error",
    name: "error",
    component: () => import("@/views/404.vue"),
    meta: {
      title: "服务器异常，请耐心等待！"
    }
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404.vue"),
    meta: {
      title: "服务器异常，请耐心等待！"
    }
  },
  {
    path: "/:pathMatch(.*)*",
    name: "unknown",
    redirect: "/404"
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

const getQuery = name => {
  let reg = new RegExp("([&,?])" + name + "=([^&]*)(&|$)", "i")
  let r = window.location.search.match(reg) || window.location.hash.match(reg)
  if (r != null) return decodeURIComponent(r[2])
  return null
}

const removeParamFromURL = url => {
  url = url.replace(/([?&])openid=[^&]+(&|$)/, "$1")
  return url
}
router.beforeEach(async (to, from, next) => {
  const user = useUserStore()
  if (getQuery("share_code")) {
    user.setShareCode(getQuery("share_code"))
  }
  //ohmM_5inCJdOWUJbd5efFN6k-nAg
  const fixOpenId = ""
  if (getQuery("openId") || getQuery("openid") || fixOpenId) {
    const userMsg = await UserInfo({
      openid: getQuery("openId") || getQuery("openid") || fixOpenId
    })
    user.setUser({
      avatar: userMsg?.avatar || "",
      game_chance: userMsg?.game_chance || 0,
      nickname: userMsg?.nickname || "",
      openid: userMsg?.openid || "",
      prize_code: userMsg?.prize?.prize_code || "",
      prize_name: userMsg?.prize?.prize_name || "",
      subscribe: userMsg?.subscribe || ""
    })
    user.setOpenId(getQuery("openId") || getQuery("openid") || fixOpenId)
    removeParamFromURL(window.location.href)
    if (user.getShareCode()) {
      ShareGame({
        game_chance: 1,
        openid: user.getShareCode(),
        from_openid: getQuery("openId") || getQuery("openid") || fixOpenId
      })
    }
    next()
  } else {
    const {
      VITE_APPID,
      VITE_REDIRECT_URL,
      VITE_AUTH_URL,
      VITE_RESPONSE_TYPE,
      VITE_SCOPE,
      VITE_STATE
    } = import.meta.env

    const url = encodeURIComponent(`${VITE_REDIRECT_URL}`)

    location.replace(
      `${VITE_AUTH_URL}?appid=${VITE_APPID}&redirect_uri=${url}&response_type=${VITE_RESPONSE_TYPE}&scope=${VITE_SCOPE}&state=${VITE_STATE}#wechat_redirect`
    )
  }
})

export default router
