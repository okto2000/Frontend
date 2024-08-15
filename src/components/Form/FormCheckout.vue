<template>
  <div>
    <main class="sm:flex mx-auto max-w-7xl px-6 lg:px-8">
      <form
        class="mx-auto rounded-lg shadow-xl px-4 py-16 sm:px-6 lg:px-8 w-full"
      >
        <div class="space-y-12">
          <h2 class="text-base font-semibold leading-7 text-gray-900">
            Delivery information
          </h2>
          <div class="border-b border-gray-900/10 pb-12">
            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div class="col-span-full">
                <div class="mt-2">
                  <input
                    type="text"
                    name="street-address"
                    id="street-address"
                    autocomplete="street-address"
                    placeholder="Street address"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    v-model="user.alamat"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            class="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            @click="getSnapToken"
            type="button"
            class="px-4 py-2 rounded-lg outline outline-1 text-sky-400 hover:bg-sky-100 outline-sky-400 text-sm text-center inline-flex justify-center text-xs font-semibold"
          >
            Checkout
          </button>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import { getSnapToken } from "@/helpers/apiService";
import buttoncheckout from "@/components/Button/Status.vue";

export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")) || {
        telepon: "",
        alamat: "",
      },
      products: JSON.parse(localStorage.getItem("cart")) || [],
    };
  },
  components: {
    buttoncheckout,
  },
  created() {
    this.loadUser();
  },
  computed: {
    totalPrice() {
      return this.products.reduce((total, product) => {
        return total + product.price * product.quantity;
      }, 0);
    },
  },
  methods: {
    loadUser() {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        this.user = JSON.parse(storedUser);
      }
    },
    async getSnapToken() {
      try {
        const order = {
          order_id: this.user.id + Date.now(),
          gross_amount: this.totalPrice,
          items: this.products.map((product) => ({
            id: product.id,
            price: product.price,
            quantity: product.quantity,
            name: product.product_name,
          })),
          id_customer: this.user.id, // Pastikan field ini ada
          name: this.user.name, // Pastikan field ini ada
          email: this.user.email, // Pastikan field ini ada
          phone: this.user.notelp, // Pastikan field ini ada
          address: this.user.address, // Pastikan field ini ada
        };
        console.log("Order Data: ", order);
        const response = await getSnapToken(order);
        const token = response.data.token;
        localStorage.setItem("snapToken", token);
        snap.pay(token);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    },
  },
};
</script>