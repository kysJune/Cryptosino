//TODO: create jackpot table in mysql db

const {db} = require("../connect");


//returns the current jackpot
let getjackpot = async (req, res) =>{

   //create sql select query
   let sql = "SELECT jackpot FROM jackpot";
   //query the database
   db.getConnection((err, connection) => {
        if (err){
            res.send({success: false});
            throw err;
        } 
       
        connection.query(sql, (err, rows) => {
            connection.release(); // return the connection to pool
            if(err){
                res.send({success: false});
                throw err;
            } 
            //if the result of the query has at least one row
            if(Object.keys(rows).length > 0){
              console.log("found the jackpot: " + rows[0].jackpot);
              res.send({success: true, jackpot: rows[0].jackpot});
            }
            else{
                console.log("Error: could not retrieve current jackpot value");
                res.send({success: false});
            }
        });
    });
}




//updates the current jackpot
let updateJackpot = async (req, res) =>{
    //get the new jackpot value from the request
    let newJackpot = req.body.newJackpot;
    //create sql select query
    let sql = "UPDATE jackpot SET jackpot = '" + newJackpot + "' WHERE id = 1";
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

module.exports = {updateJackpot, getjackpot}