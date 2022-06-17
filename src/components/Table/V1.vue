<script setup name="CustomTable">
import { domHeight } from '@/common/config'

const emit = defineEmits(['changePage'])

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  columns: Array,
  maxHeight: [String, Number],
  pagination: {
    type: Boolean,
    default: true,
  },
  pages: {
    type: Object,
    default: () => ({}),
  },
})

const tableMaxHeight = computed(() => {
  const { maxHeight, pagination } = props
  if (maxHeight) {
    return `${pagination ? maxHeight - domHeight.pagination : maxHeight}px`
  }
  return '100%'
})
</script>

<template>
  <el-table highlight-current-row border stripe :row-class-name="({row={}}) => row.rowClassName || ''" v-loading="props.loading" v-bind="$attrs" :max-height="tableMaxHeight" :scrollbar-always-on="true">
    <template v-for="(col, i) in props.columns">
      <el-table-column v-if="col.slots" :name="col.slots" v-bind="col" :key="i">
        <template #default="scope">
          <slot :name="col.slots" v-bind="scope"></slot>
        </template>
      </el-table-column>
      <el-table-column v-else v-bind="col" :key="i+'default'"></el-table-column>
    </template>
    <template #empty>
      <span>{{props.loading ? '加载中' : '暂无数据'}}</span>
    </template>
  </el-table>
  <Pagination v-if="props.pagination" :page="props.pages" @changePage="(newPage) => emit('changePage', newPage)" />
</template>
