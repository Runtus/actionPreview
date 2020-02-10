<template>
        <Menu :theme="theme3" active-name="1" class="Menu">
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
                theme3 : 'dark'
            }
        },
        methods:{
            toTheOrder(){
                console.log("事件触发")
            }
        }
    }
</script>

<style scoped>

.Menu{
    border: 1px solid red;
}
</style>