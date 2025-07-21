const express = require("express");
// const path = require("path");
const router = express.Router();

const obj = {
    title : 'Cart Page', 
    user: undefined 
}

router.get("/", (req,res)=>{

    if(req.session.user != undefined){
        res.render("cart/index",obj);
    }
    else{
        res.redirect('/login');
    }
    
})

module.exports = router;