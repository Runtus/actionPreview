const express = require('express');
const xlsx = require("xlsx");
const path = require("path");
const mysqlConfig = require("../mysql");
const fs = require("fs");



const router = express.Router();


let actions_list_array_origin = [{A : "活动标题" , B : "活动时间", C : "活动地点", D : "活动是否置顶",E : "活动详情",F : "活动发布老师",G: "活动是否置顶", H : "活动上限人数"}];//活动信息导出准备数组
let actions_list_header = {header: ["A","B","C","D","E","F","G","H"],skipHeader:true};//活动导出表信息
let students_list_array_origin = [{stdId: "学号", stdName : "姓名", applyDate:"申请日期",applyReason : "理由"}];
let students_list_header = {header : ["stdId","stdName","applyDate","applyReason"],skipHeader:true};




router.get('/',(req,res) =>{
    res.send("你好")
})


//活动信息导出
router.get('/excel-actions-list', function(req, res){
    let wb = xlsx.utils.book_new();//定义文本薄
    let date = new Date();
    let query = `select actPlace A,actDate B,actPlace C,isSerious D,
        actInf E, teacherName F,isTop G,maxPeople H from actionstotal`;
    mysqlConfig.query(query,(err,data)=> {
        if(err)
        {
            console.log(err);
            res.send("error");
        }
        else
        {
            let actions_list_array = [...actions_list_array_origin];
            data.forEach((data_one) => {
                actions_list_array.push(data_one);
            })

            let ws = xlsx.utils.json_to_sheet(actions_list_array,actions_list_header);//定义表
            
            xlsx.utils.book_append_sheet(wb,ws,"sheet1");//将表加载到总体结构上
            xlsx.writeFile(wb,"活动信息.xlsx");    //文本导出
            // console.log(ws)
            // res.sendFile(path.join(__dirname,"../测试.xlsx"));
            res.setHeader("Content-type","application/vnd.ms-excel");
            res.download(path.join(__dirname,"../测试.xlsx"),`${date.getMonth()}月${date.getDate()}日${date.getHours()}时的活动名单.xlsx`,(err) => {
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    console.log("ok");
                }
            });
        }
    } )
    
    
});


router.get("/excel-students-list",(req,res) => {
    let students_list_array = [...students_list_array_origin];
    let date = new Date();
    let actionId = req.query.actionId; //获取活动id
    let query = `select stdId,stdName,applyDate,applyReason 
                from subscribelist where actionId = '${actionId}'`;
    mysqlConfig.query(query,(err,data)=> {
        if(err)
        {
            console.log(err);
            res.send("error");
        }
        else if(data.length === 0)
        {
            console.log("数据库为空");
            res.sendStatus(404);
            // res.json({"code":"200","status":"empty"});
        }
        else
        {
            data.forEach((data) => {
                students_list_array.push(data);
            })
            
            let wx = xlsx.utils.json_to_sheet(students_list_array,students_list_header);
            let wb = xlsx.utils.book_new();
            xlsx.utils.book_append_sheet(wb,wx,"students");
            xlsx.writeFile(wb,"学生活动.xlsx");
            res.setHeader("Content-type","application/vnd.ms-excel");
            res.download(path.join(__dirname,"../学生活动.xlsx"),`${date.getMonth()}月${date.getDate()}日${date.getHours()}时的学生活动名单.xlsx`,(err) => {
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    console.log("传输成功!");
                }
            })
        }
    })            
    
});



module.exports = router;