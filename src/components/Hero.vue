<script setup>
import Polygon from '@/components/icons/Polygon.vue'
import IconChat from '@/components/icons/IconChat.vue'
import IconCheckbox from '@/components/icons/IconCheckbox.vue'
import IconShielcheck from '@/components/icons/IconShieldcheck.vue'
import IconTag from '@/components/icons/IconTag.vue'
import { FwbButton } from 'flowbite-vue'
</script>
<template>
<div class="bg-white">
  <div class="relative isolate px-6 pt-8 lg:px-8">
    <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-32">
      <div class="text-center">
        <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Tempat Terbaik untuk Teman Berbulu Anda</h1>
        <p class="mt-6 text-lg leading-8 text-gray-600">Selamat datang di Pet Shop kami, tempat di mana Anda bisa menemukan semua yang diperlukan untuk merawat hewan peliharaan kesayangan Anda. Kami menawarkan berbagai produk dan layanan, mulai dari makanan, perlengkapan, hingga perawatan kesehatan. Dengan produk berkualitas dan staf yang berpengalaman, kami berkomitmen memberikan yang terbaik untuk hewan peliharaan Anda.</p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
        <fwb-button gradient="green-blue" square>
        Layanan Kami →
        </fwb-button>
          <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Produk Kami<span aria-hidden="true">→</span></a>
        </div>
      </div>
    </div>
    <div>
      <Polygon/>
    </div>
    <div class="flex justify-center w-full">
      <div class="flex lg:mx-8">
        <IconChat/>
        <div class="flex-col mx-4">
          <h1 class="font-semibold lg:text-lg">KONSULTASI GRATIS</h1>
          <p>Dapatkan Konsultasi Kesehatan Gratis di Petshop Kami!</p>
        </div>
      </div>
      <div class="flex lg:mx-4">
        <IconCheckbox/>
        <div class="flex-col mx-4">
          <h1 class="font-semibold lg:text-lg">JAMINAN KUALITAS</h1>
          <p>Kualitas Layanan Terjamin di Petshop Kami!</p>
        </div>
      </div>
      <div class="flex lg:mx-4">
        <IconTag/>
        <div class="flex-col mx-4">
          <h1 class="font-semibold lg:text-lg">PROMO SPESIAL</h1>
          <p>Nikmati Promo Spesial Bagi Pelanggan Setia di Petshop Kami!</p>
        </div>
      </div>
      <div class="flex lg:mx-4">
        <IconShielcheck/>
        <div class="flex-col mx-4">
          <h1 class="font-semibold lg:text-lg">PEMBAYARAN 100% AMAN</h1>
          <p>Pembayaran 100% Aman di Petshop Kami!</p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
