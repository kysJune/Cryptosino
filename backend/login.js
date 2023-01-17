require('dotenv').config();
const{db} = require("./connect.js");
const bcrypt = require('bcryptjs');

let login = async(req, res) => {
  console.log("LOGGING IN")  
  let email = req.query.email;
  let password = req.query.password;
  console.log("email: " +  email + "\n" + "password: " + password);

  let sql = "SELECT password, balance FROM users WHERE email = '" + email + "'";

  db.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(sql, (err, rows) => {
      connection.release(); // release the connection pool
      if (err) throw err;
      if (Object.keys(rows).length == 0) {
        console.log("Accound doesnt exist with this email");
        res.send({success: false});
        return;
      }
      else {
        // account exists with this email
        bcrypt.compare(password, rows[0].password, function(err, result) {
          console.log(rows[0]);
          console.log(result);
          //TODO: send the success ojbect otherwise send the failure object
          if(result == true){
            //send success object
            console.log("account exists");
            res.send({
              success: true,
              userEmail: email,
              userPassword: rows[0].password,
              userBalance: rows[0].balance
            });
            return;
          }
          else{
            console.log("wrong password");
            res.send({success: false});
          }
        });
      }
    });
  })
};
module.exports = {login};