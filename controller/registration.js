const express = require("express");
const router = express.Router();

// Module  for file uploading 
const formidable = require('formidable');
const fs = require('fs');
const { Register } = require("../service/user_subscriberservice");

const obj = { title: "Registration Page", isError: false, msg: "", user: undefined};

//Module for Email sending
var utils = require('../utils');


router.get("/", (req, res) => {
  
        res.render("usermanage/registration", {...obj});
 
    // else{
    //     res.redirect('/login');
    // }
   
});


// code for file uploading
router.post("/", function(req,res){
    console.log(req.body);
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
        var oldpath = files.image.filepath;
        console.log(__dirname);
        var newpath = __dirname + "/../uploads/" + files.image.originalFilename;

        console.log(oldpath);
        console.log(newpath);
        fs.rename(oldpath,newpath,(err)=>{
            if (err) throw err;
            console.log("File Uploaded");
        })

        console.log(files);
        console.log(fields);
    })

    res.render("usermanage/registration",{obj});
});



// code for email sending
router.post("/", (req, res) => {
    utils.SendMail(["asjadfarooq22@gmail.com"], "New Account Registration", "<h1>Welcome to our site</h1> To visit out site click on <a href='http://localhost:5300/'>link</a>").then((err, info) => {
        if (err.accepted.length > 0) {
            res.render("usermanage/registration", obj);
        }
        else {
            res.send(err);
        }

    });

})

router.post("/register", (req, res)=>{
    var form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files)=>{
        if(files.image.originalFilename != ""){
            var oldpath = files.image.filepath;
            var new_path = __dirname + "/../uploads/images/" + files.image.originalFilename;
            fs.copyFile(oldpath, new_path, (err)=>{
                if(err) {
                    obj.isError = true;
                    obj.msg = "File is not Uploaded";
                    res.render("usermanage/registration", {...obj});
                }
            })
        }
        console.log(fields);
        let name = fields.name;
        let email = fields.Email;
        let pass = fields.pass;
        let cpass = fields.cpass;

        if(cpass != pass){
            obj.isError = true;
            obj.msg = "Password mismatch";
            console.log(obj.msg);
            res.render("usermanage/registration", {...obj});
        }
        else{
            Register(name, email, pass, new_path).then((r)=>{
                console.log(r);
                obj.isError = false;
                obj.msg = "New User Account is Created";
                res.render("usermanage/registration", {...obj});

            }, err => {
                obj.isError = true;
                obj.msg = err;
                res.render("usermanage/registration", {...obj});
            })
        }
    });
})



module.exports = router;