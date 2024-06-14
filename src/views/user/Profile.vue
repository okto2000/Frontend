<script setup>
import Sidebar from "@/components/Sidebar/UserSidebar.vue";
import FormUser from "@/components/Form/FormUser.vue";
</script>
<template>
  <div>
    <main class="sm:flex mx-auto max-w-7xl px-6 lg:px-8">
      <Sidebar />
      <FormUser />
    </main>
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
}
};
</script>
