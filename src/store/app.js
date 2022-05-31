import { defineStore } from 'pinia'
import { deviceType } from '@/common/tools'

export const useAppStore = defineStore('app', {
  state: () => ({
    device: deviceType(),
    isCollapse: false,
  }),
  actions: {
    // 设置左侧导航菜单折叠状态
    setCollapse(value) {
      this.isCollapse = value
    },
  },
  persist: {
    enabled: true,
  },
})
