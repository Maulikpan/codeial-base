const queue = require('../config/kue');
const  resetpassword_mailer=require('../mailers/resetpassword_mailer');

queue.process('resetPassword',function(job,done){
    console.log('reset password token  worker processing a job',job.data);
    resetpassword_mailer.newToken(job.data); //sending a emails that is in queue
    done(); //Notify the queue that the job has been processed
})