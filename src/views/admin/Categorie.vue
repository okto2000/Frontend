<template>
  <div>
    <h1 class="mb-12 font-bold">Data Category</h1>
    <form @submit.prevent="saveCategorie">
      <input
        v-model="newCategorie.categorie_name"
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
              {{ categorie.categorie_name }}
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
import axios from "axios";

export default {
  data() {
    return {
      categories: [],
      newCategorie: {
        categorie_name: "",
      },
      currentCategorie: null,
      isEditMode: false,
    };
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    fetchCategories() {
      axios
        .get("http://localhost:8000/api/categorie")
        .then((response) => {
          this.categories = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    saveCategorie() {
      const {
        isEditMode,
        currentCategorie,
        newCategorie,
        updateCategorie,
        createCategorie,
      } = this;

      if (isEditMode && currentCategorie) {
        updateCategorie(currentCategorie.id, newCategorie);
      } else {
        createCategorie();
      }
    },
    // Create Categorie
    createCategorie() {
      const { newCategorie } = this;
      const categorieData = {
        categorie_name: newCategorie.categorie_name,
      };

      axios
        .post("http://localhost:8000/api/categorie", categorieData)
        .then((response) => this.categories.push(response.data))
        .catch(console.error);

      this.resetNewCategorieForm();
    },
    resetNewCategorieForm() {
      this.newCategorie = {
        categorie_name: "",
      };
    },
    // Update Categorie
    updateCategorie(id, updatedData) {
      axios
        .put(`http://localhost:8000/api/categorie/${id}`, updatedData)
        .then(({ data }) => {
          const updatedCategorieIndex = this.categories.findIndex(
            (categorie) => categorie.id === id
          );
          if (updatedCategorieIndex !== -1) {
            this.categories[updatedCategorieIndex] = data;
          }
          this.fetchCategories();
          this.resetForm();
        })
        .catch((error) => {
          console.error(
            `Failed to update categorie with id ${id}:`,
            error
          );
        });
    },
    async onDelete(id) {
      try {
        await axios.delete(`http://localhost:8000/api/categorie/${id}`);
        this.categories = this.categories.filter(
          (categorie) => categorie.id !== id
        );
        this.fetchCategories();
      } catch (error) {
        console.error(error);
      }
    },

    onEdit(categorie) {
      this.currentCategorie = categorie;
      this.newCategorie = {
        categorie_name: categorie.categorie_name,
      };
      this.isEditMode = true;
    },
    resetForm() {
      this.newCategorie = {
        categorie_name: "",
      };
      this.currentCategorie = null;
      this.isEditMode = false;
    },
  },
};
</script>
