import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
     {
    path: '/contact',
    name: 'contact',
    component: () => import(/* webpackChunkName: "about" */ '../views/ContactView.vue')
    },
    {
      path: '/calculator',
      name: 'calculator',
      component: () => import(/* webpackChunkName: "calculator" */ '../views/CalcView.vue')
    }
  ]
})

export default router
