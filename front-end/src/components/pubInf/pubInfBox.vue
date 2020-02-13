<template>
    <div >
        <Row id="pubInfBox">
            <Table border :columns="columns" :data="data1" >
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
                data1 : [

                ],
                pageNum : 0,
                currentPageVar : 1,
                index : 0
            }
        },
        methods : {
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
            //点击页面的响应
            currentPage(page){
                this.currentPageVar = page;
                this.$request.get('/actInf/page',{
                    params : {
                        page : page
                    }
                }).then((result) => {
                    let middleData = result.data;
                    // this.data1 = result.data;
                    this.data1 = this.normalizingDate(middleData);
                }).catch(err => {
                    console.log(err);
                })
            },

            //Excel表格导出
            exportData(){
                // this.$request.get("/actInf/excel")
                //     .then((result) => {
                //
                //         console.log(`处理结果${result}`);
                //
                //     }).catch((err) => {
                //     console.log(err);
                // })


            },

            giveRow(index){
                console.log(index);
                this.$router.push({path :"/actInf/moreInf" , query : { actId : this.data1[index].actionId}});
            }

        },

        //初始化的响应
        created() {
            this.$request.get("/actInf",{
            }).then((result) => {
                let totalNumber = 0;
                console.log(result.data);
                totalNumber = result.data.actionNumber;
                this.pageNum = this.computingPages(totalNumber);
                this.data1 = this.normalizingDate(result.data.data)
            }).catch((err) => {
                console.log(err);
            });
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