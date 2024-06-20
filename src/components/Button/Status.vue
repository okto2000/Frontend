<template>
    <button :class="buttonClass">
      <slot></slot>
    </button>
  </template>
  
  <script>
  export default {
    name: 'ButtonStatus',
    props: {
      type: {
        type: String,
        default: 'primary'
      }
    },
    computed: {
      buttonClass() {
        const baseClass = 'px-4 py-2 rounded-lg outline outline-1';
        const typeClass = this.type === 'primary'
          ? 'text-sky-400 hover:bg-sky-50 outline-sky-400 text-sm text-center inline-flex justify-center text-xs font-semibold'
          : 'text-sky-600 hover:bg-sky-100 outline-sky-600 text-sm text-center inline-flex justify-center text-xs font-semibold';
        return `${baseClass} ${typeClass}`;
      }
    },
  }
  </script>
  