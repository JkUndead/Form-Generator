var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'murdochformflow@gmail.com',
        pass: 'formflow111'
    }
});

module.exports = transporter; 