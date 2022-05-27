import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
import { useUserStore } from '@store/user'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'App',
      component: Layout,
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('@/views/home/index.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/index.vue'),
    },
    {
      path: '/:pathMatch(.*)',
      redirect: { name: 'Login' },
    },
  ],
})

// 路由跳转拦截
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  // 如果用户未登录且前往页面不是登录页则直接跳转登录页
  if (to.name === 'Login') {
    next()
  } else if (!userStore.user_info.nick_name) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
