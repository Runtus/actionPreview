<template>
  <div id="app">
    <head-bar class="head-bar"></head-bar>
    <Row style="position: relative;">
      <Col :span="this.$store.state.dashboardWidth"   class="col-1">
        <dashboard v-if="this.$store.state.dashboard" class="dashboard" ></dashboard>
      </Col>
      <Col :span="this.$store.state.routerWidth" class="box" :style="{height : clientHeight + 'px'}">
        <div id="inline-Box">
          <router-view > </router-view>
        </div>
      </Col>
    </Row>
  </div>
</template>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*background-image: url("assets/background2.png");*/
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 100%;
  position: relative;
}

#nav {
  padding: 30px;
}


.col-1{
  box-shadow: 10px 5px 10px #DDDDDD;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.dashboard{
  /*position: absolute;*/

}

.box{
  /*border: 1px solid red;*/
  /*position: absolute;*/
  background-color: #EFEFEF;
  position: relative;
}

#inline-Box{
  background-color: #EFEFEF;
  width: 90%;
  /*border: 1px solid red;*/
  margin: 0 auto;
  height: 100%;
}

p{
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}

</style>
<script>
  import HeadBar from "./components/headBar";
  import Dashboard from "./components/dashboard";
  export default {
    components: {Dashboard, HeadBar},
    data(){
      return {
        judgeDashboardAboutLogin : this.$route.path !== '/login' && this.$route.path !== '/actInf/moreInf' ,
        theFinalRes : "",
        clientHeight: ""

      }
    },
    created() {
      this.clientHeight = document.body.clientHeight;
    }


  }
</script>