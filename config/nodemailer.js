const nodeMailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const env = require('../config/environment')
const { realpath } = require('fs');
let transpoter = nodeMailer.createTransport
( //we use smtp config to send mail to remote user via smtp
 env.smtp
);

let renderTemplete = function (data, relativePath) {
    let mailHtml;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),data,
        function (err, templete) {
            if (err) {
                console.log('error in rendering templete',err);
                return;
            }
            mailHtml = templete;
        }
        )
        return mailHtml;
}
module.exports={
    transpoter:transpoter,
    renderTemplete:renderTemplete
}