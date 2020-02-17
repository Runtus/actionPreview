<template>
    <div id="mainBox">
        <Row id="actChanged">
            <Col>
                <Input search placeholder="输入想更改的消息" v-model="searchedInf"/>
            </Col>
        </Row>
        <Row>
            <Col>
                <Table border :columns="tableConfig.columns" :data="tableConfig.tableData">
                    <template slot="action" slot-scope="{row , index}">
                        <Button type="primary" @click="changeInf(index)">修改</Button>
                        <Button type="warning" @click="deleteInf(index)">删除</Button>
                    </template>
                </Table>
            </Col>
        </Row>
        <Row class="pageRouter">
            <Col >
                <Page :total="pageConfig.pageNum" show-elevator  @on-change="currentPage"/>
            </Col>
        </Row>
    </div>
</template>

<script>
    export default {
        name: "act-inf-changed-box",
        data(){
            return {
                searchedInf : "",
                choosenPage : 1,
                responseData : {  //接受一开始响应的消息
                    originTableInfList : [],
                    originPage : 10 //页数
                },

                tableConfig : { //表格设置信息
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
                            title : "人数上限",
                            key : "maxPeople"
                        },
                        {
                            title: "活动详情",
                            slot : 'action',
                            // key : "Inf",
                            align: "center",
                            width : 200
                        }
                    ],
                    tableData : []

                },

                pageConfig : {
                    pageNum : 10, //初始页面设置
                    pageSize : 5
                }

            }
        },
        methods:{

            changeInf(index){ //修改信息
                this.$router.push({path : "/actChanged/changedInf",query : {actId : this.tableConfig.tableData[index].actionId}});
            },

            deleteInf(index){ //删除信息
                console.log(this.tableConfig.tableData[index].actionId);
                this.$request.get("/delete",{
                    params : {
                        actionId : this.tableConfig.tableData[index].actionId,
                        currentPage : this.choosenPage
                    }
                }).then(result => {
                    if(result.data.status === "fail")
                    {
                        alert("登录失效，请重新登录!");
                        this.$router.push("/login")
                    }
                    else if(result.data.status === "error")
                    {
                        alert("数据库出错，需要进行维护，请联系相关负责人!");
                    }
                    else
                    {
                        this.tableConfig.tableData = result.data;
                        alert("删除成功!");
                    }

                }).catch(err => {
                    console.log(err);
                })
            },

            currentPage(page){ //页面改变时响应
                this.choosenPage = page;

                console.log(`当前页数为${page}`);
                if (this.searchedInf === "")//为空的时候，正常索引
                {
                    this.$request.get("/actChanged/page",{
                        params : {
                            currentPage : page
                        }
                    }).then(result => {
                        if(result.data.status === "fail")
                        {
                            alert("登录失败，请重新登录!");
                            this.router.push("/login")
                        }
                        else
                        {
                            this.tableConfig.tableData = result.data.DBdata;
                        }
                    })
                }
                else
                {
                    this.$request.get("/actChanged/search/page",{
                        params : {
                            searchedInf : this.searchedInf,
                            currentPage : page
                        }
                    }).then(result => {
                        if (result.data.status === "fail")
                        {
                            alert("登录失效，请重新登录!");
                            this.$router.push("/login");
                        }
                        else
                        {
                            this.tableConfig.tableData = result.data.DBdata;
                        }
                    }).catch(err => {
                        console.log(err);
                    })
                }


            },



            computingPages(totalPages){ //计算页数
                if (totalPages <= this.pageConfig.pageSize)
                {
                    return 10;
                }
                else
                {
                    return Math.ceil(totalPages/this.pageConfig.pageSize) * 10;//Math.ceil->向上取整
                }
            },

        },

        created() {
            this.$request.get("/actChanged")
            .then(result => {
                if(result.data.status === "fail")//jsonFailData后端定义
                {
                    if(result.data.status === 'fail' && result.data.DBerror === 0)//登录过期
                    {
                        alert("登录已经过期，请重新登录!");
                        this.$router.push("/login");
                    }
                    else //数据库错误
                    {
                        alert("数据库有错误.");
                    }
                }
                else
                {
                    console.log(result.data);
                    this.pageConfig.pageNum = this.computingPages(result.data.DBdataTotal);
                    this.responseData.originTableInfList = result.data.DBdata;//响应信息做备份
                    this.tableConfig.tableData = [...this.responseData.originTableInfList];
                    this.responseData.originPage = this.pageConfig.pageNum;//页面做备份
                    this.$store.state.teaName = result.data.sessionTeacher;
                }

            }).catch((err) => {
                console.log(err);
            })
        },
        watch : {

            searchedInf : function () { //监听搜索框
                console.log(this.searchedInf);
                if(this.searchedInf === "")
                {
                    console.log("有没有进这里");
                    // console.log(Object.prototype.toString.call(this.responseData.originTableInfList));
                    this.tableConfig.tableData = [...this.responseData.originTableInfList];//注意一定要用复制的值
                    this.pageConfig.pageNum = this.responseData.originPage;
                }
                else
                {
                    this.$request.get("/actChanged/search", {
                        params: {
                            searchedInf: this.searchedInf
                        }
                        }).then(result => {
                            if (result.data.status === 'fail')
                            {
                                if (result.data.DBerror === 0)
                                {
                                    alert("登录失效，请重新登录!");
                                    this.$router.push("/login")
                                }
                                else
                                {
                                    alert("搜索失败，请输入字符串或数字。");
                                }
                            }
                            else
                            {
                                this.tableConfig.tableData = result.data.DBdata;
                                this.pageConfig.pageNum = this.computingPages(result.data.DBdataTotal);
                            }

                        }).catch(err => {
                            console.log(err);
                        })//catch
                }


            }
        }
    }
</script>

<style scoped>
#mainBox{
    position: relative;
    height: 100%;
}

.pageRouter{
    position: absolute;
    width: 100%;
    bottom: 3%;
    box-shadow: 1px 1px 1px #EFEFEF;
    border:1px solid #EFEFEF;
    border-radius: 2px;
}
</style>