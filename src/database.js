const mysql = require("mysql");
const mysqlConnection =mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"envios",
    multipleStatements:true
});
mysqlConnection.connect(function(err){
    if(err){
        console.log("Error ",err);
    }else{
        console.log("DB is connected");
    }
});
module.exports = mysqlConnection;