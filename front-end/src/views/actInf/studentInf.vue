<template>
    <Row class="actMoreInf" >
        <Col class="col-1" >
            <student-inf v-bind:student-data="studentInf" v-bind:count="count"></student-inf>
        </Col>
    </Row>
</template>


<script>
    import StudentInf from "../../components/pubInf/moreInf/studentInf";
    export default {
        name: "actMoreInf",
        components: {StudentInf},
        data(){
            return {
                studentInf : {},
                pageSize : 5,
                count : 0
            }
        },
        created() {
            {
                this.$store.state.pageConfig.xxl_size_logo = 7;
                this.$store.state.pageConfig.xl_size_logo = 6;
                this.$store.state.pageConfig.xxl_size_title = 9;
                this.$store.state.pageConfig.xl_size_title = 6;
                this.$store.state.pageConfig.xxl_offset_title = 0;
                this.$store.state.pageConfig.xl_offset_title  = 0;
            }
            console.log(this.$route.query.actId);
            let actionId = this.$route.query.actId;
            let that = this;
            console.log(actionId);
            this.$request.get(`/teacher/order/?actId=${actionId}&size=${this.pageSize}`,{
                headers : {
                    "token" : sessionStorage.getItem("token")
                }
            }).then(result => {
                let real_data = result.data;
                if(real_data.code !== 200)
                {
                    that.$Message.warning("登录已经过期，请重新登录");
                    sessionStorage.clear();
                    that.$router.push("/login");
                }
                else
                {
                    console.log(result.data);
                    that.studentInf = real_data.data; //设置学生信息
                    that.count = real_data.count;
                    // this.$store.state.teaName = result.data.teacherName;
                }

            }).catch(err => {
                console.log(err);
                this.$Message.warning("登录已经过期，请重新登录");
                this.$router.push("/login");
            });

            this.$store.state.dashboard = false;//dashboard板设置
            this.$store.state.routerWidth = 24;
            this.$store.state.dashboardWidth = 0;
        },
        beforeDestroy() {
            this.$store.state.dashboard = true;
            this.$store.state.routerWidth = 21;
            this.$store.state.dashboardWidth = 3;
        }
    }
</script>

<style scoped>
.actMoreInf{
    position: relative;
    /*border: 1px solid red;*/
    height: 70%;
    background-color: white;
    margin-top:2%;
    border: 1px solid  #C9C9C9;
    border-radius: 20px;
    box-shadow: 2px 2px 5px 2px  #C9C9C9;
}

.col-1{
    margin-top: 3%;
    margin-left: 5%;
}
</style>