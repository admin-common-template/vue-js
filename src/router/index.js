import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@store/user'
import childrens from './children'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'App',
      component: () => import('@/layout/index.vue'),
      redirect: { name: 'refresh' },
      children: [
        {
          path: '/',
          name: 'refresh',
          component: () => import('@/components/Refresh.vue'),
        },
        ...childrens,
        {
          path: '/notFund',
          name: 'notFund',
          component: () => import('@/components/NotFund.vue'),
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
      redirect: { name: 'notFund' },
    },
  ],
})

// 路由跳转拦截
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  // 如果用户未登录且前往页面不是登录页则直接跳转登录页
  if (to.name === 'Login') {
    next()
  } else if (!userStore.userInfo.nick_name) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
