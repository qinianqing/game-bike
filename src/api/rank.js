import { GET } from "@/utils/request"

export const RankList = data =>
  GET({
    url: "/api/game",
    data
  })
