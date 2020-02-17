<template>
    <Row id="headBar" type="flex" justify="center" align="middle" ref="dashboard">
        <Col span = "7"   id="imageBox"  style="height: 100px;padding-top:10px;">
            <img src="../assets/xr.png" >
        </Col>

        <Col id="font" span="9" offset = "8">
            <p>后台管理系统</p>
        </Col>

    </Row>
</template>

<script>
    export default {
        name: "headBar",
        created() {

        }
    }
</script>

<style scoped>
#headBar{

    position: relative;
    border: 1px solid black;
    background-color: #515a6e;
}


/*图片样式设置*/

#imageBox > img{
    height:80px;
    width:400px;

    border-radius: 10px;
}


#font{
    /*border: 1px solid black;*/
    /*background: #7A8CB2;*/
    border-radius: 10px;


}

#font > p{
    line-height: 80px;
    font-size: 35px;
    color : black;

}
</style>