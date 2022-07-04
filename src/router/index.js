import { createRouter, createWebHashHistory } from 'vue-router'
import todoPage from '../views/todoPage.vue'

const routes = [
  {
    path: '/',
    name: 'todoPage',
    component: todoPage
  },
  {
    path: '/addPage',
    name: 'addPage',
    component: () => import(/* webpackChunkName: "add" */ '../views/addPage.vue')
  },
  {
    path: '/statsPage',
    name: 'statsPage',
    component: () => import(/* webpackChunkName: "add" */ '../views/statsPage.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
