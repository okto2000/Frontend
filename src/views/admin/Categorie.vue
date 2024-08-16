<template>
  <div>
    <h1 class="mb-12 font-bold">Data Category</h1>
    <button
      type="button"
      @click="openModal"
      class="mb-2 text-sm font-semibold bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
    >
      Tambah Category
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
                  {{ isEditMode ? "Ubah Kategori" : "Tambah Kategori" }}

                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    @click="closeModal"
                  >
                    X
                  </button>
                </DialogTitle>
                <form @submit.prevent="saveCategorie" class="space-x-2">
                  <div class="flex flex-col justify-between">
                    <div class="flex flex-row space-x-2">
                      <input
                        v-model="newCategorie.category_name"
                        type="text"
                        class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
                        placeholder="Nama Kategori"
                      />
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
        @change="fetchCategories(currentPage)"
      />
      <SearchInput
        v-model="searchQuery"
        @search="fetchCategories(currentPage)"
      />
    </div>
    <div>
      <DataTable
        :items="categories"
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
        @page-change="fetchCategories"
      />
    </div>
  </div>
</template>
<script>
import {
  fetchCategoriesData,
  createCategorie,
  updateCategorie,
  deleteCategorie,
} from "@/helpers/apiService";
import DataTable from "@/components/Table/DataTable.vue";
import Pagination from "@/components/Table/Pagination.vue";
import SearchInput from "@/components/Table/SearchInput.vue";
import PerPageSelect from "@/components/Table/PerPageSelect.vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

export default {
  components: {
    DataTable,
    Pagination,
    SearchInput,
    PerPageSelect,
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
  },
  data() {
    return {
      categories: [],
      newCategorie: {
        category_name: "",
      },
      currentCategorie: null,
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
      headers: [
        { key: 'id', label: 'No' },
        { key: 'category_name', label: 'category name' },
        { label: 'aksi' },
      ],
      keys: ['category_name'],
      currentPage: 1,
      perPageOptions: [5, 10, 15, 20],
      searchQuery: "",
      isOpen: false,
    };
  },
  created() {
    this.fetchCategories(this.currentPage);
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
      this.resetNewCategorieForm();
      this.isEditMode = false;
      this.isOpen = true;
    },
    async fetchCategories(page) {
      try {
        const { categories, pagination } = await fetchCategoriesData(
          page,
          this.perPage,
          this.searchQuery
        );
        this.categories = categories;
        this.pagination = pagination;
        this.currentPage = page;
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
    saveCategorie() {
      console.log(this.newCategorie);
      if (this.isEditMode && this.currentCategorie) {
        this.updateCategorie(this.currentCategorie.id, this.newCategorie);
        this.isOpen = false;
      } else {
        this.createCategorie();
      }
    },
    async createCategorie() {
      try {
        const response = await createCategorie(this.newCategorie);
        this.categories.push(response.data);
        alert("Categorie created successfully");
        this.resetNewCategorieForm();
        this.fetchCategories(this.currentPage);
      } catch (error) {
        console.error("Error creating categorie:", error);
      }
    },
    async updateCategorie(id, updatedData) {
      try {
        const { data } = await updateCategorie(id, updatedData);
        const updatedCategorieIndex = this.categories.findIndex(
          (categorie) => categorie.id === id
        );
        if (updatedCategorieIndex !== -1) {
          this.categories[updatedCategorieIndex] = data;
        }
        alert("Categorie updated successfully");
        this.fetchCategories(this.currentPage);
        this.resetForm();
      } catch (error) {
        console.error(`Failed to update categorie with id ${id}:`, error);
      }
    },
    async onDelete(id) {
      try {
        if (confirm("Are you sure you want to delete this product?")) {
        await deleteCategorie(id);
        this.categories = this.categories.filter(
          (categorie) => categorie.id !== id
        );
        this.fetchCategories(this.currentPage);
        } else {
          this.fetchCategories(this.currentPage);
        }
      } catch (error) {
        console.error(error);
      }
    },
    onEdit(categorie) {
      this.currentCategorie = categorie;
      this.newCategorie = {
        category_name: categorie.category_name,
      };
      this.isOpen = true;
      this.isEditMode = true;
    },
    resetNewCategorieForm() {
      this.newCategorie = {
        category_name: "",
      };
    },
    resetForm() {
      this.newCategorie = {
        category_name: "",
      };
      this.currentCategorie = null;
      this.isEditMode = false;
    },
  },
};
</script>
