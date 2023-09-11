import { POST, GET } from "@/utils/request"

export const GameReport = data =>
  POST({
    url: "/api/game",
    data
  })

export const getPrize = data =>
  GET({
    url: "/api/prize",
    data
  })
