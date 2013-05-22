var memory = {};

var receiveIt = function(){
  $.ajax('http://127.0.0.1:8080/classes/room1', {
    contentType: 'application/json',
    success: function(data){
      displayMessages(data);
    },
    error: function(){
      console.log("GET request failed.");
    }
  });
};


var postIt = function(userMsg){
  $.ajax('http://127.0.0.1:8080/classes/room1', {
    type: "POST",
    // contentType: 'application/json',
    //data: JSON.stringify(userMsg),
    data: userMsg,
    success: function(data){
      console.log("Nice POST.");
    },
    error: function(err){
      console.log('what?');
      console.log("POST request failed.", err);
    }
  });
};


var displayMessages = function(data) {
  for(var i = 0; i < data.length; i++){
    if(!memory.hasOwnProperty(data[i].content)){
      memory[data[i].content] = true;
      $litag = $('<li class = "chatMessage"></li>');
      $litag.html(data[i].content);
      $('#userMessages').append($litag);
    }
  }
};

$(document).ready(function(){
  $('#sendMsg').on('click',function(){
    var msg = {
      userId: 'Me_of_course',
      content: $('#writeMsg').val()
    };
    postIt(msg);
  });

  setInterval(receiveIt, 2000);
});
