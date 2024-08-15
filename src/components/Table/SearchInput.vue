<template>
    <input
      class="rounded"
      type="text"
      v-model="localSearchQuery"
      @input="handleInput"
      placeholder="Search products"
    />
  </template>
  
  <script>
  export default {
    props: {
      value: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        localSearchQuery: this.value
      };
    },
    methods: {
      handleInput(event) {
        this.localSearchQuery = event.target.value;
        this.$emit('input', this.localSearchQuery);
        this.$emit('search', this.localSearchQuery);
      }
    },
    watch: {
      value(newVal) {
        this.localSearchQuery = newVal;
      }
    }
  };
  </script>
  