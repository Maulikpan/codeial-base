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
             let newPost=newPostDom(data.data.post);
             $('#posts-list-container').prepend(newPost);  // prepend is  jquery function to append at first position
            },
            error:function(error){
                console.log(error.responseText);
            }
          });
        });
    }
    createPost();

    //method to create a post in DOM 
    let newPostDom=function(post)
    {
      return  $(`<div id="main-container  post-${post._id}" style="border: 2px red solid; width: 100%  ;">
      <p>
          <small>
              <a  class="delete-post-button" href="/posts/destroy/${post._id}"><button>Delete post</button></a>   
          </small>
          ${post.content}
     <br>
     <small>${post.user.name}</small>
  </p>
  <div class="post-comments}">
          <form action="/comments/create" method="POST" >
              <input type="text" name="content" placeholder="Type a comment..." required>
              <input type="hidden" name="post" value=<%=post._id%>>
              <input type="submit"  value="Add Comment" >  
          </form>
      </div>
      <div class="post-comments-list">
          <ul id="post-comments-${post._id}">
              </ul>
          </div>
          </div>`)
    }