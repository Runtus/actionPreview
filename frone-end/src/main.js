import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import NewAxios from "./axios";



Vue.config.productionTip = false;
Vue.prototype.$request = NewAxios;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
