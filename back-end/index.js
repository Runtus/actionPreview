const express = require("express");
const mysql = require("mysql");


var number = 0;

let app = express();

let connect = mysql.createConnection({
    host : "127.0.0.1",
    user : "root",
    port : "3306" ,
    password : "Lan201803",
    database : "test"
});


connect.connect();

app.all('*', function(req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "X-Requested-With");  
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
    res.header("X-Powered-By",' 3.2.1')  
    res.header("Content-Type", "application/json;charset=utf-8");
    console.log(req.method);  
    next();  
});  


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

app.options('/login',(req,res) => {
    console.log("看下有没有options请求");
})

app.listen(8088,() => {
    console.log("服务已经启动");
});