<template>
    <fwb-carousel :pictures="pictures" slide />
  </template>
  
  <script setup>
  import { FwbCarousel } from 'flowbite-vue'
  
  const pictures = [
    {src: 'src/assets/3.jpg', alt: 'Image 1'},
    {src: 'src/assets/banner1.jpg', alt: 'Image 2'},
    {src: 'src/assets/banner3.jpg', alt: 'Image 3'},
  ]
  </script>