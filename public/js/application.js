 // <article id="<%= post.id %>">
 //      <a href='/posts/<%= post.id %>/vote' class="fa fa-sort-desc vote-button"></a>
 //      <h2><a href='/posts/<%= post.id %>'><%= post.title %></a></h2>
 //      <p>
 //        <span class='points'><%= post.points %></span>
 //        <span class='username'><%= post.username %></span>
 //        <span class='timestamp'><%= post.time_since_creation %></span>
 //        <span class='comment-count'><%= post.comment_count %></span>
 //        <a class="delete" href='/posts/<%= post.id %>'></a>
 //      </p>
 //    </article>

 $(document).ready(function(){
  $('article').on('click', '.vote-button', function(event){
    event.preventDefault();

    var url = $(this).attr('href');
    
    var request = $.ajax({
      url: url,
      type: 'get',
      dataType: "json",
    })

    .done(function(response){
      var selector = "#" + response.article_id;
      $(selector).find(".points").text(response.votes);
    })

    .fail(function(response){
      console.log("Something's wrong", response.error);
    });

  });


  $('article').on('click', '.delete', function(event){
    event.preventDefault();

    var url = $(this).attr('href');
    
    var request = $.ajax({
      url: url,
      type: 'delete',
      dataType: "json",
    })

    .done(function(response){
      var selector = "#" + response.article_id;
      $(selector).remove();
    })

    .fail(function(response){
      console.log("Something's wrong", response.error);
    });

  });
 });