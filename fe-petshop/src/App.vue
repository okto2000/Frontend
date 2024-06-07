<template>
  <RouterView />
</template>
<script>

export default {
 
  data() {
    return {

    }
  },
  mounted() {
    this.getdata()
  },
  methods: {
    async getdata() {
      console.log("KE 1");
      const data = await this.getdataaxios()
      console.log(data)
      console.log("Ke 3")
    },
    getdataaxios() {
      setTimeout(function () {
        return "Kedua";
      }, 2000);
    }
  }
}
</script>