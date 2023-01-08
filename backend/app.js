const express = require("express");
const app = express();
// const bodyParser = require('body-parser');
require("dotenv").config();
//middleware that handles jsx form data
//without bodyParser there is no way to get data from an input field 
// app.use(bodyParser.urlencoded({ extended: true }));



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