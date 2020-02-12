<template>
    <div id="pubInfBox">
        <Table border :columns="columns" :data="data1" >
        <template slot="action">
            <router-link to="/actInf/moreInf">去主页</router-link>
        </template>
        </Table>
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
                        key : "title"
                    },
                    {
                        title: "活动时间",
                        key : "time"
                    },
                    {
                        title: "活动地点",
                        key : "address"
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
                    {
                        title : "成电讲坛",
                        time : "20200202",
                        address : "二仙桥",

                    },
                    {
                        title : "成电讲坛",
                        time : "20200202",
                        address : "二仙桥"
                    },
                    {
                        title : "成电讲坛",
                        time : "20200202",
                        address : "二仙桥"
                    },
                    {
                        title : "成电讲坛",
                        time : "20200202",
                        address : "二仙桥"
                    },
                    {
                        title : "成电讲坛",
                        time : "20200202",
                        address : "二仙桥"
                    },
                    {
                        title : "成电讲坛",
                        time : "20200202",
                        address : "二仙桥"
                    },
                    {
                        title : "成电讲坛",
                        time : "20200202",
                        address : "二仙桥"
                    },
                    {
                        title : "成电讲坛",
                        time : "20200202",
                        address : "二仙桥"
                    },
                    {
                        title : "成电讲坛",
                        time : "20200202",
                        address : "二仙桥"
                    },
                    {
                        title : "成电讲坛",
                        time : "20200202",
                        address : "二仙桥"
                    },
                    {
                        title : "成电讲坛",
                        time : "20200202",
                        address : "二仙桥"
                    },
                    {
                        title : "成电讲坛",
                        time : "20200202",
                        address : "二仙桥"
                    }
                ]
            }
        },
        methods : {

        }
    }
</script>

<style scoped>
#pubInfBox{
    border: 1px solid red;
    margin-left: 240px;
}
</style>