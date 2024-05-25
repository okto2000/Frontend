<script setup>
import Polygon from '@/components/icons/Polygon.vue'
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
  </div>
</div>
</template>
