<template>
  <aside
    id="default-sidebar"
    class="hidden sm:ml-6 sm:block rounded-lg w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 shadow-md border"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 py-4 bg-white-300">
      <ul class="space-y-2 font-medium">
        <li>
          <a
            v-for="item in navigation"
            :key="item.name"
            :href="item.href"
            class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-cyan-100 group"
          >
            <img :src="item.image" alt="" class="w-6 h-6 mr-2" />
            <span class="flex-1 ms-3 whitespace-nowrap">{{
              item.name
            }}</span></a
          >
        </li>
      </ul>
    </div>
  </aside>
  <nav class="sm:hidden bg-white rounded-lg shadow">
    <div class="max-w-screen-xl px-4 py-3 mx-auto">
      <div class="flex justify-center items-center">
        <ul class="space-y-2 font-normal">
          <li>
            <a
              v-for="item in navigation"
              :key="item.name"
              :href="item.href"
              class="items-center p-2 text-gray-900 rounded-lg hover:bg-cyan-100 group"
            >
              {{ item.name }}</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      navigation: [
        {
          name: "Dashboard",
          href: "/dashboard",
          image: "src/assets/img/user.svg",
        },
        {
          name: "Pengaturan Akun",
          href: "/profile",
          image: "src/assets/img/user.svg",
        },
        {
          name: "Riwayat Pesanan",
          href: "/riwayatpesanan",
          image: "src/assets/img/shopbag.svg",
        },
      ],
    };
  },
};
</script>
