import axios from '@/common/request'

// 登录
export const login = (data) => axios.request({ method: 'POST', url: 'index/UserLogin', data })

// 退出登录
export const userLogout = (data) => axios.request({ method: 'POST', url: 'index/UserLogout', data })
