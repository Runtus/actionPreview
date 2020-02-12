<template>
    <Row class="NavigationBox">
        <Col span="12" offset = "2">
        <Page :total="pageNum" show-elevator />
        </Col>
        <Col span="8">
            <Button type="primary"  @click="exportData()"><Icon type="ios-download-outline"></Icon> Export source data</Button>
        </Col>
    </Row>

</template>

<script>
    export default {
        name: "NavigationBox",
        data(){
            return {
                pageNum : 100
            }
        },
        methods:{
            exportData(){
                this.$request.get("/actInf/excel")
                .then((result) => {

                    console.log(`处理结果${result}`);

                }).catch((err) => {
                    console.log(err);
                })
            }
        }
    }
</script>

<style scoped>
.NavigationBox{
    border:1px solid red;

}
</style>