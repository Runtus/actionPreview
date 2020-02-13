<template>
    <div id="searchBox">
        <Input search placeholder="搜索活动信息" v-model="searchedInf" @on-enter="searchBegin"/>
    </div>
</template>

<script>
    export default {
        name: "searchBox",
        data(){
            return {
                searchedInf : ""
            }
        },
        methods:{
            searchBegin(){
                //后端返回数据
            }
        },


    }
</script>

<style scoped>

</style>