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
            <Page :total="pageNum" show-elevator @on-change="currentPage"/>
        </Col>
    </Row>
</template>

<script>
    export default {
        name: "studentInf",
        props : ["studentData"],
        data(){
            return {
                columnConfig : [
                    {
                        title : "学生学号",
                        key : "stdId"
                    },
                    {
                        title: "学生名字",
                        key : "stdName"
                    },
                    {
                        title: "申请时间",
                        key: "applyDate"
                    },
                    {
                        title: "申请理由",
                        key: "applyReason",
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

                ],
                pageNum : 60,
                boxHeight : "",
                actionId : "" //这个至关重要，需要在请求的时候发出
            }
        },
        methods:{
            exportData(){
                //这里进行请求，导出必须从后端导出

            },

            computingPages(totalPages){
                if (totalPages <= 5) //暂时先用三来代替
                {
                    return 10;
                }
                else
                {
                    return Math.ceil(totalPages/5) * 10;//Math.ceil->向上取整
                }
            },

            currentPage(page){
                this.$request.get("/actInf/moreInf/page",{
                    params : {
                        currentPage : page ,
                        actId : this.actionId
                    }
                }).then(result => {
                    console.log(result.data);
                    this.studentList = result.data;
                }).catch(err => {
                    console.log(err);
                })
            }
        },
        created() {
            let screenWidth = document.documentElement.clientWidth;
            let screenHeight = document.documentElement.clientHeight;
            // console.log(screenHeight);

            this.columnConfig[3].width = screenWidth * 0.25;//设置申请理由表格宽度
            this.boxHeight = screenHeight * 0.8 + "px"; //设置本组件的高度

        },
        mounted() {
            //下面是表格分页的设置 包括学生名单和页数
            setTimeout(() => {
                //下面是表格分页的设置 包括学生名单和页数
                this.studentList = this.studentData.studentInf;
                this.pageNum = this.computingPages(this.studentData.studentsNum);
                this.actionId = this.studentData.studentInf[0].actionId;//设置活动Id，需要查询
            },500);

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