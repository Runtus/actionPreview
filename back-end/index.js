'use strict'
const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const querystring = require("querystring");
const util = require("util");
let app = express();

let connect = mysql.createConnection({
    host : "127.0.0.1",
    user : "root",
    port : "3306" ,
    password : "Lan201803",
    database : "test"
});
connect.connect();

var number = 0;






const jsonParser = bodyParser.json();//对Json的处理
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(jsonParser);//用于对post请求体的处理

app.all('*', function(req, res, next) { 
    res.header("Content-Type", "application/json;charset=utf-8"); 
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "X-Requested-With,content-type");  //允许接受content-type头部的跨域。
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
    res.header("X-Powered-By",' 3.2.1');  
    console.log(req.method);  
    if(req.method === 'OPTIONS')
    {
        res.send("Options");
    }
    else
    {
        next();  
    }
    
});  //跨域处理




app.get("/",(req,res) => {
    console.log(req.url);
    console.log(req.query); //query获得传来的参数
    res.send("你好");
    
})

app.get('/login',(req,res) => {
    number++;
    if(number === 1) //设定第一次访问
    {
        let account = req.query.aco;
        let password = req.query.psw;
        let query = `select name from students where account=`+account +` and password=`+password;
        console.log(query);
        connect.query(query ,(err,result) =>{
            if(err)
            {
                console.log("数据库有错");
                return ;
            }
            if(result !== "")
            {
                let string = JSON.stringify(result);
            
                console.log(string);
                res.json(result);
                console.log("第"+number+"次到达这里");
            }
        })
    }
    else{
        number = 0;
    }
})
app.get('/pubAct',(req,res) => {
    res.sendStatus(200);
})


app.post('/pubAct',(req,res) => {
    console.log(req.url);
    console.log(req.body);
    {
        let dian = "'";//字符串必须加引号，否则要报错。
        let actTitle =dian +  req.body.actTitle + dian;
        let actDate =  dian + req.body.actDate + " " + req.body.actTime[0] +" "+  req.body.actTime[1] + dian;
        let actPlace = dian + req.body.actPlace + dian;
        let isSerious = dian + req.body.isSerious + dian;
        let actInf = dian + req.body.actInf + dian;
        
        
        console.log(actTitle);
        console.log(actDate);
        console.log(actPlace);
        console.log(isSerious);
        console.log(actInf);
        if(isSerious === true)
        {
            isSerious = 1;
        }
        else
        {
            isSerious = 0;
        }
        let query = `insert into actionsTotal (actTitle , actDate, actPlace, isSerious, actInf , teacherName) values (` + actTitle + `,` + actDate + `,` + actPlace + `,` + isSerious + `,` + actInf + `,'白龙飞');` ;//规定参数
        console.log(query);
        connect.query(query,(err,result) => {
            if(err)
            {
                res.end("提交失败");
            }
            else{
                console.log(result);
                res.send("成功插入数据")
            }
        })
    

    }
   
    
    
})

app.options('/pubAct',(req,res) => {
    res.send("options");
})

app.listen(8088,() => {
    console.log("服务已经启动");
});