<template>
    <div id="Inf">
        <changed-inf-box></changed-inf-box>
    </div>
</template>

<script>
    import ChangedInfBox from "../../components/actChangedInf/changedInfBox/changedInfBox";
    export default {
        name: "changedInf",
        components: {ChangedInfBox},
        data(){
            return {

            }
        },
        created() {
            {

                this.$store.state.pageConfig.xxl_size_logo = 7;
                this.$store.state.pageConfig.xl_size_logo = 6;
                this.$store.state.pageConfig.xxl_size_title = 9;
                this.$store.state.pageConfig.xl_size_title = 6;
                this.$store.state.pageConfig.xxl_offset_title = 0;
                this.$store.state.pageConfig.xl_offset_title  = 0;
            }
            this.$store.state.routerWidth = 24;
            this.$store.state.dashboardWidth = 0;
            this.$store.state.dashboard = false;
        },
        beforeDestroy() {
            this.$store.state.routerWidth = 21;
            this.$store.state.dashboardWidth = 3;
            this.$store.state.dashboard = true; //防止dashboard出现
        }
    }
</script>

<style scoped>

</style>