import { createRouter, createWebHistory } from 'vue-router'
// views for Admin layout
import Dashboard from '@/views/admin/Dashboard.vue'
import Produk from '@/views/admin/Product.vue'
import Admin from '@/views/admin/Admin.vue'
import Pesanan from '@/views/admin/Order.vue'
import Karyawan from '@/views/admin/Employee.vue'
import Pelanggan from '@/views/admin/Customer.vue'
import Kategori from '@/views/admin/Categorie.vue'

// views for Karyawan layout
import DashboardKaryawan from '@/views/karyawan/Dashboard.vue'
import PesananKaryawan from '@/views/karyawan/Pesanan.vue'

// layouts
import UserLayout from '@/components/layout/UserLayout.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import KaryawanLayout from '@/components/layout/EmployeeLayout.vue'

// views for Auth layout
import LoginView from '@/views/auth/LoginPage.vue'
import Register from '@/views/auth/Register.vue'

// views for User layout
import HomeView from '@/views/HomeView.vue'
import History from '@/views/user/History.vue'
import Profile from '@/views/user/Profile.vue'
import ShoppingCart from '@/views/user/ShoppingCart.vue'
import DashboardUser from '@/views/user/Dashboard.vue'

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
      },
      {

        path: '/shoppingcart',
        name: 'shopping cart',
        component: ShoppingCart
      },
      {

        path: '/profile',
        name: 'profile',
        component: Profile
      },
      {

        path: '/riwayatpesanan',
        name: 'riwayatpesanan',
        component: History
      },
      {

        path: '/dashboard',
        name: 'dashboard-user',
        component: DashboardUser
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
          path: '/admin/kategori',
          name: 'kategori',
          component: Kategori
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
      path: '/',
      component: KaryawanLayout,
      children: [
        {
          path: '/karyawan',
          name: 'dashboardkaryawan',
          component: DashboardKaryawan
        },
        {
          path: '/karyawan/pesanan',
          name: 'pesanankaryawan',
          component: PesananKaryawan
        },
      ]
    }
  ]
})

export default router