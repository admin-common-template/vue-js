import { defineStore } from 'pinia'
import { getMenu } from '@api/index'
import { menuTree } from '@/common/utils'

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
