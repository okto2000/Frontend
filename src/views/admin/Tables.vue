<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
    </div>
    <div class="w-full mb-12 px-4">
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
