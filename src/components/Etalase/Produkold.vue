<template>
    <div class="bg-transparent">
      <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900">Produk</h2>
        <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          <div v-for="product in products" :key="product.id" class="group">
            <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none  lg:h-80 ">
              <img :src="product.imageSrc" :alt="product.imageAlt" class="h-full w-full object-center lg:h-full lg:w-full z-0" />
              <button @click="addToCart" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center cursor-pointer z-50">Add To Cart</button>
            </div>
            <div class="mt-4 flex justify-between font-medium">
              <div>
                <h3 class="text-sm text-gray-700">
                    <span aria-hidden="true" class="absolute inset-0" />
                    {{ product.name }}
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
              imageSrc: 'src/assets/img/pngwing.com (3).png',
              imageAlt: "Front of men's Basic Tee in black.",
              price: 'Rp.35',
              tipe:index%2==0?"Pelayanan":"Barang",
          })
      }
    },
    methods: {
      slicedProducts() {
          return this.products.slice(product => product.tipe === "Barang");
      },

      addToCart() {
          alert()
      }
    }
}
  </script>