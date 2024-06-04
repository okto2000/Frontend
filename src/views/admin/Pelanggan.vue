<template>
    <div>
        <h1 class="mb-12 font-bold">Data Produk</h1>
        <input v-model="selected.name" type="text" class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring">
        <input v-model="selected.alamat" type="text" class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring">
        <input v-model="selected.notlp" type="text" class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring">
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
                            Alamat 
                        </th>
                        <th class="border border-slate-600">
                            No Telepon 
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in pelanggan" :key="pelanggan.id">
                        <td class="border border-slate-700">
                            {{ user.id }}
                        </td>
                        <td class="border border-slate-700">
                            {{ user.name }}
                        </td>
                        <td class="border border-slate-700">
                            {{ user.alamat }}
                        </td>
                        <td class="border border-slate-700">
                            {{ user.notlp }}
                        </td>
                        <td class="space-x-2 border border-slate-700">
                            <button @click="onEdit(user)" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center">Edit</button>
                            <button @click="onDelete(user)" class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center">Delete</button>
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
                pelanggan: [],
                  selected: {
    
                  }
              }
      },
      created() {
          for (let index = 0; index < 8; index++) {
              this.pelanggan.push({
                  id: index,
                  name: "Nama " + index,
                  alamat: 'alamat',
                  notlp: '08123' + index,
              })
          }
      },
      methods: {
          onEdit(user) {
            this.selected={...user}
            },
          onDelete(user) {
           this.pelanggan.splice(user.id,1)
            },
            onUpdated() {
                var a=this.pelanggan.find(pelanggan=>pelanggan.id==this.selected.id)
                a.name = this.selected.name
                var a=this.pelanggan.find(pelanggan=>pelanggan.id==this.selected.id)
                a.alamat = this.selected.alamat
                var a=this.pelanggan.find(pelanggan=>pelanggan.id==this.selected.id)
                a.notlp = this.selected.notlp
            }
        }
    }
      </script>
      