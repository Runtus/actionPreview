const express = require("express");
const mysqlConfig = require("./../mysql");
const async = require("async");
const router = express.Router();

//路由: /delete
router.get("/",(req,res) => {
    let pageSize = 5;
    if(req.session.teacherName !== undefined)
    {
        let actionId = req.query.actionId;
        let currentPage = req.query.currentPage;
        console.log(currentPage);
        let teacherName = req.session.teacherName;
        let beginPage = (currentPage-1)*pageSize;
        let queryForDelete = `delete from actionsTotal
                              where actionId = '${actionId}'`;
        let queryForSearch = `select * from actionsTotal 
                              where teacherName = '${teacherName}'
                              limit ${pageSize} offset ${beginPage}`        
       
                mysqlConfig.query(queryForDelete,(err,result) => {
                    if(err)
                    {
                        console.log(err);
                        res.json({"status":"error"}).end();
                    }
                    else
                    {
                        console.log("删除成功!");
                    }
                });

                mysqlConfig.query(queryForSearch,(err,result) => {
                    if(err)
                    {
                        console.log(err);
                        res.json({"status":"error"}).end();
                    }
                    else
                    {
                        res.json(result);
                    }
                })

            
        
        
    }
    else
    {
        res.json({"status":"fail"});
    }
})


module.exports = router;