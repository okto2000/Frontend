<template>
  <div
    class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20"
  >
    <h2 class="text-2xl font-bold tracking-tight text-gray-900">Layanan →</h2>
    <div
      class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
    >
      <div v-for="product in products" :key="product.id" class="group lg:shadow-lg">
        <div
          class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <img
            class="p-8 rounded-t-lg"
            :src="product.imageSrc"
            :alt="product.imageAlt"
            alt="product image"
          />
          <div class="px-5 pb-5">
            <h5
              class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white"
            >
              {{ product.name }}
            </h5>
            <div class="flex items-center mt-2.5 mb-5">
              <div
                class="flex items-center space-x-1 rtl:space-x-reverse"
              ></div>
              <span
                class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3"
                >{{ product.tipe }}</span
              >
            </div>
            <div class="flex items-center justify-between">
              <span class="text-1xl font-bold text-gray-900 dark:text-white">{{
                product.price.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })
              }}</span>
              <Buttoncart
                @click="addToCart(product)"
              >
                Add to cart
              </Buttoncart>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Buttoncart from "@/components/Button/AddCart.vue";
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
    for (let index = 0; index < 8; index++) {
      this.products.push({
        id: index,
        name: "Layanan " + index,
        imageSrc:
          "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//106/MTA-86138476/oem_oem_one-c566_kalung_kucing_lonceng_motif_jejak_kucing_cat_paw_-_kalung_lonceng_kucing_kitten_aksesoris_hewan_peliharaan_full02_juu7rv3a.jpg",
        imageAlt: "Front of men's Basic Tee in black.",
        price: 35000,
        tipe: index % 2 == 0 ? "Pelayanan" : "Barang",
      });
    }
  },
  methods: {
    // slicedProducts() {
    //   return this.products.slice((product) => product.tipe === "Layanan");
    // },
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
