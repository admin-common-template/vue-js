<script setup name="tableV1">
import { colTable1 } from '@column/components'
import { getV1 } from '@api/index'
import { domHeight } from '@/common/config'

const status = {
  0: '封禁',
  1: '正常',
}

const operateBoxRef = ref(null)
// 表格相关属性事件
const tableOption = reactive({
  loading: false,
  data: [],
  columns: colTable1(status),
  maxHeight: 0,
  pages: {
    page: 1,
    limit: 20,
    count: 0,
  },
  select: [],
})

// 获取搜索部分dom高度
function getDomHeight() {
  tableOption.maxHeight = domHeight.pageHeight - operateBoxRef.value.offsetHeight
}

function doSearch() {
  tableOption.loading = true
  const sendData = {
    page: tableOption.pages.page,
    limit: tableOption.pages.limit,
  }
  getV1(sendData).then((res) => {
    tableOption.loading = false
    const { code, data, count } = res
    if (code === 0) {
      tableOption.pages.count = count
      data.map((item, i) => {
        if ([5, 8, 11].includes(i)) {
          item.rowClassName = 'test-table-style'
        }
      })
      tableOption.data = data
    }
  })
}

onBeforeMount(() => {
  doSearch()
})

onMounted(() => {
  getDomHeight()
})

// 选中行发生变化
function changeSelect(rows) {
  tableOption.select = rows.map((item) => item.id)
}

// 分页参数改变
function changePage(newPage) {
  tableOption.pages = newPage
  doSearch()
}

function handleOperate(type, data) {
  console.log('-handleOperate-', type, data)
}

function handleStatus(type) {
  console.log(type)
}
</script>

<template>
  <el-card class="h-full">
    <div ref="operateBoxRef" class="operate-box">
      <el-button type="danger" @click="handleStatus('lock')">封禁</el-button>
    </div>
    <TableV1 v-bind="tableOption" @selection-change="changeSelect" @changePage="changePage">
      <template #address="scope">
        <div style="color: red">{{ scope.row.address }}</div>
      </template>
      <template #default="scope">
        <el-button type="primary" size="small" @click="handleOperate('edit', scope)">编辑</el-button>
        <el-button type="danger" size="small" @click="handleOperate('del', scope)">删除</el-button>
      </template>
    </TableV1>
  </el-card>
</template>
