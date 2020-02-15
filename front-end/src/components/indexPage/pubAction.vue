<template>
<div class="box">
<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" class="format"> 
        <FormItem label="活动主题" prop="actTitle">
            <Input v-model="formValidate.actTitle" placeholder="输入活动主题"></Input>
        </FormItem>
        <FormItem label="活动地点" prop="actPlace">
            <Input v-model="formValidate.actPlace" placeholder="输入活动地点"></Input>
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
        <FormItem label="人数上限" prop="maxPeople">
            <Input v-model="formValidate.maxPeople" placeholder="输入人数上限"></Input>
        </FormItem>
        <FormItem label="是否加急" prop="isSerious">
            <RadioGroup v-model="formValidate.isSerious">
                <Radio label="true">加急事件</Radio>
                <Radio label="false">普通事件</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="是否置顶" prop="isTop">
            <RadioGroup v-model="formValidate.isTop">
                <Radio label="true">是</Radio>
                <Radio label="false">否</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="活动详情" prop="actInfo">
            <Input v-model="formValidate.actInfo" type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>
    </Form>
</div>
    
</template>
<script>
    export default {
        name:'pubAction',
        data () {
            return {
                formValidate: {
                    actTitle: '',
                    actPlace: '',
                    actDate: '',
                    actTime: "",
                    isSerious:'',
                    isTop:'',
                    actInfo: '',
                    maxPeople:''
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
                }
            }
        },
        methods: {
            handleSubmit (name) {
                var that = this;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if(that.isSerious === true || that.isSerious === 1)
                        {
                            that.isSerious = 1;
                        }
                        else
                        {
                            that.isSerious = 0;
                        }

                        let postData = that.formValidate;

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
                        console.log(postData);
                        that.$request.post("/pubAct",postData,{
                            withCredentials : true,
                            headers : {
                                'Content-Type':'application/json;charset=utf-8' //跨域字段处处理，json格式好
                            }
                        }).then((result) => {
                            console.log(result);
                            that.$Message.success('Success!');
                        }).catch((err) => {
                            console.log(err);
                        })//为了防止手贱 把这里先注释掉

                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            handleChangedDate(date){
                console.log(date);
                this.formValidate.actDate = date;
            },
            handleChangedTime(time){
                this.formValidate.actTime = time;
            }
        }
    }
</script>
<style scoped>
    .box{
        width: 100%;
    }

    .format{
        margin: 0 auto;
        position: relative;
        width: 70%;
        /* height: 88%; */
        background-color: white;
        border-radius: 15px;
        padding: 20px;
    }
</style>