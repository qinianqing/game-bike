const homeRouter = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/home/HomeView.vue")
  }
]
export default homeRouter
