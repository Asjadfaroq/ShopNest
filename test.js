// Some Default module that comes with nodejs package
// Http, Fs, Path, Url, Events
// const person = require("./Person");
// console.log(person)

const fs = require('fs');
const path = require("path");
const http = require("http");
const person = require("./Person");
const express = require("express");


// My Controllers
const home = require("./controllers/home");
const about = require("./controllers/about");


const app = express();

// My Routes
app.use("/",home);
app.use("/about",about);


app.get("*",(req,res)=>{
    res.send("Page Not Page");
})

const PORT = "5500";
app.listen(PORT,()=>{console.log(`Server is running on http://localhost:${PORT}`)});


// console.log("abc");