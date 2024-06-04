<template>
    <div>
        <h1 class="mb-12 font-bold">Data Produk</h1>
        <input v-model="selected.name" type="text" class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring">
        <input v-model="selected.alamat" type="text" class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring">
        <input v-model="selected.notlp" type="text" class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring">
        <input v-model="selected.gaji" type="text" class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring">
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
                        <th class="border border-slate-600">
                            Gaji
                        </th>
                        <th class="border border-slate-600">
                            Aksi
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="employ in karyawan" :key="employ.id">
                        <td class="border border-slate-700">
                            {{ employ.id }}
                        </td>
                        <td class="border border-slate-700">
                            {{ employ.name }}
                        </td>
                        <td class="border border-slate-700">
                            {{ employ.alamat }}
                        </td>
                        <td class="border border-slate-700">
                            {{ employ.notlp }}
                        </td>
                        <td class="border border-slate-700">
                            {{ employ.gaji }}
                        </td>
                        <td class="space-x-2 border border-slate-700">
                            <button @click="onEdit(employ)" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center">Edit</button>
                            <button @click="onDelete(employ)" class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center">Delete</button>
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
                  karyawan: [],
                  selected: {
    
                  }
              }
      },
      created() {
          for (let index = 0; index < 8; index++) {
              this.karyawan.push({
                  id: index,
                  name: "karyawan " + index,
                  alamat: 'alamat ' + index,
                  notlp: '08123' + index,
                  gaji: '$35',
              })
          }
      },
      methods: {
          onEdit(employ) {
            this.selected={...employ}
            },
          onDelete(employ) {
           this.karyawan.splice(employ.id,1)
            },
            onUpdated() {
                var a=this.karyawan.find(karyawan=>karyawan.id==this.selected.id)
                a.name = this.selected.name
                var a=this.karyawan.find(karyawan=>karyawan.id==this.selected.id)
                a.alamat = this.selected.alamat
                var a=this.karyawan.find(karyawan=>karyawan.id==this.selected.id)
                a.notlp = this.selected.notlp
                var a=this.karyawan.find(karyawan=>karyawan.id==this.selected.id)
                a.gaji = this.selected.gaji
            }
        }
    }
      </script>
      