import { createRouter, createWebHistory } from 'vue-router'
import HomeLayout from '../views/layouts/HomeLayout.vue'
import AdminLayout from '../views/layouts/AdminLayout.vue'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'

import ProductView from '@/views/ProductView.vue'
import DashboardView from '@/views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeLayout,
      children:[
        {
          path: '',
          name: 'home',
          component: HomeView,
        },
        {
          path: '/about',
          name: 'about',
          component: AboutView,
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminLayout,
      children:[
        {
          path:"",
          name:"dashboard",
          component:DashboardView
        },
        {
          path:"/product",
          name:"product",
          component:ProductView
        }
      ]
    }
  ]
})

export default router
