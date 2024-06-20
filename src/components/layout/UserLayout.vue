<template>
  <Navbar :userchange="userchange" />
  <RouterView @updateUser="updateUser"/>
  <Footer />
</template>
<script>
import Navbar from "@/components/Navbars/UserNavbar.vue";
import Footer from "@/components/Footers/Footer.vue";
export default {
  components: { Navbar, Footer },
  data() {
    return {
      userchange: false,
    };
  },
  methods: {
    updateUser() {
      alert("User updated successfully");
      this.userchange=!this.userchange;
    },
  },
};
</script>

