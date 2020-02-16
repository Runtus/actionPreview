//这是活动发布的路由

const express = require("express");
const configMysqlConnect = require("../mysql");
const router = express.Router();


router.get('/',(req,res) => {
   console.log(req.session.teacherName);
   if(req.session.teacherName !== undefined)
   {
        let jsonData = {
            status : "success",
            teacherName : req.session.teacherName
        }
        res.json(jsonData);
   }
   else
   {
        let jsonData =  {
            status : "fail" ,
            Inf : "登录时间已经过期，请重新登录!"
        } 
        res.json(jsonData);

   }
})   

router.post("/",(req,res) => {
    console.log(req.url);
    console.log(req.body);
    if(req.body.isSerious === 'true')
    {
        req.body.isSerious = 1;
    }
    else
    {
        req.body.isSerious = 0;
    }
    
    if(req.body.isTop === 'true')
    {
        req.body.isTop = 1;
    }
    else
    {
        req.body.isTop = 0;
    }

    {
        let actId = req.body.actDate.split('-').join("")+req.body.actTitle;
        let dian = "'";//字符串必须加引号，否则要报错。
        let actTitle =dian +  req.body.actTitle + dian;
        let actDate =  dian + req.body.actDate + " " + req.body.actTime[0] +" "+  req.body.actTime[1] + dian;
        let actPlace = dian + req.body.actPlace + dian;
        let isSerious = dian + req.body.isSerious + dian;
        let actInf = dian + req.body.actInfo + dian;
        let maxPeople = Number(req.body.maxPeople);//因为是数字，所以说不用加引号
        let isTop = dian + req.body.isTop + dian;//强制转换
        let newActId = dian + actId + dian;//设置活动id
        //调试用
        // console.log(actTitle);
        // console.log(actDate);
        // console.log(actPlace);
        // console.log(isSerious);
        // console.log(actInf);
    
        let query = `insert into actionsTotal 
                    (actTitle , actDate, actPlace, isSerious, actInf , teacherName , actionId, isTop, maxPeople) values 
                    (${actTitle},${actDate},${actPlace},${isSerious},${actInf},'白龙飞',${newActId},${isTop},${maxPeople});` ;//规定参数

        configMysqlConnect.query(query,(err,result) => {
            if(err)
            {
                console.log(err);
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