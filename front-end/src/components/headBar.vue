<template>
    <Row id="headBar" type="flex" justify="center" align="middle" ref="dashboard">
        <Col :xxl="this.$store.state.pageConfig.xxl_size_logo" :xl="this.$store.state.pageConfig.xl_size_logo"  id="imageBox"  style="height: 100px;padding-top:10px;">
            <img src="../assets/xr.png" >
        </Col>
        <Col :xxl="8" :xl="12" style="font-size: 20px;color: white" v-if="this.$store.state.teaName !== ''">
            {{greetMsg}},{{this.$store.state.teaName}}老师。
            现在是{{formatDateTime}}
        </Col>
        <Col id="font" :xxl="{span : this.$store.state.pageConfig.xxl_size_title , offset : this.$store.state.pageConfig.xxl_offset_title}" :xl="{span : this.$store.state.pageConfig.xl_size_title , offset : this.$store.state.pageConfig.xl_offset_title}">
            <p>后台管理系统</p>
        </Col>

    </Row>
</template>

<script>
    export default {
        name: "headBar",
        data() {
            return {
                timeConfig: {
                    timer: null,
                    date: new Date(),
                    clientWidth: ''
                },
                pageConfig: {
                    xxl_size_logo:7,
                    xxl_size_title: 9,
                    xl_size_logo: 5,
                    xl_size_title: 7,
                    xxl_offset_title : 8,
                    xl_offset_title : 10
                }
            }
        },
        created() {
            this.timeConfig.timer = setInterval(() => this.timeConfig.date = new Date(), 500);//每0.5s获得最新时间

        },
        beforeDestroy() {
            if (this.timer)
            {clearInterval(this.timer);}
        },

        methods:{
            getTime() {
                let date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let day = date.getDate();
                let hours = date.getHours();
                let minutes = date.getMinutes();
                let seconds = date.getSeconds();
                return  year + '年' + month +'月' + day + '日' + hours + ':' + minutes + ':' + seconds;
            }
        },
        computed:{
            formatDateTime() {
                const year = this.timeConfig.date.getFullYear();
                const month = (this.timeConfig.date.getMonth() + 1) < 10 ? `0${this.timeConfig.date.getMonth() + 1}` : this.timeConfig.date.getMonth() + 1;
                const day = this.timeConfig.date.getDate() < 10 ? `0${this.timeConfig.date.getDate()}` : this.timeConfig.date.getDate();
                const hour = this.timeConfig.date.getHours() < 10 ? `0${this.timeConfig.date.getHours()}` : this.timeConfig.date.getHours();
                const minute = this.timeConfig.date.getMinutes() < 10 ? `0${this.timeConfig.date.getMinutes()}` : this.timeConfig.date.getMinutes();
                const second = this.timeConfig.date.getSeconds() < 10 ? `0${this.timeConfig.date.getSeconds()}` : this.timeConfig.date.getSeconds();
                return `${year}年${month}月${day}日
                        ${hour}:${minute}:${second}`
            },
            greetMsg() {
                const hour = this.timeConfig.date.getHours();

                if (hour >= 0 && hour < 6)
                    return '凌晨时间，请注意休息哦';
                if (hour >= 6 && hour < 12)
                    return '早上好';
                if (hour >= 12 && hour < 13)
                    return '中午好';
                if (hour >= 13 && hour < 19)
                    return '下午好';
                if (hour >= 19 && hour < 20)
                    return '傍晚好';
                if (hour >= 20 && hour < 24)
                    return '晚上好';
                return ''
            }
        }
    }
</script>

<style scoped>
#headBar{

    position: relative;
    border: 1px solid black;
    background-color: #515a6e;
}


/*图片样式设置*/

#imageBox > img{
    height:80px;
    width:400px;

    border-radius: 10px;
}


#font{
    /*border: 1px solid black;*/
    /*background: #7A8CB2;*/
    border-radius: 10px;


}

#font > p{
    line-height: 80px;
    font-size: 35px;
    color : black;

}
</style>