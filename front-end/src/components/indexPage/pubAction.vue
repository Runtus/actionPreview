<template>
    <div id="pubAction">
        <div id="form">
            <div class="form-box">
                <span>活动标题:</span>
                <input type="text" v-model="actTitle">
            </div>
            <div class="form-box">
                <span>活动时间:</span>
                <date-picker @timeIsComing="catchTime"  @dateIsComing="catchDate"></date-picker>
            </div>
            <div class="form-box">
                <span>活动地点:</span>
                <input type="text" v-model="actPlace">
            </div>
            <div class="form-box">
                <span>是否为紧急事件</span>
                <input type="checkbox" v-model="isSerious">是<br>
            </div>
            <div class="form-box">
                <span>活动详情</span>
                <textarea v-model="actInf"></textarea>
            </div>
            <button v-on:click="submit()">提交</button>
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
                isSerious : "",
                actInf : ""
            }
        },
        methods: {
            submit(){
                let postData ={
                    "actTitle" : this.actTitle,
                    "actDate" : this.actDate ,
                    "actTime" : this.actTime,
                    "actPlace" : this.actPlace,
                    "isSerious" : this.isSerious,
                    "actInf" : this.actInf
                };//发送的数据

                this.$request.post("/pubAct",postData,{
                    headers : {
                        'Content-Type':'application/json;charset=utf-8' //跨域字段处处理，json格式好
                    }
                }).then((result) => {
                    console.log(result);
                }).catch((err) => {
                    console.log(err);
                })

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
    border: 1px solid black;
    width: 70%;
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
}

</style>