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
        created() {
            console.log(this.$route.name );
            if(this.$route.name === "login") //判断，如果是首页的话，就全沾满
            {
                this.$store.state.routerWidth = 24;
                this.$store.state.dashboardWidth = 0;
            }
            this.$store.state.dashboard = false;
        },
        beforeDestroy() {
            this.$store.state.routerWidth = 21;
            this.$store.state.dashboardWidth = 3;
        },

    }

</script>

<style scoped>
#login{
    width: 100%;
    height: 100%;
    position: relative;
}

.login-box{
    margin: 14% auto 20%;
    background-color: white;
}
</style>