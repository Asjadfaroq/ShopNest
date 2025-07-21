const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const product = require("../service/productservice");
const { CheckSession, SaveFile } = require("../utility/method");
const formidable = require("formidable");
const fs = require('fs');


obj = {
    title: "Product",
    ErrorMsg: "",
    user: undefined,
    products : []
}

router.get("/", async(req, res) => {
    //  CheckSession(req);
    // obj.user = req.session.user;
    obj.products = await product.ReadAllproduct();
    if(req.session.user != undefined){
        res.render("product/index.ejs", {... obj});
    }
    else{
        res.redirect('/login');
    }

    

})
router.post("/add", async (req, res) => {
    const formdata = new formidable.IncomingForm();

    formdata.parse(req, async (err, fields, files) => {
        // const product_path = files.product.filepath;
        const image_path = files.image.filepath;
        // SaveFile(product_path, __dirname + "/../public/uploads/products/" + files.product.originalFilename)
        SaveFile(image_path, __dirname + "/../public/uploads/productimages/" + files.image.originalFilename)

        product.product_obj.image = files.image.originalFilename;
        // product.product_obj.path = files.product.originalFilename;
        product.product_obj.price = fields.price;
        product.product_obj.brand_name = fields.brand_name;
        product.product_obj.product_name = fields.product_name;
        product.product_obj.type = fields.type;

        const r = await product.Createproduct(product.product_obj);
        res.redirect("/product");
    })  
})
router.post("/update/:id", async (req, res) => {
    const formdata = new formidable.IncomingForm();

    formdata.parse(req, async (err, fields, files) => {
        // const product_path = files.product.filepath;
        const image_path = files.image.filepath;
        // SaveFile(product_path, __dirname + "/../public/uploads/products/" + files.product.originalFilename)
        SaveFile(image_path, __dirname + "/../public/uploads/productimages/" + files.image.originalFilename)

        product.product_obj.image = files.image.originalFilename;
        // product.product_obj.path = files.product.originalFilename;
        product.product_obj.price = fields.price;
        product.product_obj.brand_name = fields.brand_name;
        product.product_obj.product_name = fields.product_name;
        product.product_obj.type = fields.type;

        const r = await product.Updateproduct(req.params.id, product.product_obj);
        res.redirect("/product");
    })  
})
router.get("/delete",async (req,res)=>{
    console.log(req.query);
    let r = await product.Deleteproduct(req.query.id)
    res.redirect("/product");
})
router.get("/read/:id",async (req,res)=>{
    console.log(req.params);
    let r = await product.ReadById(req.params.id);
    console.log(r);
    res.json(r);
    // let r = await product.Deleteproduct(req.query.id)
    // res.redirect("/product");
})
module.exports = router;
