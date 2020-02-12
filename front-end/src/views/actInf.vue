<template>
    <div id="actInf">
        <pub-inf-box></pub-inf-box>
        <NavigationBox class="Navigation"></NavigationBox>
    </div>
</template>



<script>
    import PubInfBox from "../components/pubInf/pubInfBox";
    import NavigationBox from "../components/pubInf/NavigationBox";
    export default {
        name: "actInf",
        components: {NavigationBox, PubInfBox}
    }
</script>

<style scoped>
.Navigation{
    margin-top: 2%;
    /*border: 1px solid black;*/
}
</style>