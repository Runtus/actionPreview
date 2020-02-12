<template>
        <Menu :theme="theme3"  class="Menu"  :active-name="choosenMenu" >
            <MenuGroup title="内容管理">
                <MenuItem name="1" to="/index">
                    <Icon type="md-document" />
                    文章管理
                </MenuItem>
                <MenuItem name="2" to="/actInf">
                    <Icon type="md-chatbubbles" />
                    评论管理
                </MenuItem>
                <MenuItem name="3">
                    <Icon type="md-heart" />
                    用户留存
                </MenuItem>
                <MenuItem name="4">
                    <Icon type="md-leaf" />
                    流失用户
                </MenuItem>
            </MenuGroup>
        </Menu>
</template>

<script>
    export default {
        name: "dashboard",
        data(){
            return {
                theme3 : 'dark',
                menuList : [],
                choosenMenu : "1",
                routerList : {
                    "index" : "1",
                    "actInf" : "2"
                }
            }
        },
        methods:{
            highLightChange(){
                for (name in this.routerList)
                {
                    if (name === this.$route.name)
                    {
                        this.choosenMenu = this.routerList[name];
                    }
                }

            }
        },
        created() {
            this.highLightChange();
        }
    }
</script>

<style scoped>

.Menu{
    /*border: 1px solid red;*/
}
</style>