const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const product = new Schema({
    product_name : { type:String , required:true } ,
    brand_name:{ type:String , required:true },
    // path : {type:String ,required:true },
    type : {type:String , default : 'Free' },
    price : {type:Number , default : 0 },
    image : {type:String , default :"default_music.png" },
    CreateAt : {
        type : Date,
        default : Date.now()
    }
})

module.exports = mongoose.model("product",product);