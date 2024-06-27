<template>
    <div>
      <sidebar />
      <div class="relative md:ml-64 bg-blueGray-100">
        <Karyawan-navbar />
        <header-stats />
        <div class="px-4 md:px-10 mx-auto w-full -m-24">
          <RouterView />
          <footer-Karyawan />
        </div>
      </div>
    </div>
  </template>
  <script>
  import KaryawanNavbar from "@/components/Navbars/EmployeeNavbar.vue";
  import Sidebar from "@/components/Sidebar/EmployeeSidebar.vue";
  import HeaderStats from "@/components/Headers/HeaderStats.vue";
  import FooterKaryawan from "@/components/Footers/EmployeeKaryawan.vue";
  export default {
    components: {
     KaryawanNavbar,
      Sidebar,
      HeaderStats,
      FooterKaryawan,
    },
  };
  </script>
  