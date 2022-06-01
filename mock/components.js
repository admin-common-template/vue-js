import { config } from './mockConfig'
import { data1 } from './data/components'

// 表格
const v1 = {
  url: '/api/components/v1',
  method: 'get',
  timeout: config.timeout,
  response: ({ query }) => data1(query),
}

export default [
  v1,
]
