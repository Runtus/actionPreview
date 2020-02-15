<template>
  <div id="app">
    <head-bar class="head-bar"></head-bar>
    <dashboard v-if="this.$store.state.dashboard" class="dashboard" style="width:15%;"></dashboard>
    <router-view class="box"> </router-view>
  </div>
</template>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image: url("assets/background2.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 100%
;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.dashboard{
  position: absolute;
  height: 90%;
}

.box{
  position: absolute;
  left: 15%;
  width: 85%;
  height: 100%;
  margin: 0 auto;
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
        theFinalRes : ""

      }
    }


  }
</script>