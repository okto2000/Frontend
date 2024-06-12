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
import { onUpdated } from "vue";
export default {
  data() {
    return {
      user: {
        username: "Asep Bensin",
        password: "password",
      },
      selected: {},
    };
  },
  methods: {
    onUpdated() {
      this.user.username = this.selected.username;
      this.user.password = this.selected.password;
      this.selected = {};
    },
  },
};
</script>
