import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/auth/LoginPage.vue'
import Register from '@/views/auth/Register.vue'
import UserLayout from '@/components/layout/UserLayout.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import Dashboard from '@/views/admin/Dashboard.vue'
import Produk from '@/views/admin/Produk.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: UserLayout,
      children: [
        {     
        path: '/',
        name: 'home',
        component: HomeView
      },
      {
        path: '/login',
        name: 'login',
        component: LoginView
      },    
      {
        path: '/register',
        name: 'register',
        component: Register
      }    
      ]
    },
    {
      path: '/',
      component: AdminLayout,
      children: [
        {
          path: '/admin',
          name: 'admin',
          component: Dashboard
        },
        {
          path: '/admin/produk',
          name: 'produk',
          component: Produk
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router