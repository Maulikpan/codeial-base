const Mail = require('nodemailer/lib/mailer');
const nodeMailer = require('../config/nodemailer');
exports.newToken = (newTokens) => {
  console.log(newTokens);
  let htmlString = nodeMailer.renderTemplete({ newTokens: newTokens }, '/reset_password/reset_password.ejs');
  nodeMailer.transpoter.sendMail({
    from: 'easywayforweb@gmail.com',
    to: newTokens.user.email,
    subject: 'Reset Your password from here!',
    html: htmlString
  }, (err, info) => {
    if (err) {
      console.log('Error in sending mail', err);
      return;
    }
    console.log('Message sent', info);
    return;
  });
};
