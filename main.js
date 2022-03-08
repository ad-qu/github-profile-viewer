$(document).ready(function(){
  
  $("#button").click(function(){ 

    $("#table").show();
    $("#table tbody tr").remove();

    $.ajax({
      type: 'GET',
      url: 'https://api.github.com/users/'+ $("#user1").val(),
      data: { get_param: 'value' },
      dataType: 'json',
      success: function(json)
      {
        
        $("#picture").attr("src", json.avatar_url);
        $("#user2").text("Username: " + json.login);
  
        if(json.name == null){$("#name").text("Name: ---");} else{$("#name").text("Name: " + json.name);}
        if(json.location == null){$("#location").text("Location: ---");} else{$("#location").text("Location: " + json.location);}
  
        $("#following").text("Following: " + json.following);
        $("#followers").text("Followers: " + json.followers);
      }
    });

    $.ajax({
      type: 'GET',
      url: 'https://api.github.com/users/'+ $("#user1").val() + '/repos',
      data: { get_param: 'value' },
      dataType: 'json',
      success: function(json)
      {
        var count = 0;

        $.each(json, function(index, github){
        
          repositories = github.name;
          if(github.description == null){description = "No description.";} else{description = github.description;}
          stargazers = github.stargazers_count;

          prep = "<tr> <td>" + repositories + "</td> <td>" + description + "</td> <td>" + stargazers + " followers" + "</td> </tr>";
          $("#table").append(prep);

          count++;
        });

        if(count == 0){ $("#table").hide(); }
      },

      error: function(json)
      {
        $("#picture").attr("src", "https://avatars.githubusercontent.com/u/583231?v=4");
        $("#user2").text("Username: Example");
        $("#name").text("Name: OctoCat");
        $("#location").text("Location: GitHub, Internet");
        $("#following").text("Following: 1");
        $("#followers").text("Followers: 56 millions");

        prep = "<tr> <td>Example 1</td> <td>This is an example to see how this page will look like.</td> <td>3 followers</td> </tr>";
        $("#table").append(prep);

        prep = "<tr> <td>Example 2</td> <td>Enter a username to view another profile.</td> <td>7 followers</td> </tr>";
        $("#table").append(prep);

        prep = "<tr> <td>Example 3</td> <td>No description.</td> <td>5 followers</td> </tr>";
        $("#table").append(prep);
      }
    });
  });
});

  
