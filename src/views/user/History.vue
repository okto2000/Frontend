<template>
  <div class="lg:flex space-x-2 lg:mx-auto container">
    <Sidebar />
    <div
      class="p-6 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="flex space-x-2 lg:space-x-4 items-center p-1 lg:p-2">
        <h1 class="hidden sm:block text-base font-semibold">Status</h1>
        <ButtonStatus type="primary" @click="filterStatus('All')">Semua</ButtonStatus>
        <div class="flex-none">
          <ButtonStatus type="primary" @click="filterStatus('Belum Dibayar')">Belum Dibayar</ButtonStatus>
        </div>
        <div class="flex-none">
          <ButtonStatus type="primary" @click="filterStatus('Sudah Dibayar')">Sudah Dibayar</ButtonStatus>
        </div>
        <div class="flex-none">
          <ButtonStatus type="primary" @click="filterStatus('Selesai')">Selesai</ButtonStatus>
        </div>
      </div>
      <div
        v-for="order in orders"
        :key="order.id"
        class="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-2"
      >
        <div class="flex justify-start space-x-2 items-center p-2">
          <img src="@/assets/img/shopbagoutline.svg" class="w-5 h-5 mr-2" />
          <h3 class="font-medium">Belanja</h3>
          <p class="">11 Nov 2023</p>
          <span
            class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded"
            >{{order.status}}</span
          >
        </div>
        <div class="flex space-x-2 justify-between rounded-lg items-center p-2">
          <div>
            <img
              class="object-cover w-full rounded-t-lg h-16 md:h-auto md:w-16 md:rounded-none md:rounded-s-lg"
              :src="order.imageSrc"
              alt=""
            />

          </div>
          <div class="flex-col w-full px-4">
            <h5
              class="text-md font-semibold tracking-tight text-gray-900 dark:text-white"
            >
              {{ order.name }}
            </h5>
            <p class="text-sm font-normal text-gray-400">
              {{ order.tipe }}
            </p>
            <p class="text-sm font-normal text-gray-400">
              {{
                order.price.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })
              }}
            </p>
          </div>
          <div class="border-l-2 justify-between px-2">
            <div class="ml-2 text-sm font-normal text-gray-400">
              Total Harga
              <h3 class="text-sm font-bold text-gray-700">
                {{
                  order.price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })
                }}
              </h3>
            </div>
          </div>
        </div>
        <div class="flex justify-end">
          <CardDetail />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar/UserSidebar.vue";
import CardDetail from "@/components/Cards/CardDetail.vue";
import ButtonStatus from "@/components/Button/Status.vue";
import Shopbag from "@/assets/img/shopbagoutline.svg";

export default {
  components: {
    Sidebar,
    CardDetail,
    ButtonStatus,
    Shopbag,
  },
  data() {
    return {
      orders: [],
    };
  },
  created() {
    for (let index = 0; index < 8; index++) {
      this.orders.push({
        id: index,
        name: "Produk " + index,
        imageSrc: "src/assets/img/pngwing.png",
        price: 35000,
        tipe: index % 2 == 0 ? "Pelayanan" : "Barang",
        status: index % 3 === 0 ? "Belum Dibayar" : index % 3 === 1 ? "Sudah Dibayar" : "Selesai",
      });
    }
  },
};
</script>
