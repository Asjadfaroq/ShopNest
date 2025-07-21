var nodemailer = require('nodemailer');
exports.SendMail = function(to,subject,body){
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'asjadf56@gmail.com',
            pass: 'ngjkfcmvvevyikqf'
        }
    });

    const options = {
        from: 'asjadf56@gmail.com',
        to: to,
        subject: subject,
        html: body
    }

    return transport.sendMail(options);
}