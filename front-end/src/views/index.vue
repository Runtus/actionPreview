<template>
    <div id="index">
        <div>
            <router-link to="/login">Login</router-link>
            <router-link to="/index">Index</router-link>
        </div>
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
    margin: 0 auto;
}
</style>