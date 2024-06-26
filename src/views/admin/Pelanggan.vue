<template>
    <div>
      <h1 class="mb-12 font-bold">Data Pelanggan</h1>
      <table class="border-spacing-4 border border-slate-500 w-full text-center">
        <thead>
          <tr class="border border-slate-600">
            <th class="border border-slate-600">Id</th>
            <th class="border border-slate-600">Username</th>
            <th class="border border-slate-600">Nama</th>
            <th class="border border-slate-600">Alamat</th>
            <th class="border border-slate-600">No Telepon</th>
            <th class="border border-slate-600">Email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pelanggan in pelanggans" :key="pelanggan.id_pelanggan">
            <td class="border border-slate-700">
              {{ pelanggan.id_pelanggan }}
            </td>
            <td class="border border-slate-700">
              {{ pelanggan.username }}
            </td>
            <td class="border border-slate-700">
              {{ pelanggan.nama }}
            </td>
            <td class="border border-slate-700">
              {{ pelanggan.alamat }}
            </td>
            <td class="border border-slate-700">
              {{ pelanggan.notelp }}
            </td>
            <td class="border border-slate-700">
              {{ pelanggan.email }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
          pelanggans: [],
          newPelanggan: {
          username: "",
          nama: "",
          alamat: "",
          notlp: "",
          gaji: "",
          status: "",
          email: "",
          password: "",
        },
      };
    },
    created() {
      this.fetchPelanggan();
    },
    methods: {
      fetchPelanggan() {
        axios
          .get("http://localhost:8000/api/pelanggan")
          .then((response) => {
            this.pelanggans = response.data;
          })
          .catch((error) => {
            console.error(error);
          });
      },
    },
  };
  </script>
  