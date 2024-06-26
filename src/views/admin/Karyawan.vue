<template>
  <div>
    <h1 class="mb-12 font-bold">Data Produk</h1>
    <form @submit.prevent="saveKaryawan">
      <input
        v-model="newKaryawan.username"
        type="text"
        class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
      />
      <input
        v-model="newKaryawan.nama"
        type="text"
        class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
      />
      <input
        v-model="newKaryawan.alamat"
        type="text"
        class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
      />
      <input
        v-model="newKaryawan.notelp"
        type="text"
        class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
      />
      <select
        v-model="newKaryawan.status"
        class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
      >
        <option value="aktif">Aktif</option>
        <option value="tidak aktif">Tidak Aktif</option>
      </select>
      <input
        v-model="newKaryawan.gaji"
        type="text"
        class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
      />
      <input
        v-model="newKaryawan.email"
        type="email"
        class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
      />
      <input
        v-model="newKaryawan.password"
        type="password"
        class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
        required
      />
      <button
        type="submit"
        class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center"
      >
        {{ isEditMode ? "Update" : "Add" }}
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
            <th class="border border-slate-600">Nama</th>
            <th class="border border-slate-600">Alamat</th>
            <th class="border border-slate-600">No Telepon</th>
            <th class="border border-slate-600">Status</th>
            <th class="border border-slate-600">Gaji</th>
            <th class="border border-slate-600">Email</th>
            <th class="border border-slate-600">Password</th>
            <th class="border border-slate-600">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="karyawan in karyawans" :key="karyawan.id_karyawan">
            <td class="border border-slate-700">
              {{ karyawan.id_karyawan }}
            </td>
            <td class="border border-slate-700">
              {{ karyawan.username }}
            </td>
            <td class="border border-slate-700">
              {{ karyawan.nama }}
            </td>
            <td class="border border-slate-700">
              {{ karyawan.alamat }}
            </td>
            <td class="border border-slate-700">
              {{ karyawan.notelp }}
            </td>
            <td class="border border-slate-700">
              {{ karyawan.status }}
            </td>
            <td class="border border-slate-700">
              {{ karyawan.gaji }}
            </td>
            <td class="border border-slate-700">
              {{ karyawan.email }}
            </td>
            <td class="border border-slate-700">
              {{ karyawan.password }}
            </td>
            <td class="space-x-2 border border-slate-700">
              <button
                @click="onEdit(karyawan)"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center"
              >
                Edit
              </button>
              <button
                @click="onDelete(karyawan.id_karyawan)"
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
      karyawans: [],
      newKaryawan: {
        username: "",
        nama: "",
        alamat: "",
        notlp: "",
        gaji: "",
        status: "",
        email: "",
        password: "",
      },
      currentKaryawan: null,
      isEditMode: false,
    };
  },
  created() {
    this.fetchKaryawans();
  },
  methods: {
    fetchKaryawans() {
      axios
        .get("http://localhost:8000/api/karyawan")
        .then((response) => {
          this.karyawans = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    saveKaryawan() {
      const {
        isEditMode,
        currentKaryawan,
        newKaryawan,
        updateKaryawan,
        createKaryawan,
      } = this;

      if (isEditMode && currentKaryawan) {
        updateKaryawan(currentKaryawan.id_karyawan, newKaryawan);
      } else {
        createKaryawan();
      }
    },
    createKaryawan() {
      const { newKaryawan } = this;
      const karyawanData = {
        username: newKaryawan.username,
        nama: newKaryawan.nama,
        alamat: newKaryawan.alamat,
        notelp: newKaryawan.notelp,
        status: newKaryawan.status,
        gaji: newKaryawan.gaji,
        email: newKaryawan.email,
        password: newKaryawan.password,
      };

      axios
        .post("http://localhost:8000/api/karyawan", karyawanData)
        .then((response) => this.karyawans.push(response.data))
        .catch(console.error);

      this.resetNewKaryawanForm();
    },
    resetNewKaryawanForm() {
      this.newKaryawan = {
        username: "",
        nama: "",
        alamat: "",
        notlp: "",
        gaji: "",
        status: "",
        email: "",
        password: "",
      };
    },
    updateKaryawan(id_karyawan, updatedData) {
      axios
        .put(`http://localhost:8000/api/karyawan/${id_karyawan}`, updatedData)
        .then(({ data }) => {
          const updatedKaryawanIndex = this.karyawans.findIndex(
            (karyawan) => karyawan.id === id_karyawan
          );
          if (updatedKaryawanIndex !== -1) {
            this.karyawans[updatedKaryawanIndex] = data;
          }
          this.fetchKaryawans();
          this.resetForm();
        })
        .catch((error) => {
          console.error(
            `Failed to update karyawan with id ${id_karyawan}:`,
            error
          );
        });
    },
    async onDelete(id_karyawan) {
      try {
        await axios.delete(`http://localhost:8000/api/karyawan/${id_karyawan}`);
        this.karyawans = this.karyawans.filter(
          (karyawan) => karyawan.id !== id_karyawan
        );
        this.fetchKaryawans();
      } catch (error) {
        console.error(error);
      }
    },

    onEdit(karyawan) {
      this.currentKaryawan = karyawan;
      this.newKaryawan = {
        username: karyawan.username,
        nama: karyawan.nama,
        alamat: karyawan.alamat,
        notelp: karyawan.notelp,
        status: karyawan.status,
        gaji: karyawan.gaji,
        email: karyawan.email,
        password: "",
      };
      this.isEditMode = true;
    },
    resetForm() {
      this.newKaryawan = {
        username: "",
        nama: "",
        alamat: "",
        notlp: "",
        gaji: "",
        status: "",
        email: "",
        password: "",
      };
      this.currentKaryawan = null;
      this.isEditMode = false;
    },
  },
};
</script>
