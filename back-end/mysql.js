const mysql = require("mysql");


let conncet = mysql.createConnection({
    host : "laolanruntu.mysql.rds.aliyuncs.com",
    port : "3306",
    password : "lan201803",
    user : "rootlaolan",
    database : "teacher"
});


module.exports = conncet;