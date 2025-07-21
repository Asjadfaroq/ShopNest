// let userinfo = {
//     email: "asjadfarooq22@gmail.com",
//     password: "asjad"
// };


// function verifyUser(email, password) {
//     if(email === "asjadfarooq22@gmail.com" && password === "asjad"){
//         userinfo['valid'] = true;
//         return userinfo;
//     }
//     else{
//         let obj = { valid: false, msg: 'Invalid username or password' }
//         return obj;
//     }
// }


// function Register(name, email, password){
//     console.log(name, email, password);
// }

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user_data = new Schema({
    name: String,
    email:String,
    password: String,
    profileimage: String,
    CreateAt: {
        type: Date,
        default: Date.now()
    }

})

module.exports = mongoose.model("Userinfo", user_data);