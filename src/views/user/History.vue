<template>
<div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3 rounded-s-lg">
                    No
                </th>
                <th scope="col" class="px-6 py-3 rounded-s-lg">
                    Produk name
                </th>
                <th scope="col" class="px-6 py-3">
                    Images
                </th>
                <th scope="col" class="px-6 py-3 rounded-e-lg">
                    Price
                </th>
                <th scope="col" class="px-6 py-3 rounded-e-lg">
                    Tipe
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="order in orders" :key="order.id" class="bg-white dark:bg-gray-800">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{ order.id }}
                </th>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{ order.name }}
                </th>
                <td class="px-6 py-4">
                    {{ order.imageSrc }}
                </td>
                <td class="px-6 py-4">
                    {{ order.price }}
                </td>
                <td class="px-6 py-4">
                    {{ order.tipe }}
                </td>
            </tr>
        </tbody>
    </table>
</div>
</template>
<script>
    export default {
      data() {
          return {
              orders: []
          }
  },
  created() {
      for (let index = 0; index < 8; index++) {
          this.orders.push({
              id: index,
              name: "Produk " + index,
              imageSrc: 'gambar ' + index,
              price: 'Rp.35',
              tipe:index%2==0?"Pelayanan":"Barang",
          })
      }
  }
}
</script>