let mysql = require("mysql");


 let db = mysql.createPool({
  connectionLimit : 100, //important
    host: 'localhost',
    user: 'root',
    password: 'CleveM3bby!',
    database: 'cryptosino'
});

module.exports = db.promise();