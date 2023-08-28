const mysql = require('mysql');
const connection = mysql.createConnection({
    host: "",
    user: "",
    password: "",
    database: "",
    insecureAuth: true
});

connection.connect((err) => {
    if(err){
        console.log(err);
    }else{
        console.log("Database Connecte!")
    }
   
})
module.exports = connection;