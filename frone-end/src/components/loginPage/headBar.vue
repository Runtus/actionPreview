<template>
    <div id="headBar">
        <div id="image">

        </div>
        <div id="router-box">
            <router-link to="/login">Login&nbsp/&nbsp</router-link>
            <router-link to="/index">Index</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "headBar"
    }
</script>

<style scoped>
#headBar{
    border: 1px solid black;
}
</style>