<template>
  <div class="bg-white">
    <div class="relative isolate overflow-visible px-6 pt-8 lg:px-8">
      <div
        class="absolute inset-x-0 -top-2 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-2"
        aria-hidden="true"
      >
        <div
          class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style="
            clip-path: polygon(
              74.1% 44.1%,
              100% 61.6%,
              97.5% 26.9%,
              85.5% 0.1%,
              80.7% 2%,
              72.5% 32.5%,
              60.2% 62.4%,
              52.4% 68.1%,
              47.5% 58.3%,
              45.2% 34.5%,
              27.5% 76.7%,
              0.1% 64.9%,
              17.9% 100%,
              27.6% 76.8%,
              76.1% 97.7%,
              74.1% 44.1%
            );
          "
        />
      </div>
      <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-32">
        <div class="text-center">
          <h1
            class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
          >
            Tempat Terbaik untuk Teman Berbulu Anda
          </h1>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            Selamat datang di Pet Shop kami, tempat di mana Anda bisa menemukan
            semua yang diperlukan untuk merawat hewan peliharaan kesayangan
            Anda. Kami menawarkan berbagai produk dan layanan, mulai dari
            makanan, perlengkapan, hingga perawatan kesehatan. Dengan produk
            berkualitas dan staf yang berpengalaman, kami berkomitmen memberikan
            yang terbaik untuk hewan peliharaan Anda.
          </p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <fwb-button gradient="green-blue" square @click="scrollToLayanan">
              Layanan Kami →
            </fwb-button>
            <a
              class="text-sm font-semibold leading-6 text-gray-900 cursor-pointer"
              @click="scrollToProduk"
              >Produk Kami<span aria-hidden="true">→</span></a
            >
          </div>
        </div>
      </div>
      <div>
        <Polygon />
      </div>
      <div class="flex justify-center w-full">
        <div class="flex mx-auto">
          <IconChat />
          <div class="flex-col mx-auto">
            <h1 class="font-semibold lg:text-lg text-xs">KONSULTASI GRATIS</h1>
            <p class="text-xs lg:text-base">
              Dapatkan Konsultasi Kesehatan Gratis di Petshop Kami!
            </p>
          </div>
        </div>
        <div class="flex mx-auto">
          <IconCheckbox />
          <div class="flex-col mx-auto">
            <h1 class="font-semibold lg:text-lg text-xs">JAMINAN KUALITAS</h1>
            <p class="text-xs lg:text-base">
              Kualitas Layanan Terjamin di Petshop Kami!
            </p>
          </div>
        </div>
        <div class="flex mx-auto">
          <IconTag />
          <div class="flex-col mx-auto">
            <h1 class="font-semibold lg:text-lg text-xs">PROMO SPESIAL</h1>
            <p class="text-xs lg:text-base">
              Nikmati Promo Spesial Bagi Pelanggan Setia di Petshop Kami!
            </p>
          </div>
        </div>
        <div class="flex mx-auto">
          <IconShielcheck />
          <div class="flex-col mx-auto">
            <h1 class="font-semibold lg:text-lg text-xs">
              PEMBAYARAN 100% AMAN
            </h1>
            <p class="text-xs lg:text-base">
              Pembayaran 100% Aman di Petshop Kami!
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Polygon from '@/components/icons/Polygon.vue'
import IconChat from '@/components/icons/IconChat.vue'
import IconCheckbox from '@/components/icons/IconCheckbox.vue'
import IconShielcheck from '@/components/icons/IconShieldcheck.vue'
import IconTag from '@/components/icons/IconTag.vue'
import { FwbButton } from 'flowbite-vue'
export default {
  methods: {
    scrollToProduk() {
  const produkSection = document.getElementById('produk');
  if (produkSection) {
    produkSection.scrollIntoView({ behavior: 'smooth' });
  }
},
    scrollToLayanan() {
      const layananSection = document.getElementById('layanan')
      if (layananSection) {
        layananSection.scrollIntoView({ behavior: 'smooth' })
      }
    },
  },
  components: {
    Polygon,
    IconChat,
    IconCheckbox,
    IconShielcheck,
    IconTag,
    FwbButton
}
}
</script>
