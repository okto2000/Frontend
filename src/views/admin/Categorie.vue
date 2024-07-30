<template>
  <div>
    <h1 class="mb-12 font-bold">Data Category</h1>
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
    <div class="mb-12">
      <table
        class="border-spacing-4 border border-slate-500 w-full text-center"
      >
        <thead>
          <tr class="border border-slate-600">
            <th class="border border-slate-600">Id</th>
            <th class="border border-slate-600">Categorie Name</th>
            <th class="border border-slate-600">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="categorie in categories" :key="categorie.id">
            <td class="border border-slate-700">
              {{ categorie.id }}
            </td>
            <td class="border border-slate-700">
              {{ categorie.category_name }}
            </td>
            <td class="space-x-2 border border-slate-700">
              <button
                @click="onEdit(categorie)"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center"
              >
                Edit
              </button>
              <button
                @click="onDelete(categorie.id)"
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
import {
  fetchCategoriesData,
  createCategorie,
  updateCategorie,
  deleteCategorie,
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
      currentPage: 1,
      perPage: 10,
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
      if (this.isEditMode && this.currentCategorie) {
        this.updateCategorie(this.currentCategorie.id, this.newCategorie);
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
        await deleteCategorie(id);
        this.categories = this.categories.filter(
          (categorie) => categorie.id !== id
        );
        this.fetchCategories(this.currentPage);
      } catch (error) {
        console.error(error);
      }
    },
    onEdit(categorie) {
      this.currentCategorie = categorie;
      this.newCategorie = {
        category_name: categorie.category_name,
      };
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
