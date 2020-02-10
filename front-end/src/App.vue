<template>
  <div id="app">
    <head-bar></head-bar>
    <dashboard v-if="this.$route.path !== '/login'" class="dashboard"></dashboard>
    <router-view />
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
  overflow: hidden;

}
</style>
<script>
  import HeadBar from "./components/headBar";
  import Dashboard from "./components/dashboard";
  export default {
    components: {Dashboard, HeadBar}
  }
</script>