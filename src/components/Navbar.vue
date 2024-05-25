<template>
  <fwb-navbar>
    <template #logo>
      <fwb-navbar-logo alt="Flowbite logo" image-url="/src/assets/2.jpg" link="#">Pet Shop
      </fwb-navbar-logo>
    </template>
    <template #default="{isShowMenu}">
      <fwb-navbar-collapse :is-show-menu="isShowMenu">
        <fwb-navbar-link is-active link="/">
          Home
        </fwb-navbar-link>
        <fwb-navbar-link link="#">
          Layanan
        </fwb-navbar-link>
        <fwb-navbar-link link="/login">
          Login
        </fwb-navbar-link>
        <fwb-navbar-link link="#">
          Register
        </fwb-navbar-link>
      </fwb-navbar-collapse>
    </template>
  </fwb-navbar>
</template>

<script setup>
import {
  FwbNavbar,
  FwbNavbarCollapse,
  FwbNavbarLink,
  FwbNavbarLogo,
} from 'flowbite-vue'
</script>