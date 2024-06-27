<template>
  <div>
    <h1 class="mb-12 font-bold">Data Admin</h1>
    <form @submit.prevent="saveAdmin" class="space-x-2">
      <input
        v-model="newAdmin.username"
        type="text"
        class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
      />
      <input
        v-model="newAdmin.email"
        type="email"
        class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
      />
      <input
        v-model="newAdmin.password"
        type="password"
        class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
      />
      <button
        type="submit"
        class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center"
      >
        {{ isEditMode ? "Update" : "Add" }}
      </button>
      <button @click="resetForm" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center">
        Reset
      </button>
    </form>
    <div class="mb-12">
      <table
        class="border-spacing-4 border border-slate-500 w-full text-center"
      >
        <thead>
          <tr class="border border-slate-600">
            <th class="border border-slate-600">Id</th>
            <th class="border border-slate-600">Username</th>
            <th class="border border-slate-600">Email</th>
            <th class="border border-slate-600">Password</th>
            <th class="border border-slate-600">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="admin in admins" :key="admin.id" class="text-xs">
            <td class="border border-slate-700">
              {{ admin.id }}
            </td>
            <td class="border border-slate-700">
              {{ admin.username }}
            </td>
            <td class="border border-slate-700">
              {{ admin.email }}
            </td>
            <td class="border border-slate-700">
              {{ admin.password }}
            </td>
            <td class="space-x-2 border border-slate-700">
              <button
                @click="onEdit(admin)"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center"
              >
                Edit
              </button>
              <button
                @click="onDelete(admin.id)"
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
import axios from "axios";

export default {
  data() {
    return {
      admins: [],
      newAdmin: {
        username: "",
        email: "",
        password: "",
      },
      currentAdmin: null,
      isEditMode: false,
    };
  },
  created() {
    this.fetchAdmins();
  },
  methods: {
    fetchAdmins() {
      axios
        .get("http://localhost:8000/api/admin")
        .then((response) => {
          this.admins = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    saveAdmin() {
      const { isEditMode, currentAdmin, newAdmin, updateAdmin, createAdmin } = this;

      if (isEditMode && currentAdmin) {
        updateAdmin(currentAdmin.id, newAdmin);
      } else {
        createAdmin();
      }
    },
    createAdmin() {
      const { newAdmin } = this;
      const adminData = {
        username: newAdmin.username,
        email: newAdmin.email,
        password: newAdmin.password,
      };
      
      axios.post("http://localhost:8000/api/admin", adminData)
        .then(response => this.admins.push(response.data))
        .catch(console.error);

      this.resetNewAdminForm();
    },
    resetNewAdminForm() {
      this.newAdmin = {
        username: '',
        email: '',
        password: '',
      };
    },
    updateAdmin(id, updatedData) {
      axios
        .put(`http://localhost:8000/api/admin/${id}`, updatedData)
        .then(({ data }) => {
          const updatedAdminIndex = this.admins.findIndex((admin) => admin.id === id);
          if (updatedAdminIndex !== -1) {
            this.admins[updatedAdminIndex] = data;
          }
          this.fetchAdmins();
          this.resetForm();
        })
        .catch((error) => {
          console.error(`Failed to update admin with id ${id}:`, error);
        });
    },
    async onDelete(id) {
      try {
        await axios.delete(`http://localhost:8000/api/admin/${id}`);
        this.admins = this.admins.filter(admin => admin.id !== id);
        this.fetchAdmins();
      } catch (error) {
        console.error(error);
      }
    },

    onEdit(admin) {
      this.currentAdmin = admin;
      this.newAdmin = {
        username: admin.username,
        email: admin.email,
        password: "",
      };
      this.isEditMode = true;
    },
    resetForm() {
      this.newAdmin = {
        username: "",
        email: "",
        password: "",
      };
      this.currentAdmin = null;
      this.isEditMode = false;
    },
  },
};
</script>
