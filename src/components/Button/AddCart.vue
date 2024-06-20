<template>
  <button class="px-4 py-2 rounded focus:outline-none text-white bg-gradient-to-tr from-green-300 to-blue-500 hover:bg-gradient-to-tl focus:ring-2 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'MyButton',
}
</script>
