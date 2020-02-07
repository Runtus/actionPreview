<template>
    <div>
        <div id="FirstBox">
            <form id="account">
                <span>账号:</span>
                    <input type="text"  v-model = "account">
                <span>密码:</span>
                    <input type="password" v-model = "password">
            </form>
            <button v-on:click="Login()">登陆</button>

        </div>
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
    width: 50%;
}
</style>