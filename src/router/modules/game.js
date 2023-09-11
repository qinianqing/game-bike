const gameRouter = [
  {
    path: "/game",
    name: "game",
    component: () => import("@/views/game/GameStartView.vue")
  },
  {
    path: "/games",
    name: "games",
    component: () => import("@/views/modal/ModalSharePaper.vue")
  }
]
export default gameRouter
