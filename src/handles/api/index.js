import axios from '@/common/request'

// 登录
export const login = (data) => axios.request({ method: 'POST', url: 'index/UserLogin', data })
// 退出登录
export const userLogout = (data) => axios.request({ method: 'POST', url: 'index/UserLogout', data })

// 菜单列表
export const getMenu = (params) => axios.request({ method: 'GET', url: 'index/GetMenu', params })

// V1表格列表
export const getV1 = (params) => axios.request({ method: 'GET', url: 'components/V1', params })

/* 对话框数据 */
// 列表
export const getDialog = (params) => axios.request({ method: 'GET', url: 'components/getDialog', params })
// 编辑
export const editDialog = (data) => axios.request({ method: 'POST', url: 'components/editDialog', data })
// 删除
export const delDialog = (data) => axios.request({ method: 'POST', url: 'components/delDialog', data })
// 禁用
export const blackDialog = (data) => axios.request({ method: 'POST', url: 'components/blackDialog', data })
