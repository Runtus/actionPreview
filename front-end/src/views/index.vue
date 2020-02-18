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
            debugger
            this.$store.state.pageConfig.xxl_size_logo = 7;
            this.$store.state.pageConfig.xl_size_logo = 6;
            this.$store.state.pageConfig.xxl_size_title = 9;
            this.$store.state.pageConfig.xl_size_title = 6;
            this.$store.state.pageConfig.xxl_offset_title = 0;
            this.$store.state.pageConfig.xl_offset_title  = 0;
            console.log(this.$store.state.dashboardWidth);
            this.$store.state.dashboard = true;
            console.log(this.$store.state.dashboard);
            this.$request.get('/pubAct',{
                headers:{
                    "Content-type":"text/plain;"
                }
            }).then(
                (result) => {

                    if(result.data.status === "success")
                    {
                        console.log("你好"+result.data.teacherName);
                        this.$store.state.teaName = result.data.teacherName;
                    }
                    else
                    {
                        this.$Message.info("请重新登录!");
                        this.$router.push("/login");
                    }


                }
            ).catch((err) => {
                console.log(err);
            })
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