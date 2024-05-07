import { createRouter, createWebHistory } from 'vue-router'
import adminRoutes from './admin'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home.vue')
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('@/views/orders.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login.vue')
    },
    ...adminRoutes
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    next({ name: 'login' })
    return
  }

  next()
})

export default router
