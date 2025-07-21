const express = require("express");
const router = express.Router();

const obj = {
    title : 'Contact Page', 
    user: undefined 
}

router.get("/", (req,res)=>{

    if(req.session.user != undefined){
        res.render("contact/index",obj);
    }
    else{
        res.redirect('/login');
    }
    
});

module.exports = router;
