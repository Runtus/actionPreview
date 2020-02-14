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
                studentInf : {}
            }
        },
        created() {
            console.log(this.$route.query.actId);
            let actionId = this.$route.query.actId;
            this.$request.get("/actInf/moreInf",{
                params : {
                    actionId : actionId
                }
            }).then(result => {
                if(result.data.status === "fail")
                {
                    alert("登录已经失效，请重新登录!");
                    this.$router.push("/login");
                }
                else
                {
                    console.log(result.data);
                    this.studentInf = result.data; //设置学生信息
                    this.$store.state.teaName = result.data.teacherName;
                }

            }).catch(err => {
                console.log(err);
            });

            this.$store.state.dashboard = false;//dashboard板设置
        },
        beforeDestroy() {
            this.$store.state.dashboard = true;
        }
    }
</script>

<style scoped>
.actMoreInf{
    position: relative;
    border: 1px solid red;
}

.col-1{
    margin-top: 3%;
    margin-left: 5%;
}
</style>