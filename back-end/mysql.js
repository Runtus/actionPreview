const mysql = require("mysql");

let connect = mysql.createConnection({
    host : "127.0.0.1",
    user : "root",
    port : "3306" ,
    password : "Lan201803",
    database : "test"
});

module.exports = connect;