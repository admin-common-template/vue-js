import axios from 'axios'
import qs from 'qs'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
axios.defaults.baseURL = '/api/' // 添加统一代理前缀

const pendingRequest = new Map() // 请求对象
const { CancelToken } = axios

// 获取请求key
function getReqKey(config) {
  // 请求方式、请求地址、请求参数生成的字符串来作为是否重复请求的依据
  if (!config) return ''
  const { url, data } = config // 解构出来这些参数
  const newData = typeof data === 'object' ? qs.stringify(data) : data
  const requestKey = [url, newData].join('&')
  return requestKey
}

// 取消重复请求
function removeReqKey(key) {
  const cancelToken = pendingRequest.get(key)
  if (!cancelToken) return
  cancelToken(key) // 取消之前发送的请求
  pendingRequest.delete(key) // 请求对象中删除requestKey
}

// 添加请求拦截器
axios.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    // 获取请求key
    const requestKey = getReqKey(qs.parse(qs.stringify(config)))
    // 判断是否是重复请求
    if (pendingRequest.has(requestKey)) { // 是重复请求
      removeReqKey(requestKey) // 取消
    }
    config.cancelToken = new CancelToken((cancel) => {
      pendingRequest.set(requestKey, cancel) // 设置
    })
    return config
  },
  (error) => {
    const requestKey = getReqKey(error.config)
    removeReqKey(requestKey)
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// 添加响应拦截器
axios.interceptors.response.use(
  (res) => {
    // 请求对象中删除requestKey
    const requestKey = getReqKey(res.config)
    removeReqKey(requestKey)
    const { data } = res
    // 对响应数据做点什么
    return data
  },
  (error) => {
    // 请求对象中删除requestKey
    const requestKey = getReqKey(error.config)
    removeReqKey(requestKey)
    // 对响应错误做点什么
    return Promise.reject(error)
  },
)

export default axios
