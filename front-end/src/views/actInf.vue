<template>
    <div id="actInf">
        <pub-inf-box class="overBox special"></pub-inf-box>
    </div>
</template>



<script>
    import PubInfBox from "../components/pubInf/pubInfBox";
    export default {
        name: "actInf",
        components: { PubInfBox},
        created() {
            this.$store.state.pageConfig.xxl_size_logo = 7;
            this.$store.state.pageConfig.xl_size_logo = 6;
            this.$store.state.pageConfig.xxl_size_title = 9;
            this.$store.state.pageConfig.xl_size_title = 6;
            this.$store.state.pageConfig.xxl_offset_title = 0;
            this.$store.state.pageConfig.xl_offset_title  = 0;
        }
    }
</script>

<style scoped>
#actInf{
    height: 100%;
    /*border: 1px solid black;*/
    background-color:  #EFEFEF;
}




.special{
    margin-top: 3%;
}

</style>