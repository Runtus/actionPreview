const express = require("express");
const mysqlConfig = require("../mysql");
const router = express.Router();

//路由 : "/actChanged"
router.get("/",(req,res) => {
    let pageSize = 5;//设置页数大小

    let jsonData = { //设置失败消息
        status : "fail",
        DBerror : 0,
        DBdata : [],
        DBdataTotal : 0,
        sessionTeacher : ""
    }

    console.log(req.session.teacherName);
    if(req.session.teacherName !== undefined)
    {
        let teacherName = req.session.teacherName;
        jsonData.sessionTeacher = teacherName;
        //获取页数
        {
            let query = `select count(isTop) number from actionsTotal 
                where teacherName = '${teacherName}'`
            mysqlConfig.query(query,(err,data) => {
                if(err)
                {
                    console.log(err);
                    jsonData.DBerror = 1;
                    res.send(jsonData).end();
                }
                else
                {
                    jsonData.DBdataTotal = data[0].number;
                }
            })

        }

        //获取第一页消息
        {
            let query = `select * from actionsTotal 
            where teacherName = '${teacherName}' 
            limit ${pageSize} offset 0;`
            mysqlConfig.query(query,(err,result) => {
                if(err){
                    jsonData.DBerror = 1;
                    console.log(err);
                    res.json(jsonData); //数据库错误
                }
                else
                {
                    jsonData.status = "success";
                    jsonData.DBdata = result;

                    res.json(jsonData);
                }
            })
        }
        
    }
    else
    {
        res.json(jsonData);//登录失效
    }
    
});

// 路由: "/actChanged/page"
router.get("/page",(req,res) => {
    let jsonData = {
        status : "fail",
        DBdata : []
    }
    if(req.session.teacherName !==undefined)
    {
        let pageSize = 5;
        let teacherName = req.session.teacherName;
        let currentPage = req.query.currentPage;//参数在query里，而不是在params里
        let beginPage = pageSize * (currentPage - 1);
        console.log(currentPage);
        let query = `select * from actionsTotal 
            where teacherName = '${teacherName}'
            limit ${pageSize} offset ${beginPage}`;
        mysqlConfig.query(query,(err,result) => {
            if(err)
            {
                console.log(err);
                res.json(jsonData);
            }
            else
            {
                jsonData.status = "success";
                jsonData.DBdata = result;
                res.json(jsonData);
            }
        })
    }
    else
    {
        res.json(jsonData);
    }
})


//搜索响应 /actChanged/search
router.get("/search",(req,res) => {
    let pageSize = 5;//设置页数大小
    console.log("进入了这里");
    let searchedInf = req.query.searchedInf;
    let jsonData = { //设置失败消息
        status : "fail",
        DBerror : 0,
        DBdata : [],
        DBdataTotal : 0
    }

    console.log(req.session.teacherName);
    if(req.session.teacherName !== undefined)
    {
        let teacherName = req.session.teacherName;
        //获取页数
        {
            let query = `select count(isTop) number from actionsTotal 
                where teacherName = '${teacherName}'
                and instr(actTitle,'${searchedInf}')`
            mysqlConfig.query(query,(err,data) => {
                if(err)
                {
                    console.log(err);
                    jsonData.DBerror = 1;
                    res.send(jsonData).end();
                }
                else
                {
                    jsonData.DBdataTotal = data[0].number;
                }
            })

        }

        //获取第一页消息
        {
            let query = `select * from actionsTotal 
            where teacherName = '${teacherName}' 
            and instr(actTitle,'${searchedInf}')
            limit ${pageSize} offset 0;`
            mysqlConfig.query(query,(err,result) => {
                if(err){
                    jsonData.DBerror = 1;
                    console.log(err);
                    res.json(jsonData); //数据库错误
                }
                else
                {
                    jsonData.status = "success";
                    jsonData.DBdata = result;
                    res.json(jsonData);
                }
            })
        }
        
    }
    else
    {
        res.json(jsonData);//登录失效
    }
})

//搜索页面索引响应 路由: "/actChanged/search/page"
router.get("/search/page",(req,res) => {
    let jsonData = {
        status : "fail",
        DBdata : []
    }
    if(req.session.teacherName !==undefined)
    {
        let pageSize = 5;
        let searchedInf = req.query.searchedInf;
        let teacherName = req.session.teacherName;
        let currentPage = req.query.currentPage;//参数在query里，而不是在params里
        let beginPage = pageSize * (currentPage - 1);
        console.log(currentPage);
        let query = `select * from actionsTotal 
            where teacherName = '${teacherName}'
            and instr(actTitle,'${searchedInf}')
            limit ${pageSize} offset ${beginPage}`;
        mysqlConfig.query(query,(err,result) => {
            if(err)
            {
                console.log(err);
                res.json(jsonData);
            }
            else
            {
                jsonData.status = "success";
                jsonData.DBdata = result;
                res.json(jsonData);
            }
        })
    }
    else
    {
        res.json(jsonData);
    }
})



module.exports = router;