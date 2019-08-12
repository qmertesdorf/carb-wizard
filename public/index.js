$(document).ready(function() {
  $("#server-input").keypress(function(event) {
    if (event.which == 13) {
      searchUser();
    }
  });
});

function searchUser() {
  let serverInput = $("#server-input").val();

  let settings = {
    url: "/carbs",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({ query: serverInput })
    // '{\r\n "query":"' + serverInput + '",\r\n "timezone": "US/Eastern"\r\n}'
  };

  $.ajax(settings).done(function(response) {
    let display = response.totalCarbs;
    $("#display").html(display);
  });
}
