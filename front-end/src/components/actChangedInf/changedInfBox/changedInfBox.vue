<template>
    <div class="box">
        <div id="return">
            <Button type="default" size="large" @click="back">
                <Icon type="ios-arrow-back" size="20" ></Icon>
                回到信息展示页面
            </Button>
        </div>
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
                            <DatePicker type="date" placeholder="选择日期" @on-change='handleChangedDate' format="yyyy-MM-dd" :value="originDate"></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="2" style="text-align: center">——</Col>
                    <Col span="11">
                        <FormItem prop="time">
                            <!-- <TimePicker type="time" placeholder="选择时间" v-model="formValidate.time"></TimePicker> -->
                            <TimePicker  @on-change='handleChangedTime' type="timerange" placement="bottom-end" placeholder="选择时间" :value="originTime"></TimePicker>
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
                    <Radio label="true" >是</Radio>
                    <Radio label="false">否</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="活动详情" prop="actInfo">
                <Input v-model="formValidate.actInf" type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="Enter something..."></Input>
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
        name: "changedInfBox",
        data(){
            return {
                originDate : "",//设置日期的初始值
                originTime : "",//设置时钟的初始值
                changedDate : "",
                changedTime : "",
                actId : "", //识别ID
                formValidate: { //表单数据
                    actTitle: '',
                    actPlace: '',
                    actDate: '',
                    isSerious:'',
                    isTop:"",
                    actInf: '',
                    maxPeople: ''
                },
                ruleValidate: { //表单设计
                    actTitle: [
                        { required: true, message: '活动主题不能为空', trigger: 'change' }
                    ],
                    actPlace: [
                        { required: true, message: '活动地点不能为空', trigger: 'change' }
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
                    actInf: [
                        { required: true, message: '请输入活动详情', trigger: 'blur' }
                    ],
                    maxPeople: [
                        // { required: true, message: '请输入人数上限', trigger: 'change' }
                    ]
                }
            }
        },
        methods : {
            handleSubmit (name) {
                let that = this;
                this.formValidate.actDate = this.changedDate + " " + this.changedTime[0] + " " +  this.changedTime[1];
                this.formValidate.newActionId = this.changedDate.split("-").join("") + this.formValidate.actTitle;//新的活动id
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
                        that.$request.post("/actChanged/formChanged/submit",postData,{
                            headers : {
                                'Content-Type':'application/json;charset=utf-8' //跨域字段处处理，json格式好
                            }
                        }).then((result) => {
                            console.log(result);
                            that.$Message.success('修改成功!');
                            this.$router.push("/actChanged");
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
                this.changedDate = date;
            },
            handleChangedTime(time){
                this.changedTime = time;
            },
            back(){
                this.$router.push("/actChanged");
            }
        },
        created() {
            this.actId = this.$route.query.actId;
            this.$request.get("/actChanged/formChanged",{
                params : {
                    actionId : this.actId
                }
            }).then(result => {

                if(result.data.status)
                {

                    alert("登录已失效，请重新登录！");
                    this.$router.push("/login");
                }
                else if (result.data.database)
                {
                    alert("数据库出错!");
                }
                else
                {
                    console.log(result.data);
                    this.formValidate = result.data;
                    let middleArray = result.data.actDate.split(" ");//把日期和时钟分成数组。
                    let timeArray = middleArray.filter((value,index) => {//过滤器过滤掉日期
                        if(index >= 1)
                        {
                            return value;
                        }
                    });
                    this.originTime = [...timeArray];//真拷贝
                    this.originDate = middleArray[0];
                    this.changedDate = this.originDate;
                    this.changedTime = [...this.originTime];
                    //按钮判断
                    if (result.data.isSerious === 0)
                    {
                        this.formValidate.isSerious = "false";
                    }
                    else{
                        this.formValidate.isSerious = "true";
                    }

                    if (result.data.isTop === "0")
                    {
                        this.formValidate.isTop = "false";
                    }
                    else
                    {
                        this.formValidate.isTop = "true";
                    }

                    this.formValidate.maxPeople = result.data.maxPeople;


                }
            }).catch(err => {
                console.log(err)
            })
        }
    }
</script>

<style scoped>
    .box{
        width: 100%;
    }

    #return{
        position: absolute;
        left: 1%;
        box-shadow: 3px 3px 4px 1px #C9C9C9;
    }
    .format{
        border : 1px solid #EFEFEF;
        box-shadow: 3px 3px 4px 1px #C9C9C9;
        margin: 4% auto 0;
        position: relative;
        width: 70%;
        /* height: 88%; */
        background-color: white;
        border-radius: 15px;
        padding: 20px;

    }
</style>