$(document).ready(function(){
    
    $('#serverInput').keypress(function(event){
        if(event.which == 13) {
            searchUser();
        } 
    });        
});

function searchUser(){
    // var userInput = $("#userInput").val();
    let serverInput = $("#serverInput").val();

let settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://trackapi.nutritionix.com/v2/natural/nutrients",
  "method": "POST",
  "headers": {
    "x-app-id": "5cdae105",
    "x-app-key": "deb0d2e28997abff65ae692e5c1dc034",
    "content-type": "application/json",
    "cache-control": "no-cache",
  },
  "processData": false,
  "data": "{\r\n \"query\":\""+serverInput+"\",\r\n \"timezone\": \"US/Eastern\"\r\n}"
}

$.ajax(settings).done(function (response) {
  console.log(response.foods[1]);
  let display = "";
  if (!response.foods[1]) {
        display = response.foods[0].nf_total_carbohydrate
  } else {
        display = response.foods.reduce(function(acc, nextVal){
            return ((acc.nf_total_carbohydrate || acc) + nextVal.nf_total_carbohydrate);
        });      
  }
  $("#display").html(display);
});        
}
        

