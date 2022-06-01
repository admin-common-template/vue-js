<script setup name="Pagination">
import { pageSizeOpts } from '@/common/config'

const props = defineProps({
  page: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['changePage'])

// 改变分页参数
function changePage(type, value) {
  const sendData = JSON.parse(JSON.stringify(props.page))
  if (sendData[type] === value) return
  sendData[type] = value
  if (type === 'limit') sendData.page = 1
  emit('changePage', sendData)
}
</script>

<template>
  <el-pagination
      v-if="page.count"
      background
      :page-sizes="pageSizeOpts"
      :page-size="page.limit"
      :current-page="page.page"
      :total="page.count"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="(e) => changePage('limit', e)"
      @current-change="(e) => changePage('page', e)"></el-pagination>
</template>
