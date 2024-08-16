<template>
  <div>
    <h1 class="mb-12 font-bold">Data Customer</h1>
    <div class="flex justify-between mb-4">
      <PerPageSelect
        :value="perPage"
        :options="perPageOptions"
        @input="perPage = $event"
        @change="fetchCustomers(currentPage)"
      />
      <SearchInput
        v-model="searchQuery"
        @search="fetchCustomers(currentPage)"
      />
    </div>
    <div>
      <DataTable
        :items="customers"
        :headers="headers"
        :keys="keys"
        :aksi="false"
        :currentPage="currentPage"
        :perPage="perPage"
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
import PerPageSelect from "@/components/Table/PerPageSelect.vue";
export default {
  components: {
    DataTable,
    Pagination,
    SearchInput,
    PerPageSelect
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
      headers: [
        { key: 'id', label: 'No' },
        { key: 'name', label: 'name' },
        { key: 'address', label: 'address' },
        { key: 'notelp', label: 'no telephon' },
        { key: 'email', label: 'email' },
      ],
      keys: ['name', 'address', 'notelp', 'email'],
      currentPage: 1,
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
