<template>
    <div id="changed">
        <act-inf-changed-box></act-inf-changed-box>
    </div>
</template>

<script>
    import ActInfChangedBox from "../components/actChangedInf/act-inf-changed-box";
    export default {
        name: "actChanged",
        components: {ActInfChangedBox}
    }
</script>

<style scoped>
#changed{
    border: 1px solid #C9C9C9;
    background-color: white;
    border-radius: 10px 10px;
    margin-top: 3%;
    height: 80%;
    box-shadow: 5px 5px 5px 5px #C9C9C9;

}
</style>