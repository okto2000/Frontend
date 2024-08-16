<template>
  <div class="relative overflow-x-auto rounded-lg">
    <table class="w-full text-sm text-center text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-900 uppercase dark:text-gray-400">
        <tr class="bg-blue-500">
          <th
            v-for="header in headers"
            :key="header.key"
            scope="col"
            class="px-6 py-3 cursor-pointer"
            @click="sortBy(header.key)"
          >
            {{ header.label }}
            <span v-if="sortKey === header.key">
              <span v-if="sortOrder === 'asc'">▲</span>
              <span v-else>▼</span>
            </span>
          </th>
        </tr>
      </thead>
      <tbody class="font-semibold">
        <tr v-if="isLoading" class="border-b bg-gray-100 hover:bg-blue-200">
          <td colspan="100%" class="px-6 py-4 text-black">
            <div class="loading-dots">
              Loading<span v-for="n in 4" :key="n" class="dot">.</span>
            </div>
          </td>
        </tr>
        <tr
          v-else-if="!isLoading && items.length === 0"
          class="border-b bg-gray-100 hover:bg-blue-200"
        >
          <td colspan="100%" class="px-6 py-4 text-black">
            No Data
          </td>
        </tr>
        <tr
        v-else
          v-for="(item, index) in sortedItems"
          :key="getGlobalIndex(index)"
          class="border-b bg-gray-100 hover:bg-blue-200"
        >
          <td
            scope="row"
            class="px-4 py-2 font-medium text-black whitespace-nowrap"
          >
            {{ getGlobalIndex(index) }}
          </td>
          <td v-for="key in keys" :key="key" class="px-6 py-4 text-black">
            <img
              v-if="key === 'image'"
              :src="item[key]"
              alt="Product Image"
              class="w-20 h-20"
            />
            <span v-else>{{ item[key] }}</span>
          </td>
          <td
            v-if="aksi"
            scope="row"
            class="px-6 py-4 font-medium text-white whitespace-nowrap"
          >
            <div class="flex justify-center space-x-2">
              <button
                @click="$emit('edit', item)"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-light rounded-lg text-xs px-2 py-0.5 text-center"
              >
                Edit
              </button>
              <button
                @click="$emit('delete', item.id)"
                class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-light rounded-lg text-xs px-2 py-0.5 text-center"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: true,
      sortKey: '', // key untuk urutan
      sortOrder: 'asc', // 'asc' atau 'desc'
    };
  },
  props: {
    items: Array,
    headers: Array,
    keys: Array,
    aksi: {
      Boolean,
      default: true,
    },
    currentPage: {
      Number,
      default: 1
    },
    perPage: {
      type: Number,
      default: 10,  
    },
  },
  computed: {
    sortedItems() {
      if (!this.sortKey) {
        return this.items;
      }
      return this.items.slice().sort((a, b) => {
        let result = 0;
        if (a[this.sortKey] < b[this.sortKey]) {
          result = -1;
        } else if (a[this.sortKey] > b[this.sortKey]) {
          result = 1;
        }
        return this.sortOrder === 'asc' ? result : -result;
      });
    },
  },
  methods: {
    getGlobalIndex(index) {
        console.log("Index:", index);
        console.log("Current Page:", this.currentPage);
        console.log("Per Page:", this.perPage);
      return (this.currentPage - 1) * this.perPage + index + 1;
    },
    fetchData() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 2000); 
    },
    sortBy(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortKey = key;
        this.sortOrder = 'asc';
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
.loading-dots {
  display: inline-flex;
  align-items: center;
  font-size: 1rem;
}

.dot {
  animation: blink 1s infinite both;
}

.dot:nth-child(2) {
  animation-delay: 0.25s;
}

.dot:nth-child(3) {
  animation-delay: 0.5s;
}

.dot:nth-child(4) {
  animation-delay: 0.75s;
}

@keyframes blink {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
