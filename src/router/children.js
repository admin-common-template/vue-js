const childList = [
  { // 首页
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
  },
  { // 图标
    path: '/icon',
    name: 'icon',
    component: () => import('@/views/demo/icon/index.vue'),
    meta: {
      keepAlive: true,
    },
  },
  { // 表格V1
    path: '/tableV1',
    name: 'tableV1',
    component: () => import('@/views/table/tableV1/index.vue'),
  },
  { // 对话框
    path: '/dialogs',
    name: 'dialogs',
    component: () => import('@/views/demo/dialog/index.vue'),
    meta: {
      keepAlive: true,
    },
  },
  { // 标签页
    path: '/tabs',
    name: 'tabs',
    component: () => import('@/views/demo/tabs/index.vue'),
  },
  /* ================== 图表 ================== */
  { // 折线图
    path: '/chartLine',
    name: 'chartLine',
    component: () => import('@/views/charts/line/index.vue'),
  },
  { // 折线图
    path: '/chartBar',
    name: 'chartBar',
    component: () => import('@/views/charts/bar/index.vue'),
  },
  { // 饼图
    path: '/chartPie',
    name: 'chartPie',
    component: () => import('@/views/charts/pie/index.vue'),
  },
  /* ================== 富文本 ================== */
  { // wangEditor
    path: '/wangEditor',
    name: 'wangEditor',
    component: () => import('@/views/editor/wangEditor/index.vue'),
  },
  /* ================== 日期时间选择 ================== */
  { // 日期选择
    path: '/datePicker',
    name: 'datePicker',
    component: () => import('@/views/date/datePicker/index.vue'),
  },
]

// 导出所有子菜单name和path
export const childInfo = Object.fromEntries(childList.map((item) => [item.name, item.path]))

// 导出所有子菜单keepAlive
export const cacheList = childList.filter((item) => item?.meta?.keepAlive).map((item) => item.name)

export default childList
