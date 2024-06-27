<template>
    <div>
      <h1 class="mb-12 font-bold">Data Customer</h1>
      <table class="border-spacing-4 border border-slate-500 w-full text-center">
        <thead>
          <tr class="border border-slate-600">
            <th class="border border-slate-600">Id</th>
            <th class="border border-slate-600">Name</th>
            <th class="border border-slate-600">Address</th>
            <th class="border border-slate-600">No Telepon</th>
            <th class="border border-slate-600">Email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="customer in customers" :key="customer.id">
            <td class="border border-slate-700">
              {{ customer.id }}
            </td>
            <td class="border border-slate-700">
              {{ customer.name }}
            </td>
            <td class="border border-slate-700">
              {{ customer.address }}
            </td>
            <td class="border border-slate-700">
              {{ customer.notelp }}
            </td>
            <td class="border border-slate-700">
              {{ customer.email }}
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
          customers: [],
          newCustomer: {
          name: "",
          address: "",
          notlp: "",
          gaji: "",
          status: "",
          email: "",
          password: "",
        },
      };
    },
    created() {
      this.fetchCustomer();
    },
    methods: {
      fetchCustomer() {
        axios
          .get("http://localhost:8000/api/customer")
          .then((response) => {
            this.customers = response.data;
          })
          .catch((error) => {
            console.error(error);
          });
      },
    },
  };
  </script>
  