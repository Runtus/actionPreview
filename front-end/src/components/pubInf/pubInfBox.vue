<template>
    <div id="the-main-box">
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
                        key : "acttitle"
                    },
                    {
                        title: "活动时间",
                        key : "actdate"
                    },
                    {
                        title: "活动地点",
                        key : "actplace"
                    },
                    {
                        title : "人数上限",
                        key : "maxpeople"
                    },
                    {
                        title: "发布活动的老师",
                        key : "teachername",
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
                pageSize : 5,
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
                // console.log("传进来的参数: ",middleData)
                middleData.forEach(x => { //对时间消息进行处理
                    let array = x.actdate.split(" ");
                    x.actdate = array[0]+" "+array[1]+"-"+array[2];
                });
                return middleData;
            },

            computingPages(totalPages){
                if (totalPages <= this.pageSize) //暂时先用三来代替
                {
                    return 10;
                }
                else
                {
                    return Math.ceil(totalPages/ this.pageSize) * 10;//Math.ceil->向上取整
                }
            },



            //下面是需要进行响应请求的函数
            //点击页面的响应
            currentPage(page){
                this.currentPageVar = page;
                var start = this.pageSize * (page - 1) + 1; // 开始的页数
                console.log('start',start);
                // var token = sessionStorage.getItem("token");
                if(this.searchedInf === "") //当搜索框没有值的时候，进行这种请求
                {
                    this.$request.get('/activity/page',{
                        params : {
                            size : this.pageSize,
                            start : start
                        }
                    }).then((result) => {
                        console.log("result",result)
                        let middleData = result.data.data.actlist;//middleData是中间数组，不用管
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


                // window.location.href="http://127.0.0.1:8000/excel/excel-actions-list"
                this.$request.get("/excel/excel-actions-list",{
                    headers : {
                        responseType : 'blob'
                    }
                })
                    .then((result) => {
                        if (result.data.status === "empty")
                        {
                            this.$Message.info("抱歉，无数据，无法导出.");
                        }
                        else
                        {
                            //获得对应的下载
                            window.location.href="http://118.31.105.159:3389/excel/excel-actions-list";
                            // let blob = new Blob([result.data],{type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'});
                            // let download = document.createElement('a');
                            // let href = window.URL.createObjectURL(blob);
                            // let date = new Date();
                            // download.href = href;
                            // download.download = `${date.getMonth()}月${date.getDate()}日${date.getHours()}时的活动名单.xlsx`;
                            // document.body.appendChild(download);
                            // download.click(); //点击下载
                            // document.body.removeChild(download); //下载完成移除元素
                            // window.URL.revokeObjectURL(href); //释放掉blob对象
                            this.$Message.success("请等待下载");
                        }
                    }).catch((err) => {
                    console.log(err);
                    this.$Message.warning("出错");
                })
            },


            //路由跳转函数
            giveRow(index){
                // console.log(index);
                console.log('come on',this.pageNeedData.data1[index])
                this.$router.push({path :"/actInf/moreInf" , query : { actId : this.pageNeedData.data1[index].actionid}});
            },



        },

        //初始化的响应
        created() {
            this.$request.get(`/activity?size=${this.pageSize}`,{
            }).then((result) => {
                let totalNumber = 0;
                // console.log(result);
                if (result.data.status === "fail")
                {
                    alert("登录已过期，请重新登录!");
                    this.$router.push("/login");
                }
                else
                {
                    // this.$store.state.teaName = result.data.teacherName;//设置教师名称
                    console.log(result)
                    totalNumber = result.data.data.count; //一共的页数，前端进行
                    this.pageNum = this.computingPages(totalNumber); //计算页数
                    this.originPageNumber = this.pageNum;//缓存
                    let actList = result.data.data.actlist;
                    // console.log(actList)
                    this.pageNeedData.data1 = this.normalizingDate(actList); //日期规格化
                    this.pageNeedData.firstResData = [...this.pageNeedData.data1];//数组深度拷贝(解决引用类型问题)
                }

            }).catch((err) => {
                console.log(err);
            });
        },


        watch : { //实时搜索
            searchedInf : function () {
                let searchedInf = this.searchedInf;
                if(searchedInf === "")//索引框为空的时候，不用请求，直接用本地缓存值
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
#the-main-box{
    border-radius: 10px 10px;
    border: 1px solid #C9C9C9;
    box-shadow: 5px 5px 5px 5px #C9C9C9;
    height: 80%;
    position: relative;
    background-color: white;
}

#pubInfBox{
    /*border: 1px solid red;*/

}

.NavigationBox{

    width: 100%;
    position: absolute;
    bottom: 3%;
    border-radius: 10px;
    box-shadow: 2px 2px 1px 1px #EFEFEF;
    border:1px solid #EFEFEF;
}



</style>