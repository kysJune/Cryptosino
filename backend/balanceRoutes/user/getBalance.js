const {db} = require("../../connect");


//returns the balance of a user
let getBalance = async (req, res) =>{
    console.log("made it in the getBalance route!");
    //get the user info from the request
  let email = req.query.userEmail;
   //create sql select query
   let sql = "SELECT balance FROM users WHERE email = '" + email + "'";
   //query the database
   db.getConnection((err, connection) => {
        if(err) throw err;
        console.log('connected as id ' + connection.threadId);
        connection.query(sql, (err, rows) => {
            connection.release(); // return the connection to pool
            if(err) throw err;
            //if the result of the query has at least one row
            if(Object.keys(rows).length > 0){
              console.log("found the balance: " + rows[0].balance);
              res.send({success: true, userBalance: rows[0].balance});
            }
            else{
                console.log("no user with the email: " + email + " exists in the user table.");
                res.send({success: false});
            }
        });
    });
}

module.exports = {getBalance}