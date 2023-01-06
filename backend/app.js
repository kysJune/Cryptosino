const express = require("express");
const app = express();
const bodyParser = require('body-parser');

//middleware that handles jsx form data
//without bodyParser there is no way to get data from an input field 
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/post", (req, res) => {
  
  console.log("Message from react: " + req.body.message);
  res.redirect("/");
});
  
const PORT = process.env.PORT || 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));