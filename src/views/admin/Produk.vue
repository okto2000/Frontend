<template>
<div>
    <h1 class="mb-12 font-bold">Data Produk</h1>
    <input v-model="selected.name" type="text" class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring">
    <input v-model="selected.imageSrc" type="text" class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring">
    <input v-model="selected.price" type="text" class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring">
    <input v-model="selected.tipe" type="text" class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring">
    <button @click="onUpdated" class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center">Update</button>
    <div class="mb-12">
        <table class="border-spacing-4 border border-slate-500 w-full text-center">
            <thead>
                <tr class="border border-slate-600">
                    <th class="border border-slate-600">
                       Id 
                    </th>
                    <th class="border border-slate-600">
                        Nama 
                    </th>
                    <th class="border border-slate-600">
                        imageSrc
                    </th>
                    <th class="border border-slate-600">
                        price
                    </th>
                    <th class="border border-slate-600">
                        Tipe
                    </th>
                    <th class="border border-slate-600">
                        Aksi
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products" :key="product.id">
                    <td class="border border-slate-700">
                        {{ product.id }}
                    </td>
                    <td class="border border-slate-700">
                        {{ product.name }}
                    </td>
                    <td class="border border-slate-700">
                        {{ product.imageSrc }}
                    </td>
                    <td class="border border-slate-700">
                        {{ product.price }}
                    </td>
                    <td class="border border-slate-700">
                        {{ product.tipe }}
                    </td>
                    <td class="space-x-2 border border-slate-700">
                        <button @click="onEdit(product)" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center">Edit</button>
                        <button @click="onDelete(product)" class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
  </template>
  <script>
import { onUpdated } from 'vue';

    export default {
      data() {
          return {
              products: [],
              selected: {

              }
          }
  },
  created() {
      for (let index = 0; index < 8; index++) {
          this.products.push({
              id: index,
              name: "Produk " + index,
              imageSrc: 'gambar ' + index,
              price: '$35',
              tipe:index%2==0?"Pelayanan":"Barang",
          })
      }
  },
  methods: {
      onEdit(product) {
        this.selected={...product}
        },
      onDelete(product) {
       this.products.splice(product.id,1)
        },
        onUpdated() {
            var a=this.products.find(products=>products.id==this.selected.id)
            a.name = this.selected.name
            var a=this.products.find(products=>products.id==this.selected.id)
            a.imageSrc = this.selected.imageSrc
            var a=this.products.find(products=>products.id==this.selected.id)
            a.price = this.selected.price
            var a=this.products.find(products=>products.id==this.selected.id)
            a.tipe = this.selected.tipe
        }
    }
}
  </script>
  