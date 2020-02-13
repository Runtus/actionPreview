<template>
    <Row id="studentInf" :style="{'height': boxHeight}">
        <Col >
            <div ref="table">
            <Table border :columns="columnConfig" :data="studentList" class="table" ref="selection" ></Table>
            </div>
        </Col>
        <Col class="col-2">
            <Button type="primary" size="large" @click="exportData"><Icon type="ios-download-outline"></Icon>导出所有学生信息</Button>
        </Col>
        <Col class="col-3">
            <Page :total="pageNum" show-elevator />
        </Col>
    </Row>
</template>

<script>
    export default {
        name: "studentInf",
        data(){
            return {
                columnConfig : [
                    {
                        title : "学生学号",
                        key : "id"
                    },
                    {
                        title: "学生名字",
                        key : "name"
                    },
                    {
                        title: "申请时间",
                        key: "time"
                    },
                    {
                        title: "申请理由",
                        key: "result",
                        width : "",
                        align : "center"
                    },
                    {
                        type : 'selection',
                        width: 60,
                        align: 'center'
                    }

                ],
                studentList : [
                    {
                        id : "2018",
                        name : "有点骚"
                    },
                    {
                        id : "2018",
                        name : "有点骚"
                    },
                    {
                        id : "2018",
                        name : "有点骚"
                    },
                    {
                        id : "2018",
                        name : "有点骚"
                    },
                    {
                        id : "2018",
                        name : "有点骚"
                    },
                    {
                        id : "2018",
                        name : "有点骚"
                    },
                    {
                        id : "2018",
                        name : "有点骚"
                    },
                    {
                        id : "2018",
                        name : "有点骚"
                    },
                    {
                        id : "2018",
                        name : "有点骚"
                    },
                    {
                        id : "2018",
                        name : "有点骚"
                    },
                    {
                        id : "2018",
                        name : "有点骚"
                    }
                ],
                pageNum : 60,
                boxHeight : ""
            }
        },
        methods:{
            exportData(){
                //这里进行请求，导出必须从后端导出

            }
        },
        created() {
            let screenWidth = document.documentElement.clientWidth;
            let screenHeight = document.documentElement.clientHeight;
            // console.log(screenHeight);

            console.log(this.$refs["table"]);
            this.columnConfig[3].width = screenWidth * 0.25;//设置申请理由表格宽度
            this.boxHeight = screenHeight * 0.8 + "px"; //设置本组件的高度
        }
    }
</script>

<style scoped>
#studentInf{
    border: 1px solid red;
    min-width: 25%;
    max-width: 60%;
    position: relative;
}

.table {

}

.col-2{
    position: absolute;
    bottom: 10px;
    right: 4%;
}

.col-3{
    position: absolute;
    bottom : 10px;
    left: 4%;
}
</style>