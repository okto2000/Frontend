<template>
  <div>
    <main class="sm:flex mx-auto max-w-7xl px-6 lg:px-8 container">
      <Sidebar />
      <CardProfile />
    </main>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar/UserSidebar.vue";
import CardProfile from "@/components/Cards/CardProfile.vue";
export default {
  components: {
    Sidebar,
    CardProfile,
  },
};
</script>
