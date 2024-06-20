<template>
  <form class="mx-auto">
    <div class="space-y-12">
      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-base font-semibold leading-7 text-gray-900">Profile</h2>
        <p class="mt-1 text-sm leading-6 text-gray-600">
          This information will be displayed publicly so be careful what you
          share.
        </p>
        <div class="col-span-full">
          <label
            for="photo"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Photo</label
          >
          <div class="mt-2 flex items-center gap-x-3">
            <img :src="user.picture" class="w-12 h-12" alt="" />
            <UserCircleIcon
              class="h-12 w-12 text-gray-300"
              aria-hidden="true"
            />
            <input
              type="file"
              accept="image/*"
              @change="changePhoto"
              class="hidden"
              ref="fileInput"
            />
            <button
              @click="$refs.fileInput.click()"
              type="button"
              class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Change
            </button>
          </div>
        </div>
        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-4">
            <label
              for="username"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Username</label
            >
            <div class="mt-2">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
              >
                <input
                  type="text"
                  name="username"
                  id="username"
                  autocomplete="username"
                  class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-600 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="username"
                  v-model="user.name"
                />
              </div>
            </div>
          </div>
          <!-- <div class="sm:col-span-4">
                <label
                  for="password"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Password</label
                >
                <div class="mt-2">
                  <div
                    class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                  >
                    <input
                      type="text"
                      name="password"
                      id="password"
                      autocomplete="password"
                      class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-600 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="password"
                      v-model="user.password"
                    />
                  </div>
                </div>
              </div> -->
        </div>
      </div>

      <div class="border-b border-gray-900/10 pb-12">
        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-4">
            <label
              for="email"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Email address</label
            >
            <div class="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                v-model="user.email"
              />
            </div>
          </div>
          <div class="sm:col-span-4">
            <label
              for="telepon"
              class="block text-sm font-medium leading-6 text-gray-900"
              >No Telepon</label
            >
            <div class="mt-2">
              <input
                id="telepon"
                name="telepon"
                type="number"
                autocomplete="telepon"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                v-model="user.telepon"
              />
            </div>
          </div>

          <div class="col-span-full">
            <label
              for="street-address"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Alamat</label
            >
            <div class="mt-2">
              <input
                type="text"
                name="alamat"
                id="alamat"
                autocomplete="street-address"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="masukan alamat lengkap dan juga kode post anda"
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
      <buttonsave type="secondary"
        @click="onUpdated"
      >
        Save
      </buttonsave>
    </div>
  </form>
</template>

<script>
import buttonsave from "@/components/Button/Status.vue";
import { onUpdated } from "vue";

export default {
  components: {
    buttonsave,
  },
  data() {
    return {
      user: {
        name: "",
        // password: "",
        alamat: "",
        telpon: "",
      },
    };
  },
  created() {
    this.loadUser();
  },
  methods: {
    loadUser() {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        this.user = JSON.parse(storedUser);
      }
    },
    onUpdated() {
      localStorage.setItem("user", JSON.stringify(this.user));
      alert("User updated successfully!");
      console.log(this.user);
      this.$emit("userUpdate")
    },
    resetForm() {
      this.loadUser();
    },
    changePhoto(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.user.picture = reader.result;
        };
        reader.readAsDataURL(file);
      }
    },
  },
};
</script>
