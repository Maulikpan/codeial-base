const queue = require('../config/kue');
const  commentsMailer=require('../mailers/comment_mailer');

queue.process('emails',function(job,done){
    console.log('emails worker processing a job',job.data);
    commentsMailer.newComment(job.data); //sending a emails that is in queue
    done(); //Notify the queue that the job has been processed
})

//email name queue has enque operation perform when some comment has generated