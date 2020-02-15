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
                        alert("登录失效，请重新登录");
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
    position: absolute;
    left: 0;
    top: 2%;
    height: 95%;
    margin: 0 auto;
}
</style>