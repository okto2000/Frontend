<template>
  <div
    class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20"
  >
    <h2 class="text-2xl font-bold tracking-tight text-gray-900">Produk →</h2>
    <div
      class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
    >
      <div
        v-for="product in products"
        :key="product.id"
        class="group lg:shadow-lg"
      >
        <div
          class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <img
            class="p-8 rounded-t-lg"
            :src="product.image"
            :alt="product.name"
          />
          <div class="px-5 pb-5">
            <h5
              class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white"
            >
              {{ product.product_name }}
            </h5>
            <div class="flex items-center mt-2.5 mb-5">
              <div
                class="flex items-center space-x-1 rtl:space-x-reverse"
              ></div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-1xl font-bold bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded">{{
                product.price.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })
              }}</span>
              <Buttoncart @click="addToCart(product)"> Add to cart </Buttoncart>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Buttoncart from "@/components/Button/AddCart.vue";
import { fetchProductsData } from "@/helpers/apiService";
export default {
  components: {
    Buttoncart,
  },
  data() {
    return {
      products: [],
    };
  },
  created() {
    this.fetchProducts(this.products);
  },
  methods: {
    async fetchProducts() {
      try {
        const { products } = await fetchProductsData();
        this.products = products;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    isExists(id) {
      var isexists = false;
      var index = null;
      var carts = JSON.parse(localStorage.getItem("cart"));
      for (var i = 0; i < carts.length; i++) {
        if (carts[i].id == id) {
          isexists = true;
          index = i;
        }
      }
      return {
        status: isexists,
        data: index,
      };
    },
    addToCart(obj) {
      var cart = JSON.parse(localStorage.getItem("cart"));
      if (!cart) {
        localStorage.setItem("cart", JSON.stringify([]));
      }
      var carts = JSON.parse(localStorage.getItem("cart"));
      var status = this.isExists(obj.id);
      if (status.status == true) {
        console.log("EXISTS", carts[status.data], carts);
        carts[status.data].quantity++;
      } else {
        carts.push({ ...obj, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(carts));
      // console.log("cart",localStorage.getItem("cart"));
    },
  },
};
</script>
