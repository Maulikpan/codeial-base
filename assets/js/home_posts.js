    //method to submit the form data for new post using AJAX /jquery 
    let createPost=function()
    {
        let newPostForm=$('#new-post-form');
        newPostForm.submit(function(e)
        {
          e.preventDefault();
          $.ajax({
            type:'post',
            url:'/posts/create',
            data:newPostForm.serialize(),  //convert into json //function of jquery library //this data is pass to the req.body 
            success:function(data){
             console.log(data);
            },
            error:function(error){
                console.log(error.responseText);
            }
          });
        });
    }
    //method to create a post in DOM 
    createPost();