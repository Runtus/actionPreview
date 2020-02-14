let data = [];
console.log(req.url);
  var conf ={};
conf.stylesXmlFile = "styles.xml";
conf.name = "mysheet";

{
    let query = `select actTitle , actDate , actPlace , isSerious , actInf , teacherName 
        from actionsTotal;`;
    mysqlConfig.query(query,(err,result) => {
        if(err)
        {
            console.log(err);
            data = [];
        }
        else
        {
            data = result;
            conf.cols = [{
                caption:'活动标题',
                type:'string',
                width:28.7109375
            },{
                caption:'活动时间',
                type:'string',
                beforeCellWrite:function(){
                    // var originDate = new Date(Date.UTC(1899,11,30));
                    // return function(row, cellData, eOpt){
                      // 	if (eOpt.rowNum%2){
                    // 		eOpt.styleIndex = 1;
                      // 	}  
                      // 	else{
                    // 		eOpt.styleIndex = 2;
                      // 	}
                    //     if (cellData === null){
                    //       eOpt.cellType = 'string';
                    //       return 'N/A';
                    //     } else
                    //       return (cellData - originDate) / (24 * 60 * 60 * 1000);
                    // } 
                }()
            },{
                caption:'活动地点',
                type:'string'
            },{
                caption:'是否是紧急事件',
                 type:'bool'				
              },{
                caption:'活动信息',
                type : 'string'
              },
            {
                caption : "发布活动的辅导员" ,
                type : 'string'
            }];
            
            console.log(data)


            conf.rows = [
                 data
              ];
            
              var result = nodeExcel.execute(conf);
              res.setHeader('Content-Type', 'application/vnd.openxmlformats');
              res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
              res.end(result, 'binary');
        }
    })    
}