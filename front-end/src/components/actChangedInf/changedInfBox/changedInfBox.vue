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
                <Input v-model="formValidate.acttitle" placeholder="输入活动主题"></Input>
            </FormItem>
            <FormItem label="活动地点" prop="actPlace">
                <Input v-model="formValidate.actplace" placeholder="输入活动地点"></Input>
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
                <Input v-model="formValidate.maxpeople" placeholder="输入人数上限"></Input>
            </FormItem>
            <FormItem label="是否加急" prop="isSerious">
                <RadioGroup v-model="formValidate.isserious">
                    <Radio label="true">加急事件</Radio>
                    <Radio label="false">普通事件</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="是否置顶" prop="isTop">
                <RadioGroup v-model="formValidate.istop">
                    <Radio label="true" >是</Radio>
                    <Radio label="false">否</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="活动详情" prop="actInfo">
                <Input v-model="formValidate.actinfo" type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="Enter something..."></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    import qs from "qs";
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
                    acttitle: '',
                    actplace: '',
                    actdate: '',
                    isserious:'',
                    istop:"",
                    actinfo: '',
                    maxpeople: ''
                },
                ruleValidate: { //表单设计
                    actTitle: [
                        // { required: true, message: '活动主题不能为空', trigger: 'change' }
                    ],
                    actPlace: [
                        // { required: true, message: '活动地点不能为空', trigger: 'change' }
                    ],
                    actDate: [
                        // { required: true, type: 'date', message: '请选择活动日期 ', trigger: 'change' }
                    ],
                    isSerious: [
                        // { required: true, message: '请选择是否加急', trigger: 'change' }
                    ],
                    isTop: [
                        // { required: true, message: '请选择是否置顶', trigger: 'change' }
                    ],
                    actInf: [
                        // { required: true, message: '请输入活动详情', trigger: 'blur' }
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
                this.formValidate.actdate = this.changedDate + " " + this.changedTime[0] + " " +  this.changedTime[1];
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let postData = that.formValidate;
                        that.formatBoolean(postData);
                        console.log(postData);
                        let datapost = {
                            actid : postData.actid,
                            acttitle : postData.acttitle,
                            actdate : postData.actdate,
                            actplace : postData.actplace,
                            maxpeople : postData.maxpeople,
                            actinfo : postData.actinfo,
                            teaid : sessionStorage.getItem("teaId"),
                            actpriority :  postData.actpriority,
                            actstate : 0
                        }
                        console.log(datapost);
                        let str_data = qs.stringify(datapost);
                        console.log(str_data)
                        that.$request({
                            url: `/teacher/activity/update?${str_data}`,
                            method: "post",
                            headers : {
                                "Content-Type" : "application/x-www-form-urlencoded",
                                "token" : sessionStorage.getItem("token")
                            }
                        }).then((result) => {
                            let real_data = result.data;
                            console.log(real_data);
                            if(real_data.code !== 200){
                                this.$Message.warning("修改失败，token过期，请重新登录!");
                                sessionStorage.clear();
                                setTimeout(() => {
                                    this.$router.push("/login");
                                },1000)
                            }else{
                                that.$Message.success('修改成功!');
                                setTimeout(() => {
                                    that.$router.push("/actChanged");
                                },1000)
                            }
                        }).catch((err) => {
                            this.$Message.warning("修改失败，token过期，请重新登录!");
                            sessionStorage.clear();
                            setTimeout(() => {
                                this.$router.push("/login");
                            },1000)
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
        },
        created() {
            this.actId = this.$route.query.actId;
            console.log(this.actId);
            this.$request.get(`/teacher/activity/act`,{
                params : {
                    actId : this.actId
                },
                headers : {
                    token : sessionStorage.getItem("token")
                }
            }).then(result => {
                let real_data = result.data;
                console.log(real_data);
                if(real_data.code !== 200)
                {
                    this.$Message.warning("登录已经失效，请重新登录!");
                    this.$router.push("/login");
                }
                else
                {
                    let old_data = real_data.data;
                    // console.log(result.data);
                    this.formValidate = old_data;
                    let middleArray = old_data.actdate.split(" ");//把日期和时钟分成数组。
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
                    if (old_data.actpriority === 3)
                    {
                        this.formValidate.istop = "true";
                        this.formValidate.isserious = "false";

                    }
                    else if(old_data.actpriority === 2){
                        this.formValidate.istop = "false";
                        this.formValidate.isserious = "true";
                    }else{
                        this.formValidate.isseriou =  "false";
                        this.formValidate.istop = "false";
                    }



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