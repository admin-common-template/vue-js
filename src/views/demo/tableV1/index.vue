<script setup name="tableV1">
import { colTable1 } from '@column/components'
import { getV1 } from '@api/index'
import { domHeight } from '@/common/config'

const status = {
  0: '封禁',
  1: '正常',
}

const operateBox = ref(null)

const operate = reactive({
  promotionChannel: [],
  tableData: [],
})
// 状态显示相关
const commons = reactive({
  type: '',
  title: '',
  loading: false,
  modalLoading: false,
  maxHeight: 0,
  pages: {
    page: 1,
    limit: 20,
    count: 0,
  },
})

// 获取搜索部分dom高度
function getDomHeight() {
  commons.maxHeight = domHeight.pageHeight - domHeight.cardPadding - operateBox.value.offsetHeight
}

function doSearch() {
  commons.loading = true
  const sendData = {
    page: commons.pages.page,
    limit: commons.pages.limit,
  }
  getV1(sendData).then((res) => {
    commons.loading = false
    const { code, data, count } = res
    if (code === 0) {
      commons.pages.count = count
      data.map((item, i) => {
        if ([5, 8, 11].includes(i)) {
          item.rowClassName = 'test-table-style'
        }
      })
      operate.tableData = data
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
  operate.select = rows.map((item) => item.id).join(',')
}

// 分页参数改变
function changePage(newPage) {
  commons.pages = newPage
  doSearch()
}

function handleOperate(type, data) {
  console.log('-handleOperate-', type, data)
}

function handleStatus(type) {
  const sendData = operate.select
  console.log(type, sendData)
}
</script>

<template>
    <el-card class="mt-3">
        <div ref="operateBox" class="operate-box">
          <el-button type="danger" @click="handleStatus('lock')">封禁</el-button>
        </div>
        <TableV1 :data="operate.tableData" :columns="colTable1(status)" :max-height="commons.maxHeight" :loading="commons.loading" :pages="commons.pages" @selection-change="changeSelect" @changePage="changePage">
          <template #address="scope">
              <div style="color: red">{{ scope.row.address }}</div>
          </template>
          <template #default="scope">
              <template v-if="scope.row.group_id !== 0">
                <el-button type="primary" size="small" @click="handleOperate('edit', scope)">编辑</el-button>
                <el-button type="danger" size="small" @click="handleOperate('del', scope)">删除</el-button>
              </template>
              <span v-else>--</span>
          </template>
        </TableV1>
    </el-card>
</template>
