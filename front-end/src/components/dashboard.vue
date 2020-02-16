<template>
        <Menu :theme="theme3"  class="Menu"  :active-name="choosenMenu" >
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