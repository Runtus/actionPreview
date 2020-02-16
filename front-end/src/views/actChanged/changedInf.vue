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






            this.$store.state.dashboard = false;
        },
        beforeDestroy() {
            this.$store.state.dashboard = true; //防止dashboard出现
        }
    }
</script>

<style scoped>

</style>