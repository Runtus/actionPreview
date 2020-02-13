const express = require("express");
const mysqlConfig = require("../mysql");
const router = express.Router();

router.get('/',(req,res,next) => {
    //获取对应活动数
    let resData = {
        actionNumber : 0,
        data : []
    };

    //获取行数
    {
        let query = `select count(isSerious) line from  actionsTotal;`
        mysqlConfig.query(query,(err,result) => {
            if(err)
            {
                console.log("数据库有错误");
                res.send("数据库有错");                
            }
            else
            {
                resData.actionNumber  =result[0].line;
            }
        })
        
    }
    //获取表格数据
    {
        let query = `select * from actionsTotal
        limit 3 offset 0`;
        mysqlConfig.query(query,(err,result) => {
            if(err)
            {
                console.log(err);
                res.send("数据库错误");
            }
            else
            {
                resData.data = result;
                res.json(resData);
            }
        })
    }
    
});

router.get('/page',(req,res) => {
    let currentPage = req.query.page;
    let beginSearch = 3 * (currentPage - 1);
    console.log(currentPage);

    let query = `select * from actionsTotal
    limit 3 offset ${beginSearch}`;   
    mysqlConfig.query(query,(err,result) => {
        if(err)
        {
            console.log("数据库有错误");
        }
        else
        {
            console.log(result);
            res.json(result);
        }
    })
});




router.get('/moreInf',(req,res) => {
    let PageSize = 5;//定义每页大小
    let actionId = req.query.actionId;
    let resData = {
        studentsNum : 0,
        studentInf : []
    }
    
    //获取学生信息的总数
    {
        let query = `select count(stdId) number
            from subscribeList
            where actionId = '${actionId}'`;
        mysqlConfig.query(query,(err,result) => {
            if(err)
            {
                console.log("数据库错误");
                res.send("数据库错误");
            }
            else
            {
                console.log(result);
                resData.studentsNum = result[0].number;
            }
        })    
    }

    //获取首页信息
    {
        let query = `select * from subscribeList
        where actionId = '${actionId}'
        limit ${PageSize} offset 0 `;
        mysqlConfig.query(query,(err,result) => {
            if(err)
            {
                console.log(err);
                res.send("错误");
            }
            else
            {
                console.log(result);
                resData.studentInf = Array.from(result);
                res.json(resData);
            }
        })
    }
    //获取对应学生信息
});


router.get("/moreInf/page",(req,res) => {
    let PageSize = 5 ;
    let currentPage = req.query.currentPage;
    let actId = req.query.actId;
    let beginNum = (currentPage-1) * PageSize;//SQL分页
    {
        let query = `select * from subscribeList
        where actionId = '${actId}'
        limit ${PageSize} offset ${beginNum}`;
        mysqlConfig.query(query,(err,result) => {
            if(err)
            {
                console.log(err);
                res.send("错误");
            }
            else
            {
                console.log(result);
                res.json(Array.from(result));
            }
        })
    }


   
})



module.exports = router;