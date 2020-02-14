const express = require('express');
const router = express.Router();
const mysqlConfig = require("./../mysql");
const XLSX = require('xlsx');
var stream = require('express');





// 路径 : "/excel/action-Inf"
router.get('/action-Inf', function(req, res){
    const book = XLSX.utils.book_new();
    const sheet = XLSX.utils.aoa_to_sheet([
        ["你好", "我不好", "嘻嘻嘻"],
        [1, 2, 3],
        [3, 4, 5],
        [8, 7, 6],
        [213, 123, 123],
    ]);
    XLSX.utils.book_append_sheet(book, sheet, "test");

    const fileContents = XLSX.write(book, { type: 'buffer', bookType: 'xlsx', bookSST: false });
    
    var readStream = new stream.PassThrough();
    readStream.end(fileContents);

    let fileName = "text.xlsx";
    res.set('Content-disposition', 'attachment; filename=' + fileName);
    res.set('Content-Type', 'text/plain');
    
    readStream.pipe(res);

    
})


module.exports = router;