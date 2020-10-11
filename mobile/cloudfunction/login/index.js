// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios = require("axios");
const TcbRouter = require('tcb-router');
const qs = require("qs");
axios.defaults.baseURL = "http://175.24.63.102:8080"
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({ event });
  app.router("login",async (ctx) => {
    let query = ctx._req.event;
    let post_data = {
      stuId : query.stuId,
      stuPass : query.stuPass
    }
    let post_query = qs.stringify(post_data);
    await axios({
      method : "post",
      url : `/login?${post_query}`
    }).then(res => {
      ctx.body = res.data;
    }).catch(err => {
      ctx.body = {code : "500" , inf : err}
    })
  })

  app.router("actionInf",async (ctx) => {
    let query = ctx._req.event;
    let token = query.token;
    await axios({
      method : "get",
      url : "/getAllActivities",
      headers : {
        token : token
      }
    })
    .then(res => {
      ctx.body = res.data;
    })
    .catch(err => {
      ctx.body = { code : 500 , inf : err}
    })
  })

  app.router("detailInf",async (ctx) => {
    let query = ctx._req.event;
    let token = query.token;
    let actId = query.actId;

    await axios({
      method : "get",
      url : `/actDetails?actid=${actId}`,
      headers : {
        token : token
      }
    })
    .then(res => {
      ctx.body = res.data;
    })
    .catch(err => {
      ctx.body = {code : "500", inf : err}
    })
  })

  app.router("history", async (ctx) => {
    let query = ctx._req.event;
    let token = query.token;

    await axios({
      
    })
  })
  
  return await app.serve();
}