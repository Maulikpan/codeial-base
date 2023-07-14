const Mail = require('nodemailer/lib/mailer');
const nodeMailer=require('../config/nodemailer');
//this is another way of  exporting method

exports.newComment=(comment)=>{
    console.log('inside newComment mailer',comment);
    nodeMailer.transpoter.sendMail({
        from:'maulikpanchal1811@gmail.com',
        to:comment.user.email,
        subject:'New comment Published!',
        html:`<h1>Yup,your comment is now published</h1>
              <small style="color:red;">${comment.content}</small>`
    },(err,info)=>{
     if(err)
     {
        console.log('error in sending mail',err)
        return;
     }
     console.log('Message sent',info);
     return;
    });
}