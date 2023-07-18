const Mail = require('nodemailer/lib/mailer');
const nodeMailer=require('../config/nodemailer');
//this is another way of  exporting method
exports.newComment=(comment)=>{
    let htmlString=nodeMailer.renderTemplete({comment:comment},'/comments/new_comment.ejs');
    console.log('inside newComment mailer',htmlString);
    nodeMailer.transpoter.sendMail({
        from:'easywayforweb@gmail.com',
        to:comment.user.email,
        subject:'New comment Published!',
        html:htmlString
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