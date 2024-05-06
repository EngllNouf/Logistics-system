const express = require("express");
const app = express(); //Opject 

//static routing 
app.use("/", express.static("./website-Logistics-system"));

//JSON routing
app.use(express.json());


//server
const port = 2000;
app.listen(port, () => {
  console.log("Server is running on port " + port);
});