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
]

// 导出所有子菜单name和path
export const childInfo = Object.fromEntries(childList.map((item) => [item.name, item.path]))

export default childList
