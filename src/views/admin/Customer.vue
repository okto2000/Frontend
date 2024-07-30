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
      <input
        class="rounded"
        type="text"
        v-model="searchQuery"
        @input="fetchCustomers(currentPage)"
        placeholder="Search customers"
      />
    </div>
    <table class="border-spacing-4 border border-slate-500 w-full text-center">
      <thead>
        <tr class="border border-slate-600">
          <th class="border border-slate-600">Id</th>
          <th class="border border-slate-600">Name</th>
          <th class="border border-slate-600">Address</th>
          <th class="border border-slate-600">No Telepon</th>
          <th class="border border-slate-600">Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in customers" :key="customer.id">
          <td class="border border-slate-700">
            {{ customer.id }}
          </td>
          <td class="border border-slate-700">
            {{ customer.name }}
          </td>
          <td class="border border-slate-700">
            {{ customer.address }}
          </td>
          <td class="border border-slate-700">
            {{ customer.notelp }}
          </td>
          <td class="border border-slate-700">
            {{ customer.email }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="flex justify-between mt-2">
    <div class="space-x-1 items-center justify-start text-center">
      <PageButton
        @click="fetchCustomers(currentPage - 1)"
        :disabled="!pagination.prev_page_url"
        >Previous</PageButton
      >
      <PageButton
        v-for="page in pagination.last_page"
        :key="page"
        :is-active="currentPage === page"
        @click="fetchCustomers(page)"
      >
        {{ page }}
      </PageButton>
      <PageButton
        @click="fetchCustomers(currentPage + 1)"
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
</template>
<script>
import {
  fetchCustomersData,
} from "@/helpers/apiService";
import PageButton from '@/components/Button/Pagination.vue'

export default {
  components:{
    PageButton
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
      searchQuery: ""
      };
    },
  created() {
    this.fetchCustomers(this.currentPage)
  },
  computed: {
    totalPages() {
      return Array.from({ length: this.pagination.last_page }, (_, i) => i + 1);
    },
  },
  methods: {
    async fetchCustomers(page) {
      try {
        const { customers, pagination } = await fetchCustomersData(page, this.perPage, this.searchQuery);
        this.customers = customers;
        this.pagination = pagination;
        this.currentPage = page;
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    },
  },
};
</script>
