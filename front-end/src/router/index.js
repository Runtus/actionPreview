import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'
import index from '../views/index'
import actInf from "../views/actInf";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect : "/login"//重定向登陆界面
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: "/index",
    name : "index",
    component : index
  },
  {
    path: '/actInf',
    name  : "actInf",
    component : actInf
  }

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
