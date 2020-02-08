<template>
    <div id="FirstBox" >
        <Row class="Block">
                <Col span="18" offset="3">   <Input v-model="account" placeholder="账号"  />  </Col>
        </Row>
        <Row class="Block">

                <Col span="18" offset="3">   <Input v-model="password" type="password" placeholder="密码" password /> </Col>
        </Row>
        <Row class="Block">
            <Col offset="0">
                <Button v-on:click="Login()" type="primary">登陆</Button>
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
                    }
                })
                .then(res => {
                    console.log(res.data);
                    let objOfName = res.data;
                    if (objOfName.length !== 0)
                    {
                        console.log(objOfName[0].name);
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
    border: 1px solid black;
    width: 40%;
    position: relative;
}
.Block{
    margin-top: 5%;
}

.Block:last-child{
    margin-bottom: 2%;
}



</style>