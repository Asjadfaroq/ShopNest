const express = require("express");
const router = express.Router();

const obj = {
    title : 'Service Page', 
    user: undefined 
}

router.get("/",(req,res)=>{
    if(req.session.user != undefined){
        res.render("service/index",obj);
    }
    else{
        res.redirect('/login');
    }
   
});

module.exports = router;