<template>
  <div>
    <h1 class="mb-12 font-bold">Data Produk</h1>
    <form @submit.prevent="saveProduk">
      <input
        v-model="newProduk.nama_produk"
        type="text"
        class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
      />
      <input
        v-model="newProduk.image"
        type="text"
        class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
      />
      <select
        v-model="newProduk.id_kategori"
        type="text"
        class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
      >
      <option value="produk">Produk</option>
      <option value="layanan">Layanan</option>
    </select>
      <input
        v-model="newProduk.price"
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
            <th class="border border-slate-600">Nama</th>
            <th class="border border-slate-600">Gambar</th>
            <th class="border border-slate-600">Kategori</th>
            <th class="border border-slate-600">Price</th>
            <th class="border border-slate-600">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="produk in produks" :key="produk.id_produk">
            <td class="border border-slate-700">
              {{ produk.id_produk }}
            </td>
            <td class="border border-slate-700">
              {{ produk.nama_produk }}
            </td>
            <td class="border border-slate-700">
              {{ produk.image }}
            </td>
            <td class="border border-slate-700">
              {{ produk.id_kategori }}
            </td>
            <td class="border border-slate-700">
              {{ produk.price }}
            </td>
            <td class="space-x-2 border border-slate-700">
              <button
                @click="onEdit(produk)"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center"
              >
                Edit
              </button>
              <button
                @click="onDelete(produk.id_produk)"
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
      produks: [],
      newProduk: {
        nama_produk: "",
        image: "",
        id_kategori: "",
        price: "",
      },
      currentProduk: null,
      isEditMode: false,
    };
  },
  created() {
    this.fetchProduks();
  },
  methods: {
    fetchProduks() {
      axios
        .get("http://localhost:8000/api/produk")
        .then((response) => {
          this.produks = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    saveProduk() {
      const {
        isEditMode,
        currentProduk,
        newProduk,
        updateProduk,
        createProduk,
      } = this;

      if (isEditMode && currentProduk) {
        updateProduk(currentProduk.id_produk, newProduk);
      } else {
        createProduk();
      }
    },
    createProduk() {
      const { newProduk } = this;
      const produkData = {
        username: newProduk.username,
        email: newProduk.email,
        password: newProduk.password,
      };

      axios
        .post("http://localhost:8000/api/produk", produkData)
        .then((response) => this.produks.push(response.data))
        .catch(console.error);

      this.resetNewProdukForm();
    },
    resetNewProdukForm() {
      this.newProduk = {
        username: "",
        email: "",
        password: "",
      };
    },
    updateProduk(id_produk, updatedData) {
      axios
        .put(`http://localhost:8000/api/produk/${id_produk}`, updatedData)
        .then(({ data }) => {
          const updatedProdukIndex = this.produks.findIndex(
            (produk) => produk.id === id_produk
          );
          if (updatedProdukIndex !== -1) {
            this.produks[updatedProdukIndex] = data;
          }
          this.fetchProduks();
          this.resetForm();
        })
        .catch((error) => {
          console.error(`Failed to update produk with id ${id_produk}:`, error);
        });
    },
    async onDelete(id_produk) {
      try {
        await axios.delete(`http://localhost:8000/api/produk/${id_produk}`);
        this.produks = this.produks.filter((produk) => produk.id !== id_produk);
        this.fetchProduks();
      } catch (error) {
        console.error(error);
      }
    },

    onEdit(produk) {
      this.currentProduk = produk;
      this.newProduk = {
        username: produk.username,
        email: produk.email,
        password: "",
      };
      this.isEditMode = true;
    },
    resetForm() {
      this.newProduk = {
        username: "",
        email: "",
        password: "",
      };
      this.currentProduk = null;
      this.isEditMode = false;
    },
  },
};
</script>
