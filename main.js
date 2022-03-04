$(document).ready(function(){
  
  $("#button").click(function(){ 
    $.get("https://api.github.com/users/" + $("#user1").val(), function(github){
      
      $("#picture").attr("src", github.avatar_url);
      $("#user2").text("Username: " + github.login);

      if(github.name == null){$("#name").text("Name: ---");} else{$("#name").text("Name: " + github.name);}
      if(github.location == null){$("#location").text("Location: ---");} else{$("#location").text("Location: " + github.location);}

      $("#following").text("Following: " + github.following);
      $("#followers").text("Followers: " + github.followers);
    });
    
    $("#table tbody tr").remove();
  
    $.get("https://api.github.com/users/" + $("#user1").val() + "/repos", function(github){
      
      $.each(github, function(i, github){
        
          repositories = github.name;
          if(github.description == null){description = "No description.";} else{description = github.description;}
          stargazers = github.stargazers_count;

          prep = "<tr> <td>" + repositories + "</td> <td>" + description + "</td> <td>" + stargazers + " followers" + "</td> </tr>";
          $("#table").append(prep);
      });
    });
  });
});
