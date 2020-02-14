//这个是活动信息展示的界面。

const express = require("express");
const mysqlConfig = require("../mysql");
const router = express.Router();


// 路由: "/actInf"
router.get('/',(req,res,next) => {  
    //获取对应活动数
    console.log(req.session.teacherName);
    let resData = {
        actionNumber : 0,
        data : [] ,
        teacherName : ""
    };

    if(req.session.teacherName === undefined)
    {
        let jsonData = {
            status : "fail"
        };
        res.json(jsonData);
    }
    else
    //获取行数
    {
        resData.teacherName = req.session.teacherName;
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
    }//else
    
    
});

//  路由: "/actInf/page"
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


//实时搜索
// 路由 : "/actInf/search"
router.get('/search',(req,res) => {
    let pageSize = 3;
    let searchedInf = req.query.searchedInf;
    let responData = {
        pageNum : 0,
        searchedData : ""
    }
    
    {
            console.log(searchedInf);
        {
            query = `select count(isSerious) number from actionsTotal
                    where instr(actTitle,'${searchedInf}')`;
            mysqlConfig.query(query,(err,result) => {
                if(err)
                {
                    console.log(err);
                    res.send("有错误");
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
            query = `select * from actionsTotal 
                    where instr(actTitle,'${searchedInf}') 
                    limit ${pageSize} offset 0`;
            mysqlConfig.query(query,(err,result) => {
                if(err)
                {
                   console.log(err);
                   res.send(err);
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
// 路由 "/actInf/search/page"
router.get('/search/page',(req,res) => {
    let pageSize = 3;
    let searchedInf = req.query.searchedInf;
    let currentPage = req.query.currentPage;
    let beginSearch = (currentPage - 1) * pageSize;
    {
        query = `select * from actionsTotal 
        where instr(actTitle,'${searchedInf}') 
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


/********学生信息页面********/
//







module.exports = router;