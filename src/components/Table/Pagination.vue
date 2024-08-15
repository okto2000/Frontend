<template>
  <div class="flex justify-between">
    <div class="space-x-1 items-center justify-start text-center">
      <PageButton
        @click="changePage(currentPage - 1)"
        :disabled="!pagination.prev_page_url"
      >
        Previous
      </PageButton>
      <PageButton
        v-for="page in totalPages"
        :key="page"
        :class="{ 'bg-blue-500': page === currentPage }"
        @click="changePage(page)"
      >
        {{ page }}
      </PageButton>
      <PageButton
        @click="changePage(currentPage + 1)"
        :disabled="!pagination.next_page_url"
      >
        Next
      </PageButton>
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
import PageButton from "@/components/Button/Pagination.vue";
export default {
  data() {
    return {};
  },
  components: {
    PageButton,
  },
  props: {
    pagination: Object,
    currentPage: Number,
  },
  computed: {
    totalPages() {
      return Array.from({ length: this.pagination.last_page }, (_, i) => i + 1);
    },
  },
  methods: {
    changePage(page) {
      if (
        page !== this.currentPage &&
        page > 0 &&
        page <= this.pagination.last_page
      ) {
        this.$emit("page-change", page);
      }
    },
  },
};
</script>
