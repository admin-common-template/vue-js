import { config } from './mockConfig'
import { data1, data2 } from './data/components'

// 表格
const v1 = {
  url: '/api/components/v1',
  method: 'get',
  timeout: config.timeout,
  response: ({ query }) => data1(query),
}

// 对话框 - 列表
const Dialog = {
  url: '/api/components/getDialog',
  method: 'get',
  timeout: config.timeout,
  response: ({ query }) => data2(query),
}
// 对话框 - 编辑
const DialogEdit = {
  url: '/api/components/editDialog',
  method: 'post',
  timeout: config.timeout,
  response: ({ body }) => {
    console.log(body)
    return {
      code: 0,
      data: {},
      msg: '操作成功',
    }
  },
}
// 对话框 - 删除
const DialogDel = {
  url: '/api/components/delDialog',
  method: 'post',
  timeout: config.timeout,
  response: ({ body }) => {
    console.log(body)
    return {
      code: 0,
      data: {},
      msg: '操作成功',
    }
  },
}
// 对话框 - 禁用
const DialogBlack = {
  url: '/api/components/blackDialog',
  method: 'post',
  timeout: config.timeout,
  response: ({ body }) => {
    console.log(body)
    return {
      code: 0,
      data: {},
      msg: '操作成功',
    }
  },
}

export default [
  v1,
  Dialog,
  DialogEdit,
  DialogDel,
  DialogBlack,
]
