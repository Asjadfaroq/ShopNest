const express = require("express");
const router = express.Router();

const obj = {
    title : 'Blog Page', 
    user: undefined 
}

router.get("/",(req,res)=>{

    if(req.session.user != undefined){
        res.render("blog/index",obj);
    }
    else{
        res.redirect('/login');
    }
    
});

module.exports = router;