<template>
  <div>
    <h1 class="mb-12 font-bold">Data Produk</h1>
    <input
      v-model="selected.username"
      type="text"
      class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
    />
    <input
      v-model="selected.password"
      type="text"
      class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
    />
    <button
      @click="onUpdated"
      class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center"
    >
      Update
    </button>
    <div class="mb-12">
      <table
        class="border-spacing-4 border border-slate-500 w-full text-center"
      >
        <thead>
          <tr class="border border-slate-600">
            <th class="border border-slate-600">Id</th>
            <th class="border border-slate-600">Username</th>
            <th class="border border-slate-600">Password</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in admin" :key="user.id">
            <td class="border border-slate-700">
              {{ user.id }}
            </td>
            <td class="border border-slate-700">
              {{ user.username }}
            </td>
            <td class="border border-slate-700">
              {{ user.password }}
            </td>
            <td class="space-x-2 border border-slate-700">
              <button
                @click="onEdit(user)"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center"
              >
                Edit
              </button>
              <button
                @click="onDelete(user)"
                class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { onUpdated } from "vue";

export default {
  data() {
    return {
      admin: [],
      selected: {},
    };
  },
  created() {
    for (let index = 0; index < 8; index++) {
      this.admin.push({
        id: index,
        username: "username " + index,
        password: "password " + index,
      });
    }
  },
  methods: {
    onEdit(user) {
      this.selected = { ...user };
    },
    onDelete(user) {
      this.admin.splice(user.id, 1);
    },
    onUpdated() {
      var a = this.admin.find((admin) => admin.id == this.selected.id);
      a.username = this.selected.username;
      var a = this.admin.find((admin) => admin.id == this.selected.id);
      a.password = this.selected.password;
    },
  },
};
</script>
