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
  },
  { // 表格V1
    path: '/tableV1',
    name: 'tableV1',
    component: () => import('@/views/table/tableV1/index.vue'),
  },
  { // 对话框
    path: '/dialog',
    name: 'dialog',
    component: () => import('@/views/demo/dialog/index.vue'),
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
]

// 导出所有子菜单name和path
export const childInfo = Object.fromEntries(childList.map((item) => [item.name, item.path]))

export default childList
