import Mock from 'mockjs'
import { config, transParams } from '../mockConfig'

// 表格数据
export const data1 = (params) => {
  const { page = 1, limit = config.limit } = transParams(params)
  const total = 3700
  const startIndex = (page - 1) * limit // 开始下标
  const endIndex = (startIndex + limit) < total ? (startIndex + limit) : total // 结束下标
  const list = Mock.mock({
    [`data|${total}`]: [{
      'id|+1': 1,
      date: '@datetime',
      name: '@cname',
      'status|0-1': 1,
      address: '@county(true)',
    }],
  })
  const response = {
    code: 0,
    count: total,
    data: list.data.slice(startIndex, endIndex),
    msg: '',
  }
  return response
}

// 对话框数据
export const data2 = (params) => {
  const { page = 1, limit = config.limit } = transParams(params)
  const total = 12
  const startIndex = (page - 1) * limit // 开始下标
  const endIndex = (startIndex + limit) < total ? (startIndex + limit) : total // 结束下标
  const list = Mock.mock({
    [`data|${total}`]: [{
      'id|+1': 1,
      date: '@datetime',
      name: '@cname',
    }],
  })
  const response = {
    code: 0,
    count: total,
    data: list.data.slice(startIndex, endIndex),
    msg: '',
  }
  return response
}
