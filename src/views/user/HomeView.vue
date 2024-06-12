<script setup>
import Hero from "@/components/Headers/Hero.vue";
import Produk from "@/components/Etalase/Produk.vue";
import Layanan from "@/components/Etalase/Layanan.vue";
import Testimonial from "@/components/Testimonial/Testimonial.vue";
</script>

<template>
  <main>
    <Hero />
    <Produk id="produk" />
    <Layanan id="layanan" />
    <Testimonial />
  </main>
</template>
