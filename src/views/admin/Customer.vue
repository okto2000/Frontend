<template>
  <div>
    <h1 class="mb-12 font-bold">Data Customer</h1>
    <div class="flex justify-between mb-4">
      <div>
        <label for="perPage">Display </label>
        <select
          class="rounded-lg text-sm px-2 py-1"
          id="perPage"
          v-model="perPage"
          @change="fetchCustomers(currentPage)"
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
      <SearchInput
        v-model="searchQuery"
        @search="fetchCustomers(currentPage)"
      />
    </div>
    <div>
      <DataTable
        :items="customers"
        :headers="['No', 'Name', 'address', 'notlp', 'email']"
        :keys="['name', 'address', 'notlp', 'email']"
        :aksi="false"
        :currentPage="currentPage"
      />
      <Pagination
        :pagination="pagination"
        :currentPage="currentPage"
        @page-change="fetchCustomers"
      />
    </div>
  </div>
</template>
<script>
import { fetchCustomersData } from "@/helpers/apiService";
import DataTable from "@/components/Table/DataTable.vue";
import Pagination from "@/components/Table/Pagination.vue";
import SearchInput from "@/components/Table/SearchInput.vue";
export default {
  components: {
    DataTable,
    Pagination,
    SearchInput,
  },
  data() {
    return {
      customers: [],
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
    };
  },
  created() {
    this.fetchCustomers(this.currentPage);
  },
  computed: {
    totalPages() {
      return Array.from({ length: this.pagination.last_page }, (_, i) => i + 1);
    },
  },
  methods: {
    async fetchCustomers(page) {
      try {
        const { customers, pagination } = await fetchCustomersData(
          page,
          this.perPage,
          this.searchQuery
        );
        this.customers = customers;
        this.pagination = pagination;
        this.currentPage = page;
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    },
  },
};
</script>
