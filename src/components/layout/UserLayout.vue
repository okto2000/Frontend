<template>
  <Navbar :userchange="userchange" :cartCount="cartCount" />
  <RouterView @updateUser="updateUser" @updateCart="updateCart" />
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
      LoggedIn: false,
      cartCount: 0,
    };
  },
  methods: {
    updateUser() {
      this.userchange = !this.userchange;
    },
    updateCartCount() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        this.cartCount = cart.reduce((total, item) => total + item.quantity, 0);
      },
      updateCart(newCount) {
        this.cartCount = newCount;
      },
    },
    created() {
      this.updateCartCount();
    },
};
</script>
