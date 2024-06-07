<template>
    <MyNavbarAdmin/>
    <router-view></router-view>
</template>
<script>
import MyNavbarAdmin from '@/components/MyNavbarAdmin.vue';
export default{
    components:{MyNavbarAdmin},
    data() {
        return {
            
        }
    },
}
</script>