<template>
  <div>
    <h1 class="mb-12 font-bold">Data Product</h1>
    <button
      type="button"
      @click="openModal"
      class="mb-2 text-sm font-semibold bg-blue-500  text-white px-3 py-2 rounded-lg hover:bg-blue-700 cursor-pointer "
    >
      Tambah Employee
    </button>
    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" @close="closeModal" class="relative z-10">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div
            class="flex min-h-full items-center justify-center p-4 text-center"
          >
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900 flex flex-row justify-between mb-4"
                >
                  {{ isEditMode ? "Edit Employee" : "Tambah Employee" }}

                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    @click="closeModal"
                  >
                    X
                  </button>
                </DialogTitle>
                <form @submit.prevent="saveProduct" class="space-x-2">
                  <div class="flex flex-col justify-between">
                    <input
                      v-model="newProduct.product_name"
                      type="text"
                      class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring" placeholder="Product Name"
                    />
                    <input
                      @change="onFileChange"
                      type="file"
                      class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring" placeholder="Image"
                    />
                    <select
                      v-model="newProduct.id_category"
                      class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
                    >
                      <option value="produk">Product</option>
                      <option value="layanan">Service</option>
                    </select>
                    <input
                      v-model="newProduct.price"
                      type="text"
                      class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring" placeholder="Harga"
                    />
                    <div class="flex flex-row space-x-2">
                      <button
                        type="submit"
                        class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center"
                      >
                        {{ isEditMode ? "Update" : "Add" }}
                      </button>
                      <button
                        @click="resetForm"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
    <div class="flex justify-between mb-4">
      <div>
        <label for="perPage">Display </label>
        <select
          class="rounded-lg text-sm px-2 py-1"
          id="perPage"
          v-model="perPage"
          @change="fetchProducts(currentPage)"
        >
          <option
            v-for="option in perPageOptions"
            :key="option"
            :value="option"
          >
            {{ option }}
          </option>
        </select>
        <label for="perPage"> results:</label>
      </div>
      <input
        class="rounded"
        type="text"
        v-model="searchQuery"
        @input="fetchProducts(currentPage)"
        placeholder="Search employees"
      />
    </div>
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
          <tr v-for="product in products" :key="product.id">
            <td class="border border-slate-700">
              {{ product.id }}
            </td>
            <td class="border border-slate-700">
              {{ product.product_name }}
            </td>
            <td class="border border-slate-700">
              <img :src="product.image_url" alt="Product Image" />
            </td>
            <td class="border border-slate-700">
              {{ product.id_category }}
            </td>
            <td class="border border-slate-700">
              {{ product.price }}
            </td>
            <td class="space-x-2 border border-slate-700">
              <button
                @click="onEdit(product)"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center"
              >
                Edit
              </button>
              <button
                @click="onDelete(product.id)"
                class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex justify-between">
      <div class="space-x-1 items-center justify-start text-center">
        <PageButton
          @click="fetchProducts(currentPage - 1)"
          :disabled="!pagination.prev_page_url"
          >Previous</PageButton
        >
        <PageButton
          v-for="page in pagination.last_page"
          :key="page"
          :is-active="currentPage === page"
          @click="fetchProducts(page)"
        >
          {{ page }}
        </PageButton>
        <PageButton
          @click="fetchProducts(currentPage + 1)"
          :disabled="!pagination.next_page_url"
          >Next</PageButton
        >
      </div>
      <div>
        <p class="text-sm">
          Showing {{ pagination.from }} to {{ pagination.to }} of
          {{ pagination.total }} items
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import {
  fetchProductsData,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/helpers/apiService";
import PageButton from "@/components/Button/Pagination.vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

export default {
  components: {
    PageButton,
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
  },
  data() {
    return {
      products: [],
      newProduct: {
        product_name: "",
        image: null,
        id_category: "",
        price: "",
      },
      currentProduct: null,
      isEditMode: false,
      pagination: {
        from: 0,
        to: 0,
        total: 0,
        current_page: 1,
        last_page: 1,
        prev_page_url: null,
        next_page_url: null,
      },
      currentPage: 1,
      perPage: 10,
      perPageOptions: [5, 10, 15, 20],
      searchQuery: "",
      isOpen: false,
    };
  },
  created() {
    this.fetchProducts(this.currentPage);
  },
  computed: {
    totalPages() {
      return Array.from({ length: this.pagination.last_page }, (_, i) => i + 1);
    },
  },
  methods: {
    closeModal() {
      this.isOpen = false;
    },
    openModal() {
      this.resetNewProductForm();
      this.isEditMode = false;
      this.isOpen = true;
    },
    async fetchProducts(page) {
      try {
        const { products, pagination } = await fetchProductsData(
          page,
          this.perPage,
          this.searchQuery
        );
        this.products = products;
        this.pagination = pagination;
        this.currentPage = page;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    saveProduct() {
      if (this.isEditMode && this.currentProduct) {
        this.updateProduct(this.currentProduct.id, this.newProduct);
      } else {
        this.createProduct();
      }
    },
    async createProduct() {
      try {
        const response = await createProduct(this.newProduct);
        this.products.push(response.data);
        alert("Product created successfully");
        this.resetNewProductForm();
        this.fetchProducts(this.currentPage);
      } catch (error) {
        console.error("Error creating product:", error);
      }
    },
    async updateProduct(id, updatedData) {
      try {
        const { data } = await updateProduct(id, updatedData);
        const updatedProductIndex = this.products.findIndex(
          (product) => product.id === id
        );
        if (updatedProductIndex !== -1) {
          this.products[updatedProductIndex] = data;
        }
        alert("Product updated successfully");
        this.fetchProducts(this.currentPage);
        this.resetForm();
      } catch (error) {
        console.error(`Failed to update product with id ${id}:`, error);
      }
    },
    async onDelete(id) {
      try {
        await deleteProduct(id);
        this.products = this.products.filter((product) => product.id !== id);
        this.fetchProducts(this.currentPage);
      } catch (error) {
        console.error(error);
      }
    },
    onEdit(product) {
      this.currentProduct = product;
      this.newProduct = {
        product_name: product.product_name,
        image: null,
        id_category: product.id_category,
        price: product.price,
      };
      this.isEditMode = true;
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.newProduct.image = file;
    },
    resetNewProductForm() {
      this.newProduct = {
        product_name: "",
        image: null,
        id_category: "",
        price: "",
      };
    },
    resetForm() {
      this.newProduct = {
        product_name: "",
        image: null,
        id_category: "",
        price: "",
      };
      this.currentProduct = null;
      this.isEditMode = false;
    },
  },
};
</script>
