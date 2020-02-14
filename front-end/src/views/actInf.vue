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
}


.overBox{
    margin-left: 240px;
}

.special{
    margin-top: 3%;
}

</style>