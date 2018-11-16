$(document).ready(function(){
  $("#register").click(function(){
      var myobj = {Name:$("#name").val(),Password:$("#password").val()};
      jobj = JSON.stringify(myobj);
      console.log(myobj);
      
    var url = "user";
        $.ajax({
        url:url,
        type: "POST",
        data: jobj,
        contentType: "application/json; charset=utf-8",
        success: function(data,textStatus) {
            console.log("successful post");
        }
    });
  });
  
  $("#login").click(function() {
    var url = 'user/'+$("#loginname").val();
    $.getJSON(url, function(data) {
      for(var user in data) {
        user = data[user];
        if ($("#loginpassword").val() == user.Password) {
            var x = document.getElementById("finished");
              if (x.style.display === "none") {
                  x.style.display = "block";
              } else {
                  x.type = "block";
              }
        } else {
           $("#done").html("Failure!");
           $("#done").attr('class','card align-items-center bg-danger text-white');
        }
      }
     
    });
  });
  
  $("#deleteUsers").click(function() {
     $.get('delete', function() {
     });
  });
});

function showPass() {
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
    var y = document.getElementById("loginpassword");
    if (y.type === "password") {
        y.type = "text";
    } else {
        y.type = "password";
    }
}
