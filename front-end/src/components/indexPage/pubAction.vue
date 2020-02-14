<template>
    <div id="pubAction">
        <div id="form">
            <Row class="form-box">
                <Col span="6" class="font">活动标题:</Col>
                <Col span="17">
                    <Input type="text" v-model="actTitle" placeholder="标题"/>
                </Col>
            </Row>
            <Row class="form-box">
                <Col>
                    <date-picker @timeIsComing="catchTime"  @dateIsComing="catchDate"></date-picker>
                </Col>
            </Row>
            <Row class="form-box">
                <Col class="font" span="6">活动地点:</Col>
                <Col span="17">
                    <Input type="text" v-model="actPlace" placeholder="地点" />
                </Col>
            </Row>
            <Row class="form-box" >
                <Col class="font" span="6">紧急事件:</Col>
                <Col span="5">
                    <Checkbox label="是" border v-model="isSerious" >是</Checkbox>
                </Col>
            </Row>
            <Row class="form-box">
                <Col class="font" span="6">活动详情:</Col>
                <Col span="17">
                    <Input v-model="actInf" show-word-limit type="textarea" maxlength="200" placeholder="活动内容" :rows="10"></Input>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button v-on:click="submit()" type="info">提交</Button>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
    import Index from "../../views/index";
    import DatePicker from "./datePicker";
    export default {
        name: "pubAction",
        components: {DatePicker, Index},
        data(){
            return {
                actTitle : "",
                actDate : "",//活动日期
                actTime : "",//活动时间
                actPlace : "",
                isSerious : false,
                actInf : ""
            }
        },
        methods: {
            submit(){
                console.log(this.isSerious);
                if(this.isSerious === true || this.isSerious === 1)
                {
                    this.isSerious = 1;
                }
                else
                {
                    this.isSerious = 0;
                }

                let postData ={
                    "actTitle" : this.actTitle,
                    "actDate" : this.actDate ,
                    "actTime" : this.actTime,
                    "actPlace" : this.actPlace,
                    "isSerious" : this.isSerious,
                    "actInf" : this.actInf
                };//发送的数据
                console.log(postData.isSerious);
                this.$request.post("/pubAct",postData,{
                    withCredentials : true,
                    headers : {
                        'Content-Type':'application/json;charset=utf-8' //跨域字段处处理，json格式好
                    }
                }).then((result) => {
                    console.log(result);
                }).catch((err) => {
                    console.log(err);
                })//为了防止手贱 把这里先注释掉

            },
            catchTime(time){
                console.log(time);//time是一个数组
                this.actTime = time;
            },
            catchDate(date){
                console.log(date);
                this.actDate = date;
            }

        }
    }
</script>

<style scoped>

#pubAction{
    position: relative;
    border: 1px solid black;
    width: 900px;
}

#form{
    display: flex;
    flex-direction: column;
}

.form-box{
    display: flex;
    flex-direction: row;
    border: 1px solid red;
    margin : 10px auto;
    width:600px;
}
/*每段输入框提示字体*/
.font{
    font-size: 1.5em;
}
</style>