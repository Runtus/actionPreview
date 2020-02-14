<template>
    <div>
        <Row class="searchBox">
            <Col >
                <Input search placeholder="搜索活动信息（请输入活动标题)" v-model="searchedInf" />
            </Col>
        </Row>

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
    </div>
</template>

<script>
    export default {
        name: "studentInf",
        props: ["studentData"],
        data() {
            return {
                columnConfig: [
                    {
                        title: "学生学号",
                        key: "stdId"
                    },
                    {
                        title: "学生名字",
                        key: "stdName"
                    },
                    {
                        title: "申请时间",
                        key: "applyDate"
                    },
                    {
                        title: "申请理由",
                        key: "applyReason",
                        width: "",
                        align: "center"
                    },
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    }

                ],
                studentList: [],
                configData: {
                    originPageNum: 10, //缓存初始页数
                    originStudentList: [] //缓存初始页面数据
                },
                searchedInf: "",
                pageNum: 10,
                boxHeight: "",
                actionId: "", //这个至关重要，需要在请求的时候发出
            }
        },
        methods: {
            exportData() {
                //这里进行请求，导出必须从后端导出

            },

            computingPages(totalPages) {
                if (totalPages <= 5) //暂时先用三来代替
                {
                    return 10;
                } else {
                    return Math.ceil(totalPages / 5) * 10;//Math.ceil->向上取整
                }
            },

            currentPage(page) {
                console.log(this.searchedInf);
                if(this.searchedInf === "")
                {
                    this.$request.get("/actInf/moreInf/page", {
                        params: {
                            currentPage: page,
                            actId: this.actionId
                        }
                    }).then(result => {
                        console.log(result.data);
                        this.studentList = result.data;
                    }).catch(err => {
                        console.log(err);
                    })
                }
                else
                {
                    this.$request.get('/actInf/moreInf/search/page',{
                        params : {
                            searchedInf : this.searchedInf,
                            currentPage : page,
                            actionId : this.actionId
                        }
                    }).then((result) => {
                        console.log(result.data);
                        let middleData = result.data;
                        this.pageNeedData.data1 = this.normalizingDate(middleData);
                    }).catch((err) => {
                        console.log(err);
                    })
                }
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
                this.configData.originStudentList = [...this.studentList];//拷贝一份
                this.pageNum = this.computingPages(this.studentData.studentsNum);//计算页数
                this.configData.originPageNum = this.pageNum; //拷贝一份

                this.actionId = this.studentData.studentInf[0].actionId;//设置活动Id，需要查询

            }, 500); //设置时差，防止赋值失败。因为请求源是在父组件里

        },
        watch: { //实时搜索
            searchedInf: function () {
                let searchedInf = this.searchedInf;
                if (searchedInf === null)//索引框为空的时候，不用请求，直接用本地缓存值
                {
                    console.log(this.configData.originPageNum);
                    this.studentList = [...this.configData.originStudentList];
                    this.pageNum = this.configData.originPageNum;
                }
                else
                { //当索引框不为空的时候的请求
                    this.$request.get("/actInf/moreInf/search", {
                        params: {
                            actionId : this.actionId ,
                            searchedInf: searchedInf
                        }
                    }).then((result) => {
                        console.log(result.data);
                        this.pageNum = this.computingPages(result.data.pageNum);//进行搜索页数计算
                        this.studentList = result.data.searchedData;
                    }).catch((err) => {
                        console.log(err);
                    })
                }//else

            }
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