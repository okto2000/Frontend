<template>
  <div>
    <h1 class="mb-12 font-bold">Data Product</h1>
    <button
      type="button"
      @click="openModal"
      class="mb-2 text-sm font-semibold bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
    >
      Tambah Product
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
                      class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
                      placeholder="Product Name"
                    />
                    <input
                      @change="onFileChange"
                      type="file"
                      class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
                      placeholder="Image"
                    />
                    <select
                      v-if="categories.data.length > 0"
                      v-model="newProduct.id_category"
                      class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
                    >
                      <option
                        v-for="category in categories.data"
                        :key="category.id"
                        :value="category.id"
                      >
                        {{ category.category_name }}
                      </option>
                    </select>

                    <input
                      v-model="newProduct.price"
                      type="text"
                      class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
                      placeholder="Harga"
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
      <PerPageSelect
        :value="perPage"
        :options="perPageOptions"
        @input="perPage = $event"
        @change="fetchProducts(currentPage)"
      />
      <SearchInput v-model="searchQuery" @search="fetchProducts(currentPage)" />
    </div>
    <div>
      <DataTable
        :items="products"
        :headers="headers"
        :keys="keys"
        @edit="onEdit"
        @delete="onDelete"
        :currentPage="currentPage"
        :perPage="perPage"
      />
      <Pagination
        :pagination="pagination"
        :currentPage="currentPage"
        @page-change="fetchProducts"
      />
    </div>
  </div>
</template>
<script>
import {
  fetchProductsData,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
} from "@/helpers/apiService";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import DataTable from "@/components/Table/DataTable.vue";
import Pagination from "@/components/Table/Pagination.vue";
import PerPageSelect from "@/components/Table/PerPageSelect.vue";
import SearchInput from "@/components/Table/SearchInput.vue";
export default {
  components: {
    PerPageSelect,
    SearchInput,
    DataTable,
    Pagination,
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
        image: "",
        id_category: "",
        price: "",
      },
      headers: [
        { key: "id", label: "No" },
        { key: "product_name", label: "product name" },
        { key: "image", label: "image" },
        { key: "id_category", label: "id category" },
        { key: "price", label: "price" },
        { label: "aksi" },
      ],
      keys: ["product_name", "image", "id_category", "price"],
      categories: { data: [] },
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
      perPageOptions: [5, 10, 15, 20],
      searchQuery: "",
      isOpen: false,
    };
  },
  created() {
    this.fetchProducts(this.currentPage);
    this.fetchCategories();
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
    async fetchCategories() {
      try {
        const categories = await getCategories();
        this.categories = categories.data.data;
        console.log("Fetched categories:", categories.data.data); // Debugging log
        this.categories = categories.data.data;
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
    async fetchProducts(page) {
      try {
        const { products, pagination } = await fetchProductsData(
          page,
          this.perPage,
          this.searchQuery
        );
        this.products = products;
        console.log(this.products);
        this.pagination = pagination;
        this.currentPage = page;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    saveProduct() {
      if (this.isEditMode && this.currentProduct) {
        this.updateProduct(this.currentProduct.id, this.newProduct);
        this.isOpen = false;
      } else {
        this.createProduct();
        this.isOpen = false;
      }
    },
    async createProduct() {
      try {
        const formData = new FormData();
        formData.append("product_name", this.newProduct.product_name);
        formData.append("image", this.newProduct.image);
        formData.append("id_category", this.newProduct.id_category);
        formData.append("price", this.newProduct.price);

        const response = await createProduct(formData);
        this.products.push(response.data);
        alert("Product created successfully");
        this.resetNewProductForm();
        this.fetchProducts(this.currentPage);
      } catch (error) {
        console.error("Error creating product:", error);
      }
    },
    async updateProduct(id) {
      try {
        const formData = new FormData();
        formData.append("product_name", this.newProduct.product_name || "");
        formData.append("id_category", this.newProduct.id_category || "");
        formData.append("price", this.newProduct.price || "");
        if (this.newProduct.image) {
          formData.append("image", this.newProduct.image);
        }

        const response = await updateProduct(id, formData);
        const updatedProductIndex = this.products.findIndex(
          (product) => product.id === id
        );
        if (updatedProductIndex !== -1) {
          this.products[updatedProductIndex] = response.data;
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
        // add alert confirm
        if (confirm("Are you sure you want to delete this product?")) {
          await deleteProduct(id);
          this.products = this.products.filter((product) => product.id !== id);
          this.fetchProducts(this.currentPage);
        } else {
          this.fetchProducts(this.currentPage);
        }
      } catch (error) {
        console.error(error);
      }
    },
    onEdit(product) {
      this.currentProduct = product;
      this.newProduct = {
        product_name: product.product_name,
        image: product.imageSrc,
        id_category: product.id_category,
        price: product.price,
      };
      this.isOpen = true;
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
