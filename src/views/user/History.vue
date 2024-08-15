<template>
  <div class="lg:flex space-x-2 lg:mx-auto container">
    <Sidebar />
    <div
      class="p-6 w-full bg-white btransaction btransaction-gray-200 rounded-lg shadow dark:bg-gray-800 dark:btransaction-gray-700"
    >
      <div class="flex space-x-2 lg:space-x-4 items-center p-1 lg:p-2">
        <h1 class="hidden sm:block text-base font-semibold">Status</h1>
        <ButtonStatus type="primary" @click="filterStatus('All')"
          >Semua</ButtonStatus
        >
        <div class="flex-none">
          <ButtonStatus type="primary" @click="filterStatus('Belum Dibayar')"
            >Belum Dibayar</ButtonStatus
          >
        </div>
        <div class="flex-none">
          <ButtonStatus type="primary" @click="filterStatus('Sudah Dibayar')"
            >Sudah Dibayar</ButtonStatus
          >
        </div>
        <div class="flex-none">
          <ButtonStatus type="primary" @click="filterStatus('Selesai')"
            >Selesai</ButtonStatus
          >
        </div>
      </div>
      <div
        v-for="transaction in transactions"
        :key="transaction.id"
        class="p-6 bg-white btransaction btransaction-gray-200 rounded-lg shadow dark:bg-gray-800 dark:btransaction-gray-700 mb-2"
      >
        <div class="flex justify-start space-x-2 items-center p-2">
          <img src="@/assets/img/shopbagoutline.svg" class="w-5 h-5 mr-2" />
          <h3 class="font-medium">Belanja</h3>
          <p class=""></p>
          <span
            class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded"
            >{{ transaction.status }}</span
          >
        </div>
        <div class="flex space-x-2 justify-between rounded-lg items-center p-2">
          <div>
            <img
              class="object-cover w-full rounded-t-lg h-16 md:h-auto md:w-16 md:rounded-none md:rounded-s-lg"
              :src="transaction.product_image"
              alt=""
            />
          </div>
          <div class="flex-col w-full px-4">
            <h5
              class="text-md font-semibold tracking-tight text-gray-900 dark:text-white"
            >
              {{ transaction.product_name }}
            </h5>
            <p class="text-sm font-normal text-gray-400">
              {{ transaction.tipe }}
            </p>
            <p class="text-sm font-normal text-gray-400">
              {{
                transaction.product_price.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })
              }}
            </p>
          </div>
          <div class="btransaction-l-2 justify-between px-2">
            <div class="ml-2 text-sm font-normal text-gray-400">
              Total Harga
              <h3 class="text-sm font-bold text-gray-700">
                {{
                  transaction.total.toLocaleString("id-ID", {
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
import { getTransactionsDetails } from "@/helpers/apiService";

export default {
  components: {
    Sidebar,
    CardDetail,
    ButtonStatus,
    Shopbag,
  },
  data() {
    return {
      snapToken: null,
      transactions: [],
    };
  },
  created() {
    this.fetchTransaction();
    this.snapToken = localStorage.getItem("snapToken");
  },
  methods: {
    async fetchTransaction() {
      try {
        const transactions = await getTransactionsDetails();
        this.transactions = transactions.data.data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
  },
};
</script>
