<template>
  <div>
    <h1 class="mb-12 font-bold">Data Transaction</h1>
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
        :items="transactions"
        :headers="['No', 'id customer', 'transaction date', 'address','total', 'status']"
        :keys="['id_customer', 'transaction_date', 'address', 'total','status']"
        :aksi="false"
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
import { fetchTransactionsData } from "@/helpers/apiService";
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
      currentPage: 1,
      perPage: 10,
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
    // saveTransaction() {
    //   if (this.isEditMode && this.currentTransaction) {
    //     this.updateTransaction(this.currentTransaction.id, this.newTransaction);
    //   } else {
    //     this.createTransaction();
    //   }
    // },
    // async createTransaction() {
    //   try {
    //     const response = await createTransaction(this.newTransaction);
    //     this.transactions.push(response.data);
    //     alert('Transaction created successfully');
    //     this.resetNewTransactionForm();
    //     this.fetchTransactions(this.currentPage);
    //   } catch (error) {
    //     console.error('Error creating transaction:', error);
    //   }
    // },
    // async updateTransaction(id, updatedData) {
    //   try {
    //     const { data } = await updateTransaction(id, updatedData);
    //     const updatedTransactionIndex = this.transactions.findIndex(transaction => transaction.id === id);
    //     if (updatedTransactionIndex !== -1) {
    //       this.transactions[updatedTransactionIndex] = data;
    //     }
    //     alert('Transaction updated successfully');
    //     this.fetchTransactions(this.currentPage);
    //     this.resetForm();
    //   } catch (error) {
    //     console.error(`Failed to update transaction with id ${id}:`, error);
    //   }
    // },
    // async onDelete(id) {
    //   try {
    //     await deleteTransaction(id);
    //     this.transactions = this.transactions.filter(transaction => transaction.id !== id);
    //     this.fetchTransactions(this.currentPage);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
    // onEdit(transaction) {
    //   this.currentTransaction = transaction;
    //   this.newTransaction = {
    //     id_customer: transaction.id_customer,
    //     transaction_date: transaction.transaction_date,
    //     address: transaction.address,
    //     payment_method: transaction.payment_method,
    //     status: transaction.status,
    //     total: transaction.total,
    //   };
    //   this.isEditMode = true;
    // },
    // resetNewTransactionForm() {
    //   this.newTransaction = {
    //     id_customer: '',
    //     transaction_date: '',
    //     address: '',
    //     payment_method: '',
    //     status: '',
    //     total: '',
    //   };
    // },
    // resetForm() {
    //   this.newTransaction = {
    //     id_customer: '',
    //     transaction_date: '',
    //     address: '',
    //     payment_method: '',
    //     status: '',
    //     total: '',
    //   };
    //   this.currentTransaction = null;
    //   this.isEditMode = false;
    // },
  },
};
</script>
