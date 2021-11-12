import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/layout-demo',
    name: 'layout-demo',
    component: () => import('@/pages/layout-demo.vue')
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('@/pages/layout.vue'),
    children: [
      {
        path: '',
        redirect: { name: 'demo' }
      },
      {
        path: 'demo',
        name: 'demo',
        component: () => import('@/pages/demo.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
