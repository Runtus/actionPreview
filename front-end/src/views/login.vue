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
        created() {//全局变量配置
            {
                this.$store.state.teaName = "";//这里设置空只是为了清零，只要请求，全局变量就可以设置
                this.$store.state.pageConfig.xxl_size_logo = 7;
                this.$store.state.pageConfig.xxl_size_title = 9;
                this.$store.state.pageConfig.xxl_offset_title = 8;
                this.$store.state.pageConfig.xl_size_logo = 5;
                this.$store.state.pageConfig.xl_size_title = 7;
                this.$store.state.pageConfig.xl_offset_title = 10;
                this.$store.state.routerWidth = 24;
                this.$store.state.dashboardWidth = 0;
                this.$store.state.dashboard = false;
                console.log(this.$store.state.dashboard);
            }


        },
        beforeDestroy() {
            this.$store.state.routerWidth = 21;
            this.$store.state.dashboardWidth = 3;
            console.log(this.$store.state.pageConfig);
        }

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