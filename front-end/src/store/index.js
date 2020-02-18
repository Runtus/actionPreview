import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    teaName : "",
    dashboard : true,
    dashboardWidth : 3,
    routerWidth : 21,
    pageConfig: {
      xxl_size_logo:7,
      xxl_size_title: 9,
      xl_size_logo: 5,
      xl_size_title: 7,
      xxl_offset_title : 8,
      xl_offset_title : 10
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
