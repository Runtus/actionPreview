<template>
    <Row id="headBar">
        <Col id="imageBox" span="5">
            <img src="../../assets/xr.png" >
        </Col>
    </Row>
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
    position: relative;
}

#imageBox > img{
    width: 100%;
    height: 60%;
}


</style>