const express = require("express");
const { body, validationResult } = require("express-validator");
const { verifyUser, Register } = require("../service/user_subscriberservice");
const router = express.Router();
const mongoose = require('mongoose');

res = {
    title : "Login",
    isError: false,
    msg: '',
    user: undefined
}

// function calculate_sum(){
//     let string = "";
//     let sum = 0;
//     for(let param in body){
//         string += param + " = " + param[body] + " } ";
//          total += Number(param[body]);
//     }
//     return string;

// }

router.get("/",(req,sres)=>{
    if(req.session.user != undefined){
        return sres.redirect("/home");
    }
    let  errors = req.session.errors;
    req.session.errors = undefined;
    console.log(errors);
    sres.render("usermanage/login",{...res, errors: errors});
});


router.post(
    "/auth",
    body("email").isEmail().withMessage("Invalid Email"),
    async (req,res)=>{
        const error = validationResult(req);
        if(error.errors.length != 0){
            req.session.error = error.errors;
            return res.redirect("/login");
        }

        let obj = await verifyUser(req.body.email, req.body.password)
        if(obj['valid']){
            req.session.error = undefined
            req.session.user = obj['data'];
            return res.redirect("/")
        }
        else{
            req.session.errors = [{value: '', msg: obj.msg, param: '',location:''}];
            res.redirect("/login");
        }
        
    }
);

router.get("/logout", (req,res)=>{
    req.session.destroy();
    res.redirect("/login");
})

module.exports = router;