const express = require("express");
const configMysqlConnect = require("../mysql");
const router = express.Router();

router.get('/',(req,res) => {
    console.log(req.cookies);
    let account = req.cookies.UserId;
    let query = `select name from students where account=${account}`;
    configMysqlConnect.query(query,(err,result) => {
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log(result[0].name);
            res.send(result[0].name);
        }
    })
})

router.post("/",(req,res) => {
    console.log(req.url);
    console.log(req.body);
    {
        let actId = req.body.actDate.split('-').join("")+req.body.actTitle;
        let dian = "'";//字符串必须加引号，否则要报错。
        let actTitle =dian +  req.body.actTitle + dian;
        let actDate =  dian + req.body.actDate + " " + req.body.actTime[0] +" "+  req.body.actTime[1] + dian;
        let actPlace = dian + req.body.actPlace + dian;
        let isSerious = dian + req.body.isSerious + dian;
        let actInf = dian + req.body.actInf + dian;
        let newActId = dian + actId + dian;//设置活动id
        //调试用
        // console.log(actTitle);
        // console.log(actDate);
        // console.log(actPlace);
        // console.log(isSerious);
        // console.log(actInf);
    
        let query = `insert into actionsTotal 
                    (actTitle , actDate, actPlace, isSerious, actInf , teacherName , actionId) values 
                    (${actTitle},${actDate},${actPlace},${isSerious},${actInf},'白龙飞',${newActId});` ;//规定参数
        console.log(query);
        configMysqlConnect.query(query,(err,result) => {
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

module.exports = router;