<template>
    <div>
        <div>
            <router-link to="/login">Login</router-link>
            <router-link to="/index">Index</router-link>
        </div>
        <pub-action></pub-action>
    </div>
</template>

<script>
    import PubAction from "../components/indexPage/pubAction";
    export default {
        name: "index",
        components: {PubAction}
    }
</script>

<style scoped>

</style>