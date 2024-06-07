<template>
    <main>
        <h1>DATA PRODUCT</h1>
        <input v-model="selected.name" type="text" />
        <button @click="onUpdate">Update</button>
        <table class="table table-hover table-striped">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Tipe</th>
                    <th>Harga</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in products" :key="index">
                    <td>{{item.id}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.tipe}}</td>
                    <td>{{item.price}}</td>
                    <td>
                        <button @click="onEdit(item)" class="btn btn-sm btn-primary">Edit</button>
                        <button @click="onDelete(item)" class="btn btn-sm btn-danger">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </main>
</template>
<script>
export default{
    data() {
        return {
            products:[],
            selected:{

            }
        }
    },
    created() {
        for (let index = 0; index < 200; index++) {
            this.products.push({
                id:index,
                name:"PRODUCT "+index,
                price:90000,
                tipe:index%2==0?"Pelayanan":"Barang",
            });
        }
    },
    methods:{
        onEdit(item){
           this.selected={...item}
        },
        onDelete(item){
            this.products.splice(item.id,1)
        },
        onUpdate(){
            var a=this.products.find(product=>product.id==this.selected.id)
            a.name=this.selected.name
        }
    }
}
</script>