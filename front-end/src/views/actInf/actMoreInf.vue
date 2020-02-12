<template>
    <Row class="actMoreInf" >
        <router-link to="/actInf">去大力</router-link>
    </Row>
</template>

<script>
    export default {
        name: "actMoreInf",
        created() {
            this.$store.state.dashboard = false;
        },
        beforeDestroy() {
            this.$store.state.dashboard = true;
        }
    }
</script>

<style scoped>

</style>