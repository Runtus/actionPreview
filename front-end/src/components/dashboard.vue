<template>
        <Menu :theme="theme3" :style="{height : clientHeight-100 + 'px'}" class="Menu" mode="vertical" ref="dashboard"  :active-name="choosenMenu" width="auto">
            <MenuGroup title="内容管理">
                <MenuItem name="1" to="/index">
                    <Icon type="md-document" />
                    活动发布
                </MenuItem>
                <MenuItem name="2" to="/actInf">
                    <Icon type="md-chatbubbles" />
                    活动信息管理
                </MenuItem>
                <MenuItem name="3" to="/actChanged">
                    <Icon type="md-heart"  />
                    修改/删除活动
                </MenuItem>
            </MenuGroup>
            <div id="logOut">
                <Icon type="ios-power" size="20"/><a @click="logOut">登出</a>
            </div>
        </Menu>

</template>

<script>
    export default {
        name: "dashboard",
        data(){
            return {
                clientHeight : "",
                theme3 : 'light',
                menuList : [],
                choosenMenu : "1",
                routerList : {
                    "index" : "1",
                    "actInf" : "2",
                    "changedInf" : "3"
                }

            }
        },
        methods:{
            highLightChange(){
                console.log(this.$route.name);
                for (name in this.routerList)
                {
                    if (name === this.$route.name)
                    {
                        this.choosenMenu = this.routerList[name];
                    }
                }

            },
            logOut(){
                this.$request({
                    url : "/teacher/logout",
                    method : "POST",
                    headers : {
                        "token": sessionStorage.getItem("token")
                    }
                })
                .then(result => {
                    let real_data = result.data;
                    if(real_data.code === 200)
                    {
                        this.$Message.success("登出成功！");
                        sessionStorage.clear();
                        setTimeout(() => {
                            this.$router.push("/login")
                        },1000)
                    }
                }).catch(err => {
                    console.log(err);
                    this.$Message.warning("登出发生错误，请联系管理员!");
                });
            },


        },
        created() {
            this.highLightChange();
            this.clientHeight = document.body.clientHeight;

        }

    }
</script>

<style scoped>

.Menu{


}

#logOut{
    position: absolute;
    left: 40%;
    bottom: 20%;
    font-size: 15px;
}
</style>