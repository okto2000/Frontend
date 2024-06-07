import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/auth/LoginPage.vue'
import Register from '@/views/auth/Register.vue'
import UserLayout from '@/components/layout/UserLayout.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import Dashboard from '@/views/admin/Dashboard.vue'
import Produk from '@/views/admin/Produk.vue'
import Admin from '@/views/admin/Admin.vue'
import Pesanan from '@/views/admin/Pesanan.vue'
import Karyawan from '@/views/admin/Karyawan.vue'
import Pelanggan from '@/views/admin/Pelanggan.vue'
import History from '@/views/user/History.vue'
import ShoppingCart from '@/views/user/ShoppingCart.vue'

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
        path: '/shoppingcart',
        name: 'shopping cart',
        component: ShoppingCart
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
      },    
      {
        path: '/riwayat-pesanan',
        name: 'riwayat-pesanan',
        component: History
      }    
      ]
    },
    {
      path: '/',
      component: AdminLayout,
      children: [
        {
          path: '/admin',
          name: 'dashboard',
          component: Dashboard
        },
        {
          path: '/admin/produk',
          name: 'produk',
          component: Produk
        },
        {
          path: '/admin/pesanan',
          name: 'pesanan',
          component: Pesanan
        },
        {
          path: '/admin/admin',
          name: 'admin',
          component: Admin
        },
        {
          path: '/admin/pelanggan',
          name: 'pelanggan',
          component: Pelanggan
        },
        {
          path: '/admin/karyawan',
          name: 'karyawan',
          component: Karyawan
        },
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