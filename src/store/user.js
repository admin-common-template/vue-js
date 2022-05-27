import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user_info: {},
  }),
  actions: {
    async setUserInfo(info) {
      this.user_info = info
      return Promise.resolve()
    },
  },
  persist: {
    enabled: true,
  },
})
