<script setup name="dialogs">
import { colDialog } from '@column/components'
import { getDialog } from '@api/index'
import { domHeight } from '@/common/config'
import Dialog from './Dialog.vue'

const operateBoxRef = ref(null)
const dialogRef = ref(null)
// 表格相关属性事件
const tableOption = reactive({
  loading: false,
  data: [],
  columns: colDialog,
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
  getDialog(sendData).then((res) => {
    tableOption.loading = false
    const { code, data, count } = res
    if (code === 0) {
      tableOption.pages.count = count
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

function handleOperate(type, data = {}) {
  const sendObj = {
    type,
  }
  if (['edit', 'del', 'black'].includes(type)) {
    sendObj.oldData = data
  }
  dialogRef.value.openDialog(sendObj)
}

function handleStatus(type) {
  const sendData = tableOption.select
  if (!sendData.length) {
    return ElMessage.warning('请选择禁用用户')
  }
  handleOperate(type, sendData)
}

function reSearch() {
  tableOption.pages.page = 1
  tableOption.pages.limit = 20
  doSearch()
}

</script>

<template>
  <el-card class="h-full">
    <div ref="operateBoxRef" class="operate-box">
      <el-button type="danger" @click="handleStatus('black')">禁用</el-button>
    </div>
    <TableV1 v-bind="tableOption" @selection-change="changeSelect" @changePage="changePage">
      <template #default="scope">
        <el-button type="primary" size="small" @click="handleOperate('edit', scope.row)">编辑</el-button>
        <el-button type="danger" size="small" @click="handleOperate('del', scope.row)">删除</el-button>
      </template>
    </TableV1>
    <Dialog ref="dialogRef" @reSearch="reSearch" />
  </el-card>
</template>
