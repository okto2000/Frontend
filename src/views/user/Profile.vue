<template>
  <div>
    <main class="sm:flex mx-auto max-w-7xl px-6 lg:px-8 container">
      <Sidebar />
      <FormUser @updateUser="$emit('updateUser')"/>
    </main>
  </div>
</template>
<script>
import Sidebar from "@/components/Sidebar/UserSidebar.vue";
import FormUser from "@/components/Form/FormUser.vue";
export default {
  components:{
    Sidebar,
    FormUser
  },
  data() {
    return {
    };
}
};
</script>
