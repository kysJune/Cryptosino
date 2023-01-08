const {db} = require("./connect");
const express = require("express");
const app = express();
const cors = require('cors');
// const bodyParser = require('body-parser');
require("dotenv").config();
//middleware that handles jsx form data
//without bodyParser there is no way to get data from an input field 
// app.use(bodyParser.urlencoded({ extended: true }));

//MIDDLEWARE

//middleware for parsing JSON
app.use(express.json());
//for allowing api calls from different origins (front end to back end)
app.use(cors());

//handle user registering
app.post(`http://localhost:${process.env.PORT}/user/register`, (req, res) =>{
//get the user info from the request
let email = req.body.email;
let password = req.body.password;
//check if the email already exists in the database
let emailExists = false;
//create sql select query
let sql = "SELECT * FROM 'users' WHERE 'email' = " + email;
//query the database
db.getConnection((err, connection) =>{
  db.getConnection((err, connection) => {
    if(err) throw err;
    console.log('connected as id ' + connection.threadId);
    connection.query(sql, (err, rows) => {
        connection.release(); // return the connection to pool
        if(err) throw err;
        console.log('The data from users table are: \n', rows);
        if(rows.length > 0){
          emailExists = true;
        }
    });
  });
});
//if the result length is greater than 0 
if(emailExists){
  //then the email is already taken 
  //tell the user that the email is already taken
  alert("email already exists. Either log in to your account or register with a different email.");
  //(do not insert it into the table)
  return;
}
//create sql insert query
let  = "INSERT email' INTO "
//query the sql connection pool to try inject the new user info into the user table

//if the result of the query is good, then {

//redirect the user to the Home page again 

//change the state of the header component in the front end
//}
} );

app.post("/login", (req, res) =>{
  console.log("email: " + req.body.email + "\n" + "password: " + req.body.password);
  res.redirect("/"); //TODO: change this so that it redirects to the logged in page not the initial home page
  //possibly through another component but probably just by changing state of the App component and passing
  //the state to the Home page via isLoggedIn prop
});

app.get("/test", (req, res) =>{
  res.send("hello");
});
  
const PORT = process.env.PORT || 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));