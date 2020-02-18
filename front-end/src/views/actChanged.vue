<template>
    <div id="changed">
        <act-inf-changed-box></act-inf-changed-box>
    </div>
</template>

<script>
    import ActInfChangedBox from "../components/actChangedInf/act-inf-changed-box";
    export default {
        name: "actChanged",
        created() {
            this.$store.state.pageConfig.xxl_size_logo = 7;
            this.$store.state.pageConfig.xl_size_logo = 6;
            this.$store.state.pageConfig.xxl_size_title = 9;
            this.$store.state.pageConfig.xl_size_title = 6;
            this.$store.state.pageConfig.xxl_offset_title = 0;
            this.$store.state.pageConfig.xl_offset_title  = 0;
        },
        components: {ActInfChangedBox}
    }
</script>

<style scoped>
#changed{
    border: 1px solid #C9C9C9;
    background-color: white;
    border-radius: 10px 10px;
    margin-top: 3%;
    height: 80%;
    box-shadow: 5px 5px 5px 5px #C9C9C9;

}
</style>