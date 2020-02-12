'use strict'
const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const util = require("util");
const cookieParser = require("cookie-parser");
const querystring = require("querystring");
const configMysqlConnect = require('./mysql');
const pubAct = require('./Router/pubAct');
let app = express();
const jsonParser = bodyParser.json();//对Json的处理

configMysqlConnect.connect();//mysql连接
app.use(cookieParser());//cookie处理
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(jsonParser);//用于对post请求体的处理

var number = 0;

app.all('*', (req, res, next) => { 
    res.header("Content-Type", "application/json;charset=utf-8"); 
    res.header("Access-Control-Allow-Origin", req.headers.origin);  //cookie 跨域
    res.header("Access-Control-Allow-Headers", "X-Requested-With,content-type");  //允许接受content-type头部的跨域。
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
    res.header("X-Powered-By",' 3.2.1');  
    res.header("Access-Control-Allow-Credentials",true); //cookie跨域
    console.log("这里是app.all "+req.method);  
    if(req.method === 'OPTIONS')
    {
        res.send("Options");
    }
    else
    {
        next();  
    }
});  //跨域处理

app.get('/login',(req,res) => {
    number++;
    if(number === 1) //设定第一次访问
    {
        let account = req.query.aco;
        let password = req.query.psw;
        let query = `select name from students where account=`+account +` and password=`+password;
        configMysqlConnect.query(query ,(err,result) =>{
            if(err)
            {
                console.log("数据库有错");
                return ;
            }
            if(result !== "")
            {
                console.log(req.cookies);
                let cookieInf = account + "";
                res.cookie("UserId",cookieInf,{maxAge : 1000 * 60,httpOnly : true });
                res.json(result);
                console.log("第"+number+"次到达这里");
            }
        })
    }
    else{
        number = 0;
    }
})

app.use("/pubAct",pubAct);//router挂载



app.listen(8088,() => {
    console.log("服务已经启动");
});