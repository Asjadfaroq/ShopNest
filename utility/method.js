const path = require("path");
const fs = require("fs");
exports.getviewpath = function (controllername, viewname) {
        const dirname = path.join(__dirname, '../views');
        return path.join(dirname, path.join(controllername, viewname));
}

exports.CheckSession = function (req) {
        if (req.session.user == undefined) {
                return req.redirect("/login");
        }
}

exports.SaveFile = function (current_path, new_path) {
        return fs.copyFile(current_path, new_path, (err) => {
                // if (err) throw err;
                console.log("File uploaded");
        })
}