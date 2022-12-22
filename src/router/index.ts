import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../pages/HomePage.vue')
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: () => import('../pages/StatisticsPage.vue')
    },
    {
      path: '/configuration',
      name: 'configuration',
      component: () => import('../pages/ConfigurationPage.vue')
    }
  ]
})

export default router
