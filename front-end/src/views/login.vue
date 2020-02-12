<template>
    <div id="login">
        <login-box class="login-box"></login-box>
    </div>
</template>

<script>
    import loginBox from "../components/loginPage/LoginBox";
    import HeadBar from "../components/headBar"; //注意import
    export default {
        name: "login",
        components: {HeadBar, loginBox}, //组件
        beforeMount() {
                this.$store.state.dashboard = false;
        }

    }

</script>

<style scoped>
#login{
    position: relative;
}

.login-box{
    margin: 13% auto;

}
</style>