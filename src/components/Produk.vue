<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
-->
<script setup>
  import ProdukView from '@/components/ProdukView.vue'</script>
<template>
    <div class="bg-white">
      <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900">Produk</h2>
  
        <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          <div v-for="product in products" :key="product.id" class="group relative">
            <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <img :src="product.imageSrc" :alt="product.imageAlt" class="h-full w-full object-center lg:h-full lg:w-full" />
            </div>
            <div class="mt-4 flex justify-between">
              <div>
                <h3 class="text-sm text-gray-700">
                  <a :href="product.href">
                    <span aria-hidden="true" class="absolute inset-0" />
                    {{ product.name }}
                  </a>
                </h3>
                <p class="mt-1 text-sm text-gray-500">{{ product.tipe }}</p>
              </div>
              <p class="text-sm font-medium text-gray-900">{{ product.price }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
      data() {
          return {
              products: []
          }
  },
  created() {
      for (let index = 0; index < 8; index++) {
          this.products.push({
              id: index,
              name: "Produk " + index,
              href: '#',
              imageSrc: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//106/MTA-86138476/oem_oem_one-c566_kalung_kucing_lonceng_motif_jejak_kucing_cat_paw_-_kalung_lonceng_kucing_kitten_aksesoris_hewan_peliharaan_full02_juu7rv3a.jpg',
              imageAlt: "Front of men's Basic Tee in black.",
              price: '$35',
              tipe:index%2==0?"Pelayanan":"Barang",
          })
      }
  }
}
  </script>