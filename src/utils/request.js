import axios from "axios"
import { showToast, showLoadingToast, closeToast } from "vant"

//超时时间
const TIMEOUT = 2000

//超时提示语
const TIMEOUT_MESSAGE = "服务器链接超时，请耐心等待~"

//错误枚举
const ERROR_ENUMS = {
  404() {
    showToast({
      message: "请求不存在",
      duration: 1000,
      forbidClick: true
    })
  }
}

const errorResponse = code => {
  return code
    ? ERROR_ENUMS?.code()
    : showToast({
        message: TIMEOUT_MESSAGE,
        duration: 1000,
        forbidClick: true
      })
}

//定义header
const _headers = {
  Accept: "application/json",
  "Content-Type": "application/json; charset=utf-8"
}

//显示加载框
const showLoad = (message = "加载中...") => {
  if (message && typeof message === "string") {
    showLoadingToast({
      message,
      forbidClick: true,
      duration: 0
    })
  }
}

//隐藏加载框
const hideLoad = () => closeToast()

let request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: _headers,
  timeout: TIMEOUT
})

//请求拦截器
request.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

//响应拦截器
request.interceptors.response.use(
  res => {
    hideLoad()
    if (res.status !== 200) {
      return Promise.reject(res)
    }
    console.log("24442222", res.data.data)
    return Promise.resolve(res.data.data)
  },
  error => {
    console.log("errrr", error)
    errorResponse([`${error?.response?.status}`])
    return Promise.reject(error)
  }
)

const REQUEST = ({ isLoad, ...options }) => {
  if (process.env.NODE_ENV === "development") {
    console.table({ url: options.url, ...options.params, ...options.data })
  }
  isLoad && showLoad()

  return request({ ...options })
}

/**
 * @method 请求get方法
 * @param {Sting} url
 * @param {Object} data
 */
const GET = (opt = {}) => {
  let option = {
    method: "get",
    url: opt.url,
    params: opt.data,
    isLoad: opt.isLoad !== undefined ? opt.isLoad : true
  }
  return REQUEST(option)
}

/**
 * @method 请求post方法
 * @param {Sting} url
 * @param {Object} data
 */
const POST = (opt = {}) => {
  let option = {
    method: "post",
    url: opt.url,
    data: opt.data,
    isLoad: opt.isLoad !== undefined ? opt.isLoad : true
  }
  return REQUEST(option)
}

/**
 * @method 请求put方法
 * @param {Sting} url
 * @param {Object} data
 */
const PUT = (opt = {}) => {
  let option = {
    method: "put",
    url: opt.url,
    data: opt.data
  }
  return REQUEST(option)
}

/**
 * @method 请求delete方法
 * @param {Sting} url
 * @param {Object} data
 */
const DELETE = (opt = {}) => {
  let option = {
    method: "delete",
    url: opt.url,
    data: opt.data
  }
  return REQUEST(option)
}

export { GET, POST, PUT, DELETE }
