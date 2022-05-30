import { defineStore } from 'pinia'
import { getMenu } from '@api/index'
import { menuTree } from '@/common/utils'
import { childInfo } from '@/router/children'
import router from '@/router/index.js'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    userInfo: {},
    menuList: [],
    buttonList: [],
    routesName: {},
  }),
  actions: {
    async setUserInfo(info) {
      this.userInfo = info
      return Promise.resolve()
    },
    async getUserMenu() {
      const { code, data } = await getMenu(this.userInfo)
      if (code === 0) {
        const { data: _data, button } = data
        const menus = menuTree(_data, 0)
        // 缓存菜单name对应title
        this.routesName = Object.fromEntries(_data.map((item) => ([item.only, item.title])))
        // 当前接口组件菜单路由名称
        const currentNameList = _data.filter((item) => item.type === 1).map((item) => item.only)
        // 本地所有组件菜单路由名称
        const localNameList = Object.keys(childInfo)
        // 需要移除的路由名称
        const removeList = localNameList.filter((item) => !currentNameList.includes(item))
        removeList.map((item) => router.removeRoute(item))
        this.menuList = menus
        this.buttonList = button
      }
      return Promise.resolve()
    },
  },
  persist: {
    enabled: true,
  },
})
