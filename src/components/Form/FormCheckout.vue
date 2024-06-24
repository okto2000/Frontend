<template>
  <div>
    <main class="sm:flex mx-auto max-w-7xl px-6 lg:px-8">
      <form class="mx-auto rounded-lg shadow-xl px-4 py-16 sm:px-6 lg:px-8 w-full">
        <div class="space-y-12">
            <h2 class="text-base font-semibold leading-7 text-gray-900">Delivery information</h2>
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
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="user.alamat"
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
          <button @click="pay"
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
import buttoncheckout from "@/components/Button/Status.vue";
export default {
  data() {
    return {
      selected: {},
      user: JSON.parse(localStorage.getItem("user")) || {},
      user: {
        // password: "",
        telepon: "",
        alamat: "",
      },
    }
  },
  components:{
    buttoncheckout
  },
  created() {
    this.loadUser();
  },
  methods:{
    loadUser() {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        this.user = JSON.parse(storedUser);
      }
    },
    pay(){
      snap.pay('d56646fa-3c67-44da-bcd1-43f56cc7c6dc');
    }
  }
  }
</script>