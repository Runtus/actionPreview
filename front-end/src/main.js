import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design';//iview组件
import 'view-design/dist/styles/iview.css';//iview组件
import NewAxios from "./axios";


Vue.use(ViewUI);//
Vue.config.productionTip = false;
Vue.prototype.$request = NewAxios;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
