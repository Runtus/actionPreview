//这个是学生名单展示的路由
const express = require("express");
const mysqlConfig = require("../mysql");
const router = express.Router();
 

// 路径  "/actInf/moreInf"
router.get('/',(req,res) => {

    let PageSize = 5;//定义每页大小
    let actionId = req.query.actionId;
    let resData = {
        studentsNum : 0,
        studentInf : [],
        teacherName : "",
        status : ""
    }
    if(req.session.teacherName === undefined)
    {
        let jsonData = {
            status : "fail"
        }
        res.json(jsonData);
    }
    //获取学生信息的总数
    else
    {
        resData.teacherName = req.session.teacherName;//设置教程名
        resData.status = "success";//设置访问状态
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
    }
    
});



// 路径  "/actInf/moreInf/page"
router.get("/page",(req,res) => {
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


// 路由: "/actInf/moreInf/search"
router.get('/search',(req,res) => {
    let pageSize = 5;
    let {searchedInf , actionId} = req.query;
    
    let responData = {
        pageNum : 0,
        searchedData : ""
    }
    
    {
            console.log(searchedInf);
        {
            query = `select count(stdId) number from subscribeList
                    where instr(stdId,'${searchedInf}')
                    and actionId = '${actionId}'`;

            mysqlConfig.query(query,(err,result) => {
                if(err)
                {
                    console.log(err);
                    res.send("有错误1");
                }
                else
                {
                    console.log(result);
                    responData.pageNum = result[0].number; //获取索引页数
                }
            })
        }

        //获取真实数据
        {
            query = `select * from subscribeList
                    where instr(stdId,'${searchedInf}') 
                    and actionId = '${actionId}'
                    limit ${pageSize} offset 0`;
            mysqlConfig.query(query,(err,result) => {
                if(err)
                {
                   console.log(err);
                   res.send("有错误");
                }
                else
                {
                    console.log(result);
                    responData.searchedData = result;
                    res.json(responData);
                }
            })
        }
    
    }
    
})


//实时搜索之页面寻找 
// 路由 "/actInf/moreInf/search/page"
router.get('/search/page',(req,res) => {
    let pageSize = 5;
    let {searchedInf , currentPage , actionId} = req.query;
    let beginSearch = (currentPage - 1) * pageSize;
    {
        query = `select * from subscribeList 
        where instr(actTitle,'${searchedInf}')
        and actionId = '${actionId}' 
        limit ${pageSize} offset ${beginSearch}`;
        mysqlConfig.query(query,(err,result) => {
            if(err)
            {
                console.log(err);
                res.send("数据库有错误");
            }
            else
            {
                console.log(result);
                res.json(result);     
            }
        })
    }
})






module.exports = router;