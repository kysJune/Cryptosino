const {db} = require("./connect");


//updates the balance of a user
let saveBalance = async (req, res) =>{
  //get the user info from the request
  let email = req.body.userEmail;
  let newBalance = req.body.userBalance;
   //create sql select query
   let sql = "UPDATE users SET balance = '" + newBalance + "' WHERE email = '" + email + "'";
   //query the database
   db.getConnection((err, connection) => {
        if(err) {
            res.send({success: false});
            throw err;
        }
        connection.query(sql, (err, rows) => {
            connection.release(); // return the connection to pool
            if(err){
                res.send({success: false});
                 throw err;
            }
            else{
                res.send({success: true})
            }
        });
    });
}

module.exports = {saveBalance}