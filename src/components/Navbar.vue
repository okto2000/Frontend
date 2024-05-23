<template>
  <fwb-navbar>
    <template #logo>
      <div class="text-xl">Pet Shop</div>
    </template>
    <template #default="{isShowMenu}">
      <fwb-navbar-collapse :is-show-menu="isShowMenu">
        <fwb-navbar-link is-active link="/">
          Home
        </fwb-navbar-link>
        <fwb-navbar-link link="#">
          Services
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
} from 'flowbite-vue'
</script>