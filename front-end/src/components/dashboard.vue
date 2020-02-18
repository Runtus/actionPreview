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
                this.$request.get("/logout")
                .then(result => {
                    if(result.data.status === "session-empty")
                    {
                        this.$Message.warning("账号已失效，即将跳转登录界面");
                    }
                    else
                    {
                        this.$Message.success("退出账号成功!");//全局提醒
                    }
                    this.$store.state.teaName = "";
                    this.$router.push("/login");
                }).catch(err => {
                    console.log(err);
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
    border: 1px solid red;

}

#logOut{
    position: absolute;
    left: 40%;
    bottom: 20%;
    font-size: 15px;
}
</style>