const userRouter = [
  {
    path: "/users/rank",
    name: "users-rank",
    component: () => import("@/views/users/rank.vue")
  }
]
export default userRouter
