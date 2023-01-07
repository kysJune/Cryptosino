let mysql = require("mysql");
const { connect } = require("react-redux");


//  let db = mysql.createPool({
//   connectionLimit : 100, //important
//     host: 'localhost',
//     user: 'root',
//     password: 'CleveM3bby!',
//     database: 'cryptosino'
// });
let connection=mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  }
)

// Connecting to database
connection.connect(function(err) {
  if(err){
    console.log("Error in the connection")
    console.log(err)
  }
  else{
    console.log(`Database Connected`)
    connection.query(`SHOW DATABASES`, 
    function (err, result) {
      if(err)
        console.log(`Error executing the query - ${err}`)
      else
        console.log("Result: ",result) 
    })
  }
})
// module.exports = db.promise();