<template>
    <div id="headBar">
        <div id="imageBox">
            <img src="../../assets/XinRuan.jpg" >
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


/*图片样式设置*/
#imageBox{
    width: 100px;
    height: 100px;
    position: relative;
}

#imageBox > img{
    width: 100%;
    height: 100%;
}


</style>