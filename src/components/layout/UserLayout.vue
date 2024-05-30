<template>
    <Navbar />
    <RouterView />
    <Footer />
</template>
<script>
import Navbar from '@/components/Navbars/Navbar.vue';
import Footer from '@/components/Footers/Footer.vue';
export default {
    components: { Navbar,Footer },
    data() {
        return {

        }
    },
}
</script>