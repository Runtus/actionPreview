<template>
    <Row id="headBar" type="flex" justify="center" align="middle">
        <Col id="imageBox" span="5" >
            <img src="../assets/xr.png" >
        </Col>
        <Col>
            {{this.$store.state.teaName }}同学,你好!
        </Col>
        <Col id="font" span="5" offset="12">
            <p>后台管理系统</p>
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
    border : 1px solid black;
}

#imageBox > img{
    width: 100%;
    height: 60%;
}


#font{
    border: 1px solid black;

}

#font > p{
    font-size: 35px
}
</style>