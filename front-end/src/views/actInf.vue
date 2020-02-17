<template>
    <div id="actInf">
        <pub-inf-box class="overBox special"></pub-inf-box>
    </div>
</template>



<script>
    import PubInfBox from "../components/pubInf/pubInfBox";
    export default {
        name: "actInf",
        components: { PubInfBox}
    }
</script>

<style scoped>
#actInf{
    height: 100%;
    /*border: 1px solid black;*/
    background-color:  #EFEFEF;
}




.special{
    margin-top: 3%;
}

</style>