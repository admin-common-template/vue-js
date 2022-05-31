import { createRouter, createWebHashHistory } from 'vue-router'
import childrens from './children'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: () => import('@/layout/index.vue'),
      redirect: { name: 'RedirectToHome' },
      children: [
        {
          path: '/',
          name: 'RedirectToHome',
          component: () => import('@/components/RedirectToHome.vue'),
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
  const userInfo = JSON.parse(sessionStorage.getItem('user') || '{}')?.userInfo || {}
  // 如果用户未登录且前往页面不是登录页则直接跳转登录页
  if (to.name === 'Login') {
    next()
  } else if (!userInfo.nick_name) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
