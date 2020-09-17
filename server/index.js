const express = require("express");
const app =  express();
const bodyParser = require("body-parser");
const routes  = require("./routes/index");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(cors());

app.use("/",routes);

app.listen(3001,()=>{
    console.log("server running on 3001");
});

