const {db} = require("./connect");
const express = require("express");
const app = express();
const cors = require('cors');
const bcrypt = require('bcryptjs'); //for encrypting user password
const { getBalance } = require("./balanceRoutes/user/getBalance");
const { saveBalance } = require("./balanceRoutes/user/saveBalance");
const { updateJackpot, getjackpot } = require("./balanceRoutes/jackpot");
const { login } = require("./login");

//import { login } from "./login";
require("dotenv").config(); //allows access to the .env variables


//MIDDLEWARE

//middleware for parsing JSON
app.use(express.json());
//for allowing api calls from different origins (front end to back end)
app.use(cors());

//USER ROUTES 

//handle user registering
app.post(`/user/register`, (req, res) =>{
  //get the user info from the request
  let email = req.body.email;
  let password = req.body.password;
  //check if the email already exists in the database
  let emailExists = false;
  //create sql select query
  let sql = "SELECT * FROM users WHERE email = '" + email + "'";
  //query the database
    db.getConnection((err, connection) => {
      if(err) throw err;
      console.log('connected as id ' + connection.threadId);
      connection.query(sql, (err, rows) => {
          connection.release(); // return the connection to pool
          if(err) throw err;
          console.log('The data from users table are: \n', rows);
          if(Object.keys(rows).length > 0){
            console.log("the email exists");
            emailExists = true;
          }
            if(emailExists){
              console.log("in here");
              //then the email is already taken 
              //tell the user that the email is already taken
    
              //(do not insert new credentials into the table)
              res.send({success: false});
              return;
            }
            else{
              console.log("inserting new user into database");
              //hash the password
              let hashedPassword =  bcrypt.hashSync(password, 10);
              //create sql insert query
              sql = "INSERT INTO users (email, password) VALUES ('" + email + "', '" + hashedPassword + "')";
              //query the sql connection pool to try inserting the new user info into the user table
              db.getConnection((err, connection) =>{
                if(err) throw err;
                connection.query(sql, (err, rows) =>{
                  connection.release(); // return the connection to pool     
                  if(err) throw err;
                });
              });
              //if the result of the query is good, then {
            
              //redirect the user to the Home page again 
              
              //change the state of the header component in the front end
              //}
              res.send({
                success: true,
                userEmail: email,
                userPassword: hashedPassword,
                userBalance: 5
              });
          }
      });
    });
});

app.get("/user/login", (req, res) => login( req, res))
  
//END USER ROUTES


//BALANCE ROUTES

app.get('/user/balance', getBalance);

app.post('/user/balance/update', saveBalance);

//END BALANCE ROUTES

//SLOT MACHINE ROUTES

app.get('/jackpot', getjackpot);

app.post("/jackpot/update", updateJackpot);

//END SLOT MACHINE ROUTES

const PORT = process.env.PORT || 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));