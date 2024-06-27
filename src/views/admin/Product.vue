<template>
  <div>
    <h1 class="mb-12 font-bold">Data Product</h1>
    <form @submit.prevent="saveProduct" class="space-x-2">
      <input
        v-model="newProduct.product_name"
        type="text"
        class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
      />
      <input
        v-model="newProduct.image"
        type="text"
        class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
      />
      <select
        v-model="newProduct.id_category"
        type="text"
        class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
      >
      <option value="produk">Product</option>
      <option value="layanan">Service</option>
    </select>
      <input
        v-model="newProduct.price"
        type="text"
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
            <th class="border border-slate-600">Product Name</th>
            <th class="border border-slate-600">Image</th>
            <th class="border border-slate-600">Category</th>
            <th class="border border-slate-600">Price</th>
            <th class="border border-slate-600">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="produk in produks" :key="produk.id">
            <td class="border border-slate-700">
              {{ produk.id }}
            </td>
            <td class="border border-slate-700">
              {{ produk.product_name }}
            </td>
            <td class="border border-slate-700">
              {{ produk.image }}
            </td>
            <td class="border border-slate-700">
              {{ produk.id_category }}
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
                @click="onDelete(produk.id)"
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
      newProduct: {
        product_name: "",
        image: "",
        id_category: "",
        price: "",
      },
      currentProduct: null,
      isEditMode: false,
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      axios
        .get("http://localhost:8000/api/produk")
        .then((response) => {
          this.produks = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    saveProduct() {
      const {
        isEditMode,
        currentProduct,
        newProduct,
        updateProduct,
        createProduct,
      } = this;

      if (isEditMode && currentProduct) {
        updateProduct(currentProduct.id, newProduct);
      } else {
        createProduct();
      }
    },
    createProduct() {
      const { newProduct } = this;
      const produkData = {
        username: newProduct.username,
        email: newProduct.email,
        password: newProduct.password,
      };

      axios
        .post("http://localhost:8000/api/produk", produkData)
        .then((response) => this.produks.push(response.data))
        .catch(console.error);

      this.resetNewProductForm();
    },
    resetNewProductForm() {
      this.newProduct = {
        username: "",
        email: "",
        password: "",
      };
    },
    updateProduct(id, updatedData) {
      axios
        .put(`http://localhost:8000/api/produk/${id}`, updatedData)
        .then(({ data }) => {
          const updatedProductIndex = this.produks.findIndex(
            (produk) => produk.id === id
          );
          if (updatedProductIndex !== -1) {
            this.produks[updatedProductIndex] = data;
          }
          this.fetchProducts();
          this.resetForm();
        })
        .catch((error) => {
          console.error(`Failed to update produk with id ${id}:`, error);
        });
    },
    async onDelete(id) {
      try {
        await axios.delete(`http://localhost:8000/api/produk/${id}`);
        this.produks = this.produks.filter((produk) => produk.id !== id);
        this.fetchProducts();
      } catch (error) {
        console.error(error);
      }
    },

    onEdit(produk) {
      this.currentProduct = produk;
      this.newProduct = {
        username: produk.username,
        email: produk.email,
        password: "",
      };
      this.isEditMode = true;
    },
    resetForm() {
      this.newProduct = {
        username: "",
        email: "",
        password: "",
      };
      this.currentProduct = null;
      this.isEditMode = false;
    },
  },
};
</script>
