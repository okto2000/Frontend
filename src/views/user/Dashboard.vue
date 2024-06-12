<template>
<div>
      <main class="sm:flex mx-auto max-w-7xl px-6 lg:px-8">
        <Sidebar/>
        <CardProfile/>
      </main>
    </div>
</template>

<script setup>

  import Sidebar from "@/components/Sidebar/UserSidebar.vue";
  import CardProfile from "@/components/Cards/CardProfile.vue";

</script>