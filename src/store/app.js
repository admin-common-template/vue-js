import { defineStore } from 'pinia'
import { deviceType } from '@/common/tools'

export const useAppStore = defineStore('app', {
  state: () => ({
    device: deviceType(),
    count: 1,
  }),
  persist: {
    enabled: true,
  },
})
