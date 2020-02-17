<template>
    <div id="FirstBox" >
        <Row>
            <Col style="margin-top: 3%"><p id="font" >用户登录</p> </Col>
        </Row>
        <Row class="Block">
                <Col span="18" offset="3" >   <Input v-model="account" placeholder="账号"   clearable/>  </Col>
        </Row>
        <Row class="Block">
                <Col span="18" offset="3" >   <Input v-model="password" type="password" placeholder="密码" password  clearable/> </Col>
        </Row>
        <Row class="Block">
            <Col offset="0" >
                <Button v-on:click="Login()" type="primary" style="width: 200px;">登录</Button>
            </Col>
        </Row>
    </div>
</template>

<script>
    export default {
        name: "LoginBox",
        data() {
            return {
                account : "",
                password : ""
            }
        },
        methods:{
            Login(){
                console.log(this.account + this.password);
                this.$request.get("/login",{
                    params : {
                        aco : this.account ,
                        psw : this.password
                    },
                    withCredentials: true, //cookie
                    headers : {

                    }
                })
                .then(res => {
                    console.log(res.data);
                    let objOfName = res.data;
                    if (objOfName.length !== 0)
                    {
                        console.log(objOfName[0].name);
                        this.$store.state.teaName = objOfName[0].name;
                        console.log(res);
                        alert(objOfName[0].name + ", 您已经登陆成功!");
                        this.$router.push('/index');
                    }
                    else{
                        alert("账号密码错误，请重试!");
                    }
                }).catch(
                    (err) => {
                        console.log(err);
                    }
                )
            }
        },
        beforeMount() {

        }
    }
</script>

<style scoped>
#FirstBox{
    border: 1px solid #969696;
    box-shadow: 2px 1px 3px 1px #969696;
    border-radius: 30px;
    width: 400px;
    height: 250px;
    position: relative;
    /*background-color: #f8f8f9;*/
    opacity: 0.9;
}

.Block:first-child{
    margin-top: 5%;
}
.Block{
    margin-top: 5%;
}

.Block:last-child{
    margin-top: 10%;
}


/*字体样式   */
#font{
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size: 24px;
    font-weight: bold;
    color: black;
}




</style>