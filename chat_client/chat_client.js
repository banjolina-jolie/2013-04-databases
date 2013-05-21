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
    contentType: 'text/plain',
    data: JSON.stringify(userMsg),
    success: function(data){
      console.log("Nice POST.");
    },
    error: function(){
      console.log("POST request failed.");
    }
  });
};



// This one below likely needs work.

var displayMessages = function(data) {
  for(var i = 0; i < data.length; i++){
    $litag = $('<li class = "chatMessage"></li>');
    $litag.html(data[i].content);
    $('#userMessages').append($litag);
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




  // for(var i = data.results.length-1; i >= 0; i--) {
  //   if(!memory.hasOwnProperty(data.results[i].objectId)){
  //     memory[data.results[i].objectId] = true;
  //     $litag = $('<li class = "chatMessage"></li>');
  //     $msg = $('<span class="message"></span>');
  //     $msg.text(data.results[i].text);
  //     $username = $('<span class="username" data-username="' + data.results[i].username + '"></span>');
  //     $username.text(data.results[i].username);
  //     $createdDate = $('<span class="createdAt"></span>');
  //     $createdDate.text(moment(data.results[i].createdAt).fromNow());
  //     $litag.append($username,": ",$msg," -- ",$createdDate);
  //     $('#userMessages').append($litag);
  //     $('#main ul').animate({ scrollTop: $('#main ul').prop("scrollHeight") - $('#main ul').height() }, 1);
  //   }
  // }