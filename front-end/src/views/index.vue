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
                withCredentials : true,
                headers:{
                    "Content-type":"text/plain;"
                }
            }).then(
                (result) => {
                    console.log(result);
                    this.$store.state.teaName = result.data;
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