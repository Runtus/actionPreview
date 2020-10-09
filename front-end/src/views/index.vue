<template>
    <div id="index">
        <pub-action class="pub-action"></pub-action>
    </div>
</template>

<script>
    import PubAction from "../components/indexPage/pubAction";
    export default {
        name: "index",
        components: {PubAction},
        created() {
            this.$store.state.pageConfig.xxl_size_logo = 7;
            this.$store.state.pageConfig.xl_size_logo = 6;
            this.$store.state.pageConfig.xxl_size_title = 9;
            this.$store.state.pageConfig.xl_size_title = 6;
            this.$store.state.pageConfig.xxl_offset_title = 0;
            this.$store.state.pageConfig.xl_offset_title  = 0;
            console.log(this.$store.state.dashboardWidth);
            this.$store.state.dashboard = true;
            if(this.$store.state.teaName === "none"){
                console.log(sessionStorage.getItem("token"))
                if(sessionStorage.getItem("token")){
                    this.$store.state.teaName = sessionStorage.getItem("teaName");
                }else{
                    this.$Message.error("请先登录!")
                    this.$router.push("/login");
                }
            }
            else{
                this.$Message.success(`${this.$store.state.teaName}老师，您好`);
                console.log(this.$store.state.dashboard);
            }

        }
    }

</script>

<style scoped>
.pub-action{
    /*position: absolute;*/

    margin: 0 auto;
}

.pub-action{
    margin-top:5%;
    border: 1px solid #C9C9C9;
    box-shadow: 5px 5px 5px 5px #C9C9C9;
}
</style>