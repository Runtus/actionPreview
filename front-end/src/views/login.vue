<template>
    <div>
        <head-bar></head-bar>
        <login-box></login-box>
    </div>
</template>

<script>
    import loginBox from "../components/LoginBox";
    import HeadBar from "../components/loginPage/headBar"; //注意import
    export default {
        name: "login",
        components: {HeadBar, loginBox} //组件
    }
</script>

<style scoped>

</style>