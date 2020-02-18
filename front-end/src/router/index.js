import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'
import index from '../views/index'
import actInf from "../views/actInf";
import actMoreInf from "../views/actInf/studentInf";
import actChanged from "../views/actChanged";
import changedInf from "../views/actChanged/changedInf";
import storeData from "../store/index"

Vue.use(VueRouter);

const routes = [

  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: "/index",
    name : "index",
    component : index,

  },
  {
    path: '/actInf',
    name  : "actInf",
    component : actInf,

  },
  {
    path: '/actInf/moreInf',
    name  : "moreInf",
    component : actMoreInf
  },
  {
    path : "/actChanged",
    name : "changedInf",
    component : actChanged
  },
  {
    path : "/actChanged/changedInf",
    name : "more-inf-for-changing",
    component : changedInf
  },
  {
    path: '*',
    redirect : "/login"//重定向登陆界面
  }

];



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});



export default router
