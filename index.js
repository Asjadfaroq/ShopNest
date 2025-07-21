const fs = require('fs');
const path = require("path");
const http = require("http");
const person = require("./script");
const express = require("express");
const bodyParser = require("body-parser");
const cookieparser = require("cookie-parser");
const Mongostore = require("connect-mongo");
const session = require("express-session");
// const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

// Myy controllers
const home = require("./controller/home");
const about = require("./controller/about");
const contact = require("./controller/contact")
const blog = require("./controller/blog")
const service = require("./controller/service")
const cart = require("./controller/cart")
const login = require("./controller/login");
const shop = require("./controller/shop");
const input = require("./controller/input");
const registration = require("./controller/registration");
const product = require("./controller/product");
const servicess = require("./service/user_subscriberservice");





const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieparser());

// const sessionTime = 1000 * 60 * 60 * 1;


// sesssion setting 
app.use(session({
    secret: "asjadfarooqkey",
    resave: false,
    saveUninitialized: true,
}))


mongoose.set('strictQuery', true);
var mongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/estore";

// For Creating Database
mongoClient.connect(url,function(err, db){
    if (err) throw err;
    console.log("Database Created");
    db.close();
});


// for creatting collection 

mongoClient.connect(url, function(err, db){
    if(err) throw err;
    var dbo = db.db("estore");

    // create collection name clothes
    dbo.createCollection("Userinfo", function(err, res){
        if(err) throw err;
        console.log("collection created!!!");
        db.close();
    });
});

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

},
(err) => {
    if(err){
        console.log(err);
    }
    else{
        console.log("Connected to MongoDB");
    }
});


// For register 
// servicess.Register("azan", "gims@gmail.com", "123",(res)=>{
//     console.log(res);
//     console.log("res");
// });



// For Get all users
// servicess.GetAllUser();

// My route
app.use("/", login);
app.use("/login", login);
app.use("/about", about);
app.use("/product", product);
app.use("/contact", contact);
app.use("/blog", blog);
app.use("/service", service);
app.use("/cart", cart);
app.use("/home", home);
app.use("/shop", shop);
app.use("/input", input);
app.use("/registration", registration);



app.get("*", function (req, res) {
    res.send("Page not Found");
})

// app.get("/", (req,res)=>{
//     res.sendFile(path.join(__dirname, "index.html"));
// })
// app.get("/about", (req,res)=>{
//     res.sendFile(path.join(__dirname, "about.html"));
// })
// app.get("*", (req,res)=>{
//     res.send("Page not found");
// })

// console.log(path_to_file);
// const server = http.createServer(function(req,res){
//     console.log(req.url);
//     if(req.url == '/'){
//         const path_to_file = path.join(__dirname,"index.html");
//         fs.readFile(path_to_file, function(err,data){
//             res.end(data);
//         })

//     }
//     else if(req.url == '/api/script'){
//         res.writeHead(500, "No error found", "Contect type: text/json");
//         res.end(JSON.stringify(person));
//     }
//     else{
//         res.end("Page not found");
//     }
// })

const port = "5300";
app.listen(port, () => { console.log(`server is  running on http://localhost:${port}`) });

