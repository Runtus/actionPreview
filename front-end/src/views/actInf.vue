<template>
    <div id="actInf">
        <search-box class="overBox"></search-box>
        <pub-inf-box class="overBox special"></pub-inf-box>
    </div>
</template>



<script>
    import PubInfBox from "../components/pubInf/pubInfBox";
    import SearchBox from "../components/pubInf/searchBox";
    export default {
        name: "actInf",
        components: {SearchBox,  PubInfBox}
    }
</script>

<style scoped>
#actInf{
    height: 100%;
}


.Navigation{
    position: absolute;
    left: 2%;
    bottom: 6%;
    /*border: 1px solid black;*/
}
.overBox{
    margin-left: 240px;
}

.special{
    margin-top: 3%;
}

</style>