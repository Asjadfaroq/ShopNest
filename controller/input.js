const { render } = require("ejs");
const express = require("express");
const router = express.Router();
const {body, validationResult} = require("express-validator");

const obj = {
    title : 'Input Page', 
    user: undefined 
}

function calculate_sum(){
    let string = "";
    let sum = 0;
    for(let param in body){
        string += param + " = " + param[body] + " } ";
        total += Number(param[body]);
    }
    return string;
}

router.get("/", (req, res)=>{
    let string = "";
    res.render("input/index",obj,string);
});

router.get("/add",(req,res) => {
    let string = "";
    res.render("input/index",obj,string);
});


router.post(
    "/add",
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isStrongPassword({min: 6, max: 15}),
    (req,res) => {
         const error = validationResult(req);
         var string = "";
         if(error.errors.length != 0){
            let string = error;
            console.log(string);
            return res.render("input/index", obj,string);
         }

         string = calculate_sum(req.body);
        res.render("input/index",string,obj);
    }
)
module.exports = router;