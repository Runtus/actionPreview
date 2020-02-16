const express = require("express");
const mysqlConfig = require("../mysql");
const router = express.Router();


// 路由: "actChanged/formChanged"
router.get("/",(req,res) => {
    if(req.session.teacherName !== undefined)
    {
        let actionId = req.query.actionId;
        let query = `select * from actionsTotal
            where actionId = '${actionId}'`;
        mysqlConfig.query(query,(err,result) => {
            if(err)
            {
                res.json({"database":"error"});
            }
            else
            {
                console.log("正确");
                res.json(result[0]);
            }
        })
    }
    else
    {
        res.json({"status":"fail"});//认证失败
    }
})

// 路由: "actChanged/formChanged/submit"
router.post("/submit",(req,res) => {
    console.log(req.body);
    let {actTitle,actDate,actPlace,actInf,actionId,maxPeople,newActionId} = req.body;
    let isSerious = 0;
    let isTop = 0; 
    
    if(req.body.isSerious === "true")
    {
        isSerious = 1;
    }
    if(req.body.isTop === "true")
    {
        isTop = 1;
    }
    //下面开始更新操作
    {
        let query = `update actionsTotal set 
        actTitle = '${actTitle}',actDate = '${actDate}' ,
        actPlace = '${actPlace}',isSerious = '${isSerious}',
        actInf = '${actInf}',actionId = '${actionId}',
        isTop = '${isTop}', maxPeople = ${maxPeople} ,
        actionId = '${newActionId}'
        where actionId = '${actionId}'`;
        mysqlConfig.query(query,(err,result) => {
            if(err)
            {
                console.log(err);
                res.json({"status":"fail"});
            }
            else
            {
                res.send("成功!");
            }
        })
    }
    
})


module.exports = router;