<template>
    <fwb-carousel :pictures="pictures" slide />
  </template>
  
  <script setup>
  import { FwbCarousel } from 'flowbite-vue'
  
  const pictures = [
    {src: 'src/assets/image.png', alt: 'Image 1'},
    {src: 'src/assets/image1.png', alt: 'Image 2'},
    {src: 'src/assets/banner2.jpeg', alt: 'Image 3'},
  ]
  </script>