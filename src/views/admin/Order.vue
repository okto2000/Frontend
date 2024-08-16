<template>
  <div>
    <h1 class="mb-12 font-bold">Data Transaction</h1>
    <div class="flex justify-between mb-4">
      <PerPageSelect
        :value="perPage"
        :options="perPageOptions"
        @input="perPage = $event"
        @change="fetchTransactions(currentPage)"
      />
      <SearchInput
        v-model="searchQuery"
        @search="fetchTransactions(currentPage)"
      />
    </div>
    <div>
      <DataTable
        :items="transactions"
        :headers="headers"
        :keys="keys"
        :aksi="false"
        :currentPage="currentPage"
        :perPage="perPage"
      />
      <Pagination
        :pagination="pagination"
        :currentPage="currentPage"
        @page-change="fetchTransactions"
      />
    </div>
  </div>
</template>
<script>
import { fetchTransactionsData } from "@/helpers/apiService";
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
      transactions: [],
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
        { key: 'index', label: 'No' },
        { key: 'id', label: 'Order Id' },
        { key: 'id_customer', label: 'id customer' },
        { key: 'transaction_date', label: 'transaction date' },
        { key: 'address', label: 'address' },
        { key: 'total', label: 'total' },
        { key: 'status', label: 'status' },
      ],
      keys: ['id','id_customer', 'transaction_date', 'address', 'total','status'],
      currentPage: 1,
      perPageOptions: [5, 10, 15, 20],
      searchQuery: "",
      newTransaction: {
        id_customer: "",
        transaction_date: "",
        address: "",
        payment_method: "",
        status: "",
        total: "",
      },
      currentTransaction: null,
      isEditMode: false,
    };
  },
  created() {
    this.fetchTransactions(this.currentPage);
  },
  computed: {
    totalPages() {
      return Array.from({ length: this.pagination.last_page }, (_, i) => i + 1);
    },
  },
  methods: {
    async fetchTransactions(page) {
      try {
        const { transactions, pagination } = await fetchTransactionsData(
          page,
          this.perPage,
          this.searchQuery
        );
        this.transactions = transactions;
        this.pagination = pagination;
        this.currentPage = page;
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    },
  },
};
</script>
