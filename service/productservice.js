
const product = require("../models/product");

exports.product_obj = {
    product_name: String,
    brand_name: String,
    // path: String,
    type: String,
    price: Number,
    image: String
}

exports.Createproduct = function (obj) {
    return product.create(obj);
}

exports.ReadAllproduct = function () {
    return product.find({})
}

exports.ReadById = function (id) {
    return product.findOne({ _id: id });
}

exports.Updateproduct = function (id, obj) {
    return product.updateOne({ _id: id }, obj);
}

exports.DeleteAllproduct = function () {
    return product.deleteMany({});
}

exports.Deleteproduct = function (id) {
    return product.deleteOne({ _id: id });
}