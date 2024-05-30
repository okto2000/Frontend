<script setup>
import Hero from '@/components/Headers/Hero.vue'
import Produk from '@/components/Produk/Produk.vue'
import Layanan from '@/components/Produk/Layanan.vue'
import Testimonial from '@/components/Testimonial/Testimonial.vue'
</script>

<template>
  <main>
    <Hero />
    <Produk id="produk"/>
    <Layanan id="layanan"/>
    <Testimonial />
  </main>
</template>
