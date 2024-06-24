<template>
  <div class="container mx-auto">
    <h3 class="text-lg font-bold">Shopping Cart</h3>
    <div class="group relative">
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table
          class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-16 py-3">
                <span class="sr-only">Image</span>
              </th>
              <th scope="col" class="px-6 py-3">Product</th>
              <th scope="col" class="px-16 py-3">Qty</th>
              <th scope="col" class="px-6 py-3">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="product in products"
              :key="product.id"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td class="p-4">
                <img
                  :src="product.imageSrc"
                  :alt="product.imageAlt"
                  class="w-16 md:w-32 max-w-full max-h-full"
                />
              </td>
              <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {{ product.name }}
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <button
                    @click="decrement(product)"
                    class="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    type="button"
                  >
                    <span class="sr-only">Quantity button</span>
                    <svg
                      class="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 2"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 1h16"
                      />
                    </svg>
                  </button>
                  <div>
                    <input
                      type="number"
                      v-model="product.quantity"
                      id="first_product"
                      class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="1"
                      required
                    />
                  </div>
                  <button
                    @click="increment(product)"
                    class="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    type="button"
                  >
                    <span class="sr-only">Quantity button</span>
                    <svg
                      class="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </button>
                </div>
              </td>
              <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {{ getSubtotal(product).toLocaleString('id-ID',{ style: 'currency', currency: 'IDR' }) }}
              </td>
            </tr>
          </tbody>
          <tfoot
            class="bg-white border-t dark:bg-gray-800 dark:border-gray-700"
          >
            <tr>
              <th
                scope="col"
                colspan="3"
                class="px-6 py-3 text-base text-right"
              >
                Total
              </th>
              <td
                class="px-6 py-4 font-semibold text-gray-900 dark:text-white"
              >
              {{ totalPrice.toLocaleString('id-ID',{ style: 'currency', currency: 'IDR' }) }}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    <FormCheckout/>
  </div>
</template>
<script>
import FormCheckout from "@/components/Form/FormCheckout.vue";
export default {
  components:{
    FormCheckout
  },
  data() {
    return {
      quantity: [],
      products: [],
      selected: {},
    };
  },
  created() {
    this.products = this.carts;
    console.log(localStorage.getItem("cart"));
    console.log("product", this.products);
  },
  computed: {
    carts() {
      if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", JSON.stringify([]));
      }
      return JSON.parse(localStorage.getItem("cart"));
    },
    totalPrice() {
      return this.products.reduce((total, product) => {
        return total + (product.price * product.quantity);
      }, 0);
    },
  },
  methods: {
    getSubtotal(product) {
      const subtotal = product.price * product.quantity;
      return subtotal;
    },
    increment(obj) {
      obj.quantity++;
      localStorage.setItem("cart", JSON.stringify(this.products));
    },
    decrement(obj) {
      if (obj.quantity) {
        obj.quantity--;
        localStorage.setItem("cart", JSON.stringify(this.products));
      if (obj.quantity < 1) {
            const index = this.products.indexOf(obj);
            if (index == 0) {
                this.products.splice(index, 1);
            }
      }  
      localStorage.setItem("cart", JSON.stringify(this.products));
    }
    },
  },
};
</script>
