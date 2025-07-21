const user_data = require("../models/users");

function Register(name, email, password, newpath) {
    // console.log("asjad");
    return user_data.create({ email: email, password: password, name: name, profileimage: newpath })

    console.log(name, email, password);
}

function verifyUser(email, password) {
    let userinfo = { valid: false, msg: 'Invalid Username or password' };

    return user_data.findOne({ email: email, password: password }, "email name profileimage").then(res => {
        if (res != null) {
            userinfo['valid'] = true;
            userinfo['msg'] = "User logged in";
            userinfo['data'] = res;
            return userinfo;
        }
        else {
            return userinfo;
        }
    })

}



function GetAllUser() {
    user_data.find({ name: "azan" }, "name email password", (err, res) => {
        console.log(res);
    })
}
module.exports = { Register, GetAllUser, verifyUser };