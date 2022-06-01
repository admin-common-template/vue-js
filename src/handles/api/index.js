import axios from '@/common/request'

// 登录
export const login = (data) => axios.request({ method: 'POST', url: 'index/UserLogin', data })
// 退出登录
export const userLogout = (data) => axios.request({ method: 'POST', url: 'index/UserLogout', data })

// 获取菜单列表
export const getMenu = (params) => axios.request({ method: 'GET', url: 'index/GetMenu', params })

// 获取V1表格列表
export const getV1 = (params) => axios.request({ method: 'GET', url: 'components/V1', params })
