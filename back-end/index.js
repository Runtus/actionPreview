'use strict'
const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const util = require("util");
const cookieParser = require("cookie-parser");
const querystring = require("querystring");
const configMysqlConnect = require('./mysql');
const session = require("express-session");

let app = express();
const jsonParser = bodyParser.json();//对Json的处理

//路由
const actInf = require('./Router/actInf');
const pubAct = require('./Router/pubAct');
const stdInf = require('./Router/studentInf');
const excel  = require('./excelExport/excel-for-action-Inf');

configMysqlConnect.connect();//mysql连接


app.use(cookieParser());//cookie处理
app.use(jsonParser);//用于对post请求体的处理
app.use(bodyParser.urlencoded({ extended: false })); //json解析工具 
app.use(session({
    name : "sker",
    secret : "youdiansao",
    resave : false,  //是否允许session重复设置，但是如果为true 则其他路由看不到自己设置的session
    rolling : true,
    saveUninitialized : true , //是否允许session在使用过程中被修改
    cookie : {
        maxAge : 30 * 60 * 1000 //三十分钟session
    }
}))


var number = 0;

app.all('*', (req, res, next) => { 
    res.header("Content-Type", "application/json;charset=utf-8"); 
    res.header("Access-Control-Allow-Origin", req.headers.origin);  //cookie 跨域
    res.header("Access-Control-Allow-Headers", "X-Requested-With,content-type");  //允许接受content-type头部的跨域。
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
    res.header("X-Powered-By",' 3.2.1');  
    res.header("Access-Control-Allow-Credentials",true); //cookie跨域
    console.log("这里是app.all "+req.url);  
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
                res.json([{"code": "404" }]);
            }
            else(result !== "")
            {
                console.log(req.cookies);
                console.log(result[0].name)
                req.session.teacherName = result[0].name;
                console.log(req.session);
                res.json(result);
            }
        })
    }
    else{
        number = 0;
    }
})


//router挂载
app.use("/pubAct",pubAct);
app.use("/actInf",actInf);
app.use("/actInf/moreInf",stdInf);
app.use("/excel",excel);

app.listen(8088,() => {
    console.log("服务已经启动");
});