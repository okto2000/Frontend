<template>
  <section class="mx-auto bg-blueGray-50">
    <div class="w-full px-4 mx-auto">
      <div
        class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16 border"
      >
        <div class="px-6">
          <div class="flex flex-wrap justify-center">
            <div class="w-full flex justify-center">
              <div class="relative">
                <img
                  alt="..."
                  :src="user.picture"
                  class="w-full h-16 shadow-xl rounded-full align-middle border-none"
                />
              </div>
            </div>
            <div class="w-full px-4 text-center mt-20">
              <div class="flex justify-center py-4 lg:pt-4 pt-8">
                <div
                  v-for="item in stat"
                  :key="item.name"
                  class="mr-4 p-3 text-center"
                >
                  <span
                    class="text-xl font-bold block uppercase tracking-wide text-blueGray-600"
                  >
                    {{ item.total }}
                  </span>
                  <span class="text-sm text-blueGray-400">{{ item.name }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="text-center mt-12">
            <h3
              class="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2"
            >
              {{ user.name }}
            </h3>
            <div
              class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase"
            >
              <i class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400">
                </i
              >
              {{ user.alamat }}
            </div>
            <div class="mb-2 text-blueGray-600 mt-10">
              <i class="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
              {{ user.telepon }}
            </div>
            <div class="mb-2 text-blueGray-600">
              <i class="fas fa-university mr-2 text-lg text-blueGray-400"></i>
              {{ user.email }}
            </div>
          </div>
          <div
            class="mt-10 py-10 border-t border-blueGray-200 text-center"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import team2 from "@/assets/img/user.svg";
export default {
  data() {
    return {
      stat: [
        {
          name: "Pesanan Belum Dibayar",
          total: "2",
        },
        {
          name: "Pesanan Sudah Dibayar",
          total: "2",
        },
        { name: "Pesanan Selesai", total: "2" },
      ],
      user: JSON.parse(localStorage.getItem("user")) || {},
    };
  },
};
</script>
