const express = require("express");
const router = express.Router();

const obj = {
    title : 'Shop Page', 
    user: undefined 
}

router.get("/",(req,res)=>{
    if(req.session.user != undefined){
        res.render("shop/index",obj);
    }
    else{
        res.redirect('/login');
    }
    
});

module.exports = router;