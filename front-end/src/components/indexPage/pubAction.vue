<template>
<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" class="format"> 
        <FormItem label="活动主题" prop="acttitle">
            <Input v-model="formValidate.acttitle" placeholder="输入活动主题"></Input>
        </FormItem>
        <FormItem label="活动地点" prop="actplace">
            <Input v-model="formValidate.actplace" placeholder="输入活动地点"></Input>
        </FormItem>
        
        <FormItem label="活动日期">
            <Row>
                <Col span="11">
                    <FormItem prop="date">
                        <DatePicker type="date" placeholder="选择日期" @on-change='handleChangedDate' format="yyyy-MM-dd" ></DatePicker>
                    </FormItem>
                </Col>
                <Col span="2" style="text-align: center">——</Col>
                <Col span="11">
                    <FormItem prop="time">
                        <!-- <TimePicker type="time" placeholder="选择时间" v-model="formValidate.time"></TimePicker> -->
                        <TimePicker  @on-change='handleChangedTime' type="timerange" placement="bottom-end" placeholder="选择时间" ></TimePicker>
                    </FormItem>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="人数上限" prop="maxpeople">
            <Input v-model="formValidate.maxpeople" placeholder="输入人数上限"></Input>
        </FormItem>
        <FormItem label="是否加急" prop="isserious">
            <RadioGroup v-model="formValidate.isserious">
                <Radio label="true">加急事件</Radio>
                <Radio label="false">普通事件</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="是否置顶" prop="istop">
            <RadioGroup v-model="formValidate.istop">
                <Radio label="true">是</Radio>
                <Radio label="false">否</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="活动详情" prop="actinfo">
            <Input v-model="formValidate.actinfo" type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>
    </Form>
    
</template>
<script>
import qs from "qs";
    export default {
        name:'pubAction',
        data () {
            return {
                formValidate: {
                    acttitle: '',
                    actplace: '',
                    actdate: '',
                    acttime: "",
                    isserious:'',
                    istop:'',
                    actinfo: '',
                    maxpeople:''
                },
                ruleValidate: {
                    actTitle: [
                        { required: true, message: '活动主题不能为空', trigger: 'blur' }
                    ],
                    actPlace: [
                        { required: true, message: '活动地点不能为空', trigger: 'blur' }
                    ],
                    actDate: [
                        { required: true, type: 'date', message: '请选择活动日期 ', trigger: 'change' }
                    ],
                    isSerious: [
                        { required: true, message: '请选择是否加急', trigger: 'change' }
                    ],
                    isTop: [
                        { required: true, message: '请选择是否置顶', trigger: 'change' }
                    ],
                    actInfo: [
                        { required: true, message: '请输入活动详情', trigger: 'blur' }
                    ],
                    maxPeople: [
                        { required: true, message: '请输入人数上限', trigger: 'blur' }
                    ]
                },

            }
        },
        methods: {
            handleSubmit (name) {
                var that = this;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let postData = that.formValidate;
                        let time = that.formatTime(postData.acttime);
                        that.formatBoolean(postData);
                        // let postData ={
                        //     "actTitle" : that.actTitle,
                        //     "actDate" : that.actDate ,
                        //     "actTime" : that.actTime,
                        //     "actPlace" : that.actPlace,
                        //     "isSerious" : that.isSerious,
                        //     "isTop" : that.isTop,
                        //     "maxPeople": that.maxPeople,
                        //     "actInfo" : that.actInfo
                        // };//发送的数据

                        let datapost = {
                            acttitle : postData.acttitle,
                            actdate : postData.actdate + time,
                            actplace : postData.actplace,
                            maxpeople : postData.maxpeople,
                            actinfo : postData.actinfo,
                            teaid : sessionStorage.getItem("teaId"),
                            actpriority :  postData.actpriority,
                            actstate : 0
                        }
                        // debugger
                        let strParam = qs.stringify(datapost)
                        // debugger
                        // debugger
                        console.log(datapost)
                        that.$request({
                            url : `/teacher/activity/add?${strParam}`,
                            method : "post",
                            headers : {
                                "Content-Type" : "application/x-www-form-urlencoded",
                                "token" : sessionStorage.getItem("token")
                            }
                           }).then((result) => {
                            console.log(result);
                            if(result.data.code === 200)
                            {
                                that.$Message.success('上传成功');
                                setTimeout(() => {
                                    location.reload();  //刷新下
                                },2000)
                            }else{
                                throw new Error("上传失败!");
                            }
                        }).catch((err) => {
                            console.log(err);
                            this.$Message.warning("发送活动失败，请重新登录!");
                            this.$router.push("/login");
                        })//为了防止手贱 把这里先注释掉
                    } else {
                        console.log("失败!");
                        debugger
                        this.$Message.error('发送活动失败,请查看输入的格式是否有误！');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            handleChangedDate(date){
                console.log(date);
                this.formValidate.actdate = date;
            },
            handleChangedTime(time){
                this.formValidate.acttime = time;
            },
            formatBoolean(postData){
                if(postData.istop === "true"){
                    postData.actpriority = 3;
                }else{
                    if(postData.isserious === "true"){
                        postData.actpriority = 2;
                    }else{
                        postData.actpriority = 1;
                    }
                }
            },
            formatTime(timeArr){
                return ` ${timeArr[0]} ${timeArr[1]}`
            }
        }
    }
</script>
<style scoped>


    .format{
        /*border: 1px solid red;*/
        margin-right: auto;
        margin-left: auto;
        position: relative;
        width: 90%;
        /* height: 88%; */
        background-color: white;
        border-radius: 15px;
        padding: 20px;
    }
</style>