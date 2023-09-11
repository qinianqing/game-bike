import { GET, PUT } from "@/utils/request"

export const UserInfo = data =>
  GET({
    url: "/api/users",
    data
  })

export const ShareGame = data =>
  PUT({
    url: "/api/users",
    data
  })
