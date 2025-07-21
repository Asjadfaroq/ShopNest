const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(9000, ()=>{
    console.log("server is running on http://localhost:9000")
});

app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/ajax.html");
})

app.post("/show", (req,res)=>{
    var first = req.body.first;
    var last = req.body.last;

    return res.json(`first: ${first} and last: ${last}`);
})