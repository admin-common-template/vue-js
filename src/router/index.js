import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'App',
      component: () => import('@/App.vue'),
    },
  ],
})

export default router
