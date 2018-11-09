$(document).ready(function(){
  $("#postComment").click(function(){
      var myobj = {Name:$("#name").val(),Comment:$("#comment").val()};
      jobj = JSON.stringify(myobj);
      
    var url = "comment";
        $.ajax({
        url:url,
        type: "POST",
        data: jobj,
        contentType: "application/json; charset=utf-8",
        success: function(data,textStatus) {
            $("#done").html(textStatus);
        }
    });
  });
  
  $("#getComments").click(function() {
    $.getJSON('comment', function(data) {
      var everything = `<ul class="list-group list-group-flush">`;
      for(var comment in data) {
        com = data[comment];
        everything += `<li class="list-group-item"> Name: ` + com.Name + " -- Comment: " + com.Comment + "</li>";
      }
      everything += "</ul>";
      $("#comments").html(everything);
    });
  });
  
  $("#getUserComments").click(function() {
    var url = 'comment/'+$("#name").val();
    $.getJSON(url, function(data) {
      $("#comments").html("");
      var everything = `<ul class="list-group list-group-flush">`;
      for(var comment in data) {
        com = data[comment];
        everything += `<li class="list-group-item"> Name: ` + com.Name + " -- Comment: " + com.Comment + "</li>";
      }
      everything += "</ul>";
      $("#comments").html(everything);
    });
  });
  
  
  
  $("#deleteComments").click(function() {
     $.get('delete', function() {
        $("#comments").html(" ");
     });
  });
});