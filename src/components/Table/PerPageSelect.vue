<template>
  <div>
    <label for="perPage">Display </label>
    <select
      class="rounded-lg text-sm px-2 py-1"
      id="perPage"
      v-model="localPerPage"
      @change="handleChange($event)"
    >
      <option
        v-for="perPageOption in perPageOptions"
        :key="perPageOption"
        :value="perPageOption"
      >
        {{ perPageOption }}
      </option>
    </select>
    <label for="perPage"> results:</label>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 10,
    },
    perPageOptions: {
      type: Array,
      default: () => [5, 10, 15, 20],
    },
  },
  data() {
    return {
      perPage: 10,
      localPerPage: this.value,
    };
  },
  methods: {
    handleChange(event) {
      const selectedValue = parseInt(event.target.value);
      this.$emit('input', selectedValue);
      this.$emit('change', selectedValue);
    },
  },
  watch: {
    value(newVal) {
      this.localPerPage = newVal;
    },
  },
};
</script>
