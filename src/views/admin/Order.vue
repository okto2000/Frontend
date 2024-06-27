<template>
  <div>
      <h1 class="mb-12 font-bold">Data Order</h1>
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
                          Gambar
                      </th>
                      <th class="border border-slate-600">
                          Harga
                      </th>
                      <th class="border border-slate-600">
                          Tipe
                      </th>
                      <th class="border border-slate-600">
                          Tanggal Pesanan
                      </th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="order in orders" :key="order.id">
                      <td class="border border-slate-700">
                          {{ order.id }}
                      </td>
                      <td class="border border-slate-700">
                          {{ order.name }}
                      </td>
                      <td class="border border-slate-700">
                          {{ order.imageSrc }}
                      </td>
                      <td class="border border-slate-700">
                          {{ order.price }}
                      </td>
                      <td class="border border-slate-700">
                          {{ order.tipe }}
                      </td>
                      <td class="border border-slate-700">
                          {{ order.date }}
                      </td>
                      <td class="space-x-2 border border-slate-700">
                          <button @click="onEdit(order)" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center">Edit</button>
                          <button @click="onDelete(order)" class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center">Delete</button>
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
                orders: [],
                selected: {
  
                }
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
                date: new Date().toLocaleDateString()
            })
        }
    },
    methods: {
        onEdit(order) {
          this.selected={...order}
          },
        onDelete(order) {
         this.orders.splice(order.id,1)
          },
          onUpdated() {
              var a=this.orders.find(orders=>orders.id==this.selected.id)
              a.name = this.selected.name
              var a=this.orders.find(orders=>orders.id==this.selected.id)
              a.imageSrc = this.selected.imageSrc
              var a=this.orders.find(orders=>orders.id==this.selected.id)
              a.price = this.selected.price
              var a=this.orders.find(orders=>orders.id==this.selected.id)
              a.tipe = this.selected.tipe
          }
      }
  }
    </script>  