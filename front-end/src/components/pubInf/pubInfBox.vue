<template>
    <div >
        <Row id="searchBox">
            <Input search placeholder="搜索活动信息（请输入活动标题)" v-model="searchedInf" />
        </Row>

        <Row id="pubInfBox">
            <Table border :columns="columns" :data="pageNeedData.data1" >
            <template slot="action" slot-scope="{row , index}">
                <Button type="primary" @click="giveRow(index)">详细页面</Button>
            </template>
            </Table>
        </Row>

        <Row class="NavigationBox">
            <Col span="16" >
                <Page :total="pageNum" show-elevator  @on-change="currentPage"/>
            </Col>
            <Col span="8">
                <Button type="primary"  @click="exportData()"><Icon type="ios-download-outline"></Icon> Export source data</Button>
            </Col>
        </Row>

    </div>
</template>

<script>
    export default {
        name: "pubInfBox",
        data(){
            return {
                columns : [
                    {
                        title : "活动标题",
                        key : "actTitle"
                    },
                    {
                        title: "活动时间",
                        key : "actDate"
                    },
                    {
                        title: "活动地点",
                        key : "actPlace"
                    },
                    {
                        title: "发布活动的老师",
                        key : "teacherName",
                        width: 150
                    },
                    {
                        title: "活动详情",
                        slot : 'action',
                        align : "center",
                        // key : "Inf",
                        width : 150
                    }
                ],
                //页面需要的data
                pageNeedData : {
                    data1 : [

                    ],
                    firstResData : [ //首次响应获得的data

                    ]
                },

                pageNum : 0,
                currentPageVar : 1,
                index : 0,
                searchedInf : "" ,//搜索框的数值
                originPageNumber : 0 //这个主要是做缓存，存储没有索引信息情况下的页数
            }
        },

        methods : {

            /*****必要函数信息*****/
            //日期规格化函数
            normalizingDate(middleData) {
                middleData.forEach(x => { //对时间消息进行处理
                    let array = x.actDate.split(" ");
                    x.actDate = array[0]+" "+array[1]+"-"+array[2];
                });
                return middleData;
            },

            computingPages(totalPages){
                if (totalPages <= 3) //暂时先用三来代替
                {
                    return 10;
                }
                else
                {
                    return Math.ceil(totalPages/3) * 10;//Math.ceil->向上取整
                }
            },



            //下面是需要进行响应请求的函数
            //点击页面的响应
            currentPage(page){

                this.currentPageVar = page;
                if(this.searchedInf === null) //当搜索框没有值的时候，进行这种请求
                {
                    this.$request.get('/actInf/page',{
                        params : {
                            page : page
                        }
                    }).then((result) => {
                        let middleData = result.data;//middleData是中间数组，不用管
                        this.pageNeedData.data1 = this.normalizingDate(middleData);
                    }).catch(err => {
                        console.log(err);
                    })
                }

                else{
                    this.$request.get('/actInf/search/page',{
                        params : {
                            searchedInf : this.searchedInf,
                            currentPage : page
                        }
                    }).then((result) => {
                        console.log(result.data);
                        let middleData = result.data;
                        this.pageNeedData.data1 = this.normalizingDate(middleData);
                    }).catch((err) => {
                        console.log(err);
                    })
                }
            },

            //Excel表格导出
            exportData(){
                this.$request.get("/excel/action-Inf")
                    .then((result) => {
                        console.log(`处理结果${result}`);
                    }).catch((err) => {
                    console.log(err);
                })
            },


            //路由跳转函数
            giveRow(index){
                console.log(index);
                this.$router.push({path :"/actInf/moreInf" , query : { actId : this.pageNeedData.data1[index].actionId}});
            },



        },

        //初始化的响应
        created() {
            this.$request.get("/actInf",{
            }).then((result) => {

                let totalNumber = 0;
                console.log(result);
                if (result.data.status === "fail")
                {
                    alert("登录已过期，请重新登录!");
                    this.$router.push("/login");
                }
                else
                {
                    this.$store.state.teaName = result.data.teacherName;//设置教师名称
                    totalNumber = result.data.actionNumber; //一共的页数，前端进行
                    this.pageNum = this.computingPages(totalNumber); //计算页数
                    this.originPageNumber = this.pageNum;//缓存
                    console.log(this.originPageNumber);

                    this.pageNeedData.data1 = this.normalizingDate(result.data.data); //日期规格化
                    this.pageNeedData.firstResData = [...this.pageNeedData.data1];//数组深度拷贝(解决引用类型问题)
                }

            }).catch((err) => {
                console.log(err);
            });
        },


        watch : { //实时搜索
            searchedInf : function () {
                let searchedInf = this.searchedInf;
                if(searchedInf === null)//索引框为空的时候，不用请求，直接用本地缓存值
                {
                    console.log(this.originPageNumber);
                    this.pageNeedData.data1 = [...this.pageNeedData.firstResData];
                    this.pageNum = this.originPageNumber;
                }
                else
                { //当索引框不为空的时候的请求
                    this.$request.get("/actInf/search",{
                        params : {
                            searchedInf : searchedInf
                        }
                    }).then((result) => {
                        console.log(result.data);
                        if (result.data === null)
                        {
                            this.pageNeedData.data1 = [...this.pageNeedData.firstResData];//为0的时候，把对应数据拷贝进去
                        }
                        else
                        {
                            console.log(result.data);
                            this.pageNum = this.computingPages(result.data.pageNum);//进行搜索页数计算
                            this.pageNeedData.data1 = result.data.searchedData;
                            // this.pageNeedData.data1 = result.data;
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                }//else

            }
        }
    }
</script>

<style scoped>
#pubInfBox{
    border: 1px solid red;

}

.NavigationBox{
    border:1px solid red;
    width: 100%;
}
</style>