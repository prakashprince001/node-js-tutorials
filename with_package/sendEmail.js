var nodeMailer = require('nodemailer');
var transport = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'prakash.carpenter@techinfini.com',
        pass: ''
    }
});
var mailOptions = {
    from: 'prakash.carpenter@techinfini.com',
    to: 'prakash.carpenter@techinfini.com',
    subject: 'This is test mail',
    text: 'Hello, This mail come from node js nodmailer package(npm i nodemailer).'
};
transport.sendMail(mailOptions, function(err, info) {
    if (err) {
        console.log('failed');
        console.log(err);
    } else {
        console.log('Email has been sent.', info.response);
    }
});