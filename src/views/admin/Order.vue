<template>
  <div>
    <h1 class="mb-12 font-bold">Data Transaction</h1>
    <!-- <input
      v-model="selected.id_customer"
      type="text"
      class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
    />
    <input
      v-model="selected.transaction_date"
      type="text"
      class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
    />
    <input
      v-model="selected.address"
      type="text"
      class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
    />
    <input
      v-model="selected.payment_method"
      type="text"
      class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
    />
    <input
      v-model="selected.status"
      type="text"
      class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
    />
    <input
      v-model="selected.total"
      type="text"
      class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
    />
    <button
      @click="onUpdated"
      class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center"
    >
      Update
    </button> -->
    <div class="mb-12">
      <table
        class="border-spacing-4 border border-slate-500 w-full text-center"
      >
        <thead>
          <tr class="border border-slate-600">
            <th class="border border-slate-600">Id</th>
            <th class="border border-slate-600">Id customer</th>
            <th class="border border-slate-600">Transaction date</th>
            <th class="border border-slate-600">Address</th>
            <th class="border border-slate-600">Payment method</th>
            <th class="border border-slate-600">Status</th>
            <th class="border border-slate-600">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaction in transactions" :key="transaction.id">
            <td class="border border-slate-700">
              {{ transaction.id }}
            </td>
            <td class="border border-slate-700">
              {{ transaction.id_customer }}
            </td>
            <td class="border border-slate-700">
              {{ transaction.transaction_date }}
            </td>
            <td class="border border-slate-700">
              {{ transaction.address }}
            </td>
            <td class="border border-slate-700">
              {{ transaction.payment_method }}
            </td>
            <td class="border border-slate-700">
              {{ transaction.status }}
            </td>
            <td class="border border-slate-700">
              {{ transaction.total }}
            </td>
            <td class="space-x-2 border border-slate-700">
              <button
                @click="onEdit(transaction)"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center"
              >
                Edit
              </button>
              <button
                @click="onDelete(transaction)"
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
  <div class="flex justify-between">
      <div class="space-x-1 items-center justify-start text-center">
      <PageButton @click="fetchTransactions(currentPage - 1)" :disabled="!pagination.prev_page_url">Previous</PageButton>
      <PageButton  v-for="page in pagination.last_page"
      :key="page"
      :is-active="currentPage === page"
      @click="fetchTransactions(page)"
    >
      {{ page }}
      </PageButton>
      <PageButton @click="fetchTransactions(currentPage + 1)" :disabled="!pagination.next_page_url">Next</PageButton>
    </div>
     <div>
      <p class="text-sm">Showing {{ pagination.from }} to {{ pagination.to }} of {{ pagination.total }} items</p>
     </div>
    </div>
</template>
<script>
import { fetchTransactionsData } from '@/helpers/apiService';
import PageButton from '@/components/Button/Pagination.vue'

export default {
  components: {
    PageButton
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
      searchQuery: '',
      newTransaction: {
        id_customer: '',
        transaction_date: '',
        address: '',
        payment_method: '',
        status: '',
        total: '',
      },
      currentTransaction: null,
      isEditMode: false,
    };
  },
  created() {
    this.fetchTransactions(this.currentPage)
  },
  computed: {
    totalPages() {
      return Array.from({ length: this.pagination.last_page }, (_, i) => i + 1);
    },
  },
  methods: {
    async fetchTransactions(page) {
      try {
        const { transactions, pagination } = await fetchTransactionsData(page, this.perPage, this.searchQuery);
        this.transactions = transactions;
        this.pagination = pagination;
        this.currentPage = page;
      } catch (error) {
        console.error('Error fetching transactions:', error);
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