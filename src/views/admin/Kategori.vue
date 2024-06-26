<template>
  <div>
    <h1 class="mb-12 font-bold">Data Produk</h1>
    <form @submit.prevent="saveKategori">
      <input
        v-model="newKategori.nama_kategori"
        type="text"
        class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
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
            <th class="border border-slate-600">Kategori</th>
            <th class="border border-slate-600">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="kategori in kategoris" :key="kategori.id_kategori">
            <td class="border border-slate-700">
              {{ kategori.id_kategori }}
            </td>
            <td class="border border-slate-700">
              {{ kategori.nama_kategori }}
            </td>
            <td class="space-x-2 border border-slate-700">
              <button
                @click="onEdit(kategori)"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center"
              >
                Edit
              </button>
              <button
                @click="onDelete(kategori.id_kategori)"
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
      kategoris: [],
      newKategori: {
        nama_kategori: "",
      },
      currentKategori: null,
      isEditMode: false,
    };
  },
  created() {
    this.fetchKategoris();
  },
  methods: {
    fetchKategoris() {
      axios
        .get("http://localhost:8000/api/kategori")
        .then((response) => {
          this.kategoris = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    saveKategori() {
      const {
        isEditMode,
        currentKategori,
        newKategori,
        updateKategori,
        createKategori,
      } = this;

      if (isEditMode && currentKategori) {
        updateKategori(currentKategori.id_kategori, newKategori);
      } else {
        createKategori();
      }
    },
    // Create Kategori
    createKategori() {
      const { newKategori } = this;
      const kategoriData = {
        nama_kategori: newKategori.nama_kategori,
      };

      axios
        .post("http://localhost:8000/api/kategori", kategoriData)
        .then((response) => this.kategoris.push(response.data))
        .catch(console.error);

      this.resetNewKategoriForm();
    },
    resetNewKategoriForm() {
      this.newKategori = {
        nama_kategori: "",
      };
    },
    // Update Kategori
    updateKategori(id_kategori, updatedData) {
      axios
        .put(`http://localhost:8000/api/kategori/${id_kategori}`, updatedData)
        .then(({ data }) => {
          const updatedKategoriIndex = this.kategoris.findIndex(
            (kategori) => kategori.id === id_kategori
          );
          if (updatedKategoriIndex !== -1) {
            this.kategoris[updatedKategoriIndex] = data;
          }
          this.fetchKategoris();
          this.resetForm();
        })
        .catch((error) => {
          console.error(
            `Failed to update kategori with id ${id_kategori}:`,
            error
          );
        });
    },
    async onDelete(id_kategori) {
      try {
        await axios.delete(`http://localhost:8000/api/kategori/${id_kategori}`);
        this.kategoris = this.kategoris.filter(
          (kategori) => kategori.id !== id_kategori
        );
        this.fetchKategoris();
      } catch (error) {
        console.error(error);
      }
    },

    onEdit(kategori) {
      this.currentKategori = kategori;
      this.newKategori = {
        nama_kategori: kategori.nama_kategori,
      };
      this.isEditMode = true;
    },
    resetForm() {
      this.newKategori = {
        nama_kategori: "",
      };
      this.currentKategori = null;
      this.isEditMode = false;
    },
  },
};
</script>
