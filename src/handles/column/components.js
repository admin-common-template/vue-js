import { column } from '@/common/config'

// 表格示例
export const colTable1 = (status = {}) => [
  { type: 'selection', align: 'center', width: column.check, fixed: 'left', selectable: (row) => row.group_id !== 0 },
  { property: 'id', label: 'ID', align: 'center', minWidth: column.sort },
  { property: 'name', label: '姓名', align: 'center', minWidth: column.name, className: 'test-table-style' },
  { property: 'date', label: '生日', align: 'center', minWidth: column.date },
  { slots: 'address', label: '住址', align: 'center', minWidth: column.url, showOverflowTooltip: true },
  { property: 'status', label: '状态', align: 'center', minWidth: column.status, formatter: (row) => status[row.status] },
  { slots: 'default', label: '操作', align: 'center', fixed: 'right', width: 120 },
]
