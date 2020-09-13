<template>
    <Row class="actMoreInf" >
        <Col class="col-1" >
            <student-inf v-bind:student-data="studentInf"></student-inf>
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
                pageSize : 5
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
            this.$request.get(`/stuinfo?id=${actionId}&size=${this.pageSize}&start=1`).then(result => {
                if(result.data.status === "fail")
                {
                    this.$Message.warning("登录已经失效，请重新登录!");
                    this.$router.push("/login");
                }
                else
                {
                    console.log(result.data);
                    this.studentInf = result.data.data.stulist; //设置学生信息
                    // this.$store.state.teaName = result.data.teacherName;
                }

            }).catch(err => {
                console.log(err);
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