var Sequelize = require("sequelize");
var sequelize = new Sequelize("chat", "banjolina", "OKOKOK");

var http = require('http');
var mysql = require('mysql');
var querystring = require('querystring');
var request = require('request');

var Message = sequelize.define('messages', {
  userName: Sequelize.STRING,
  id: Sequelize.INTEGER,
  createdAt: Sequelize.DATE,
  content: Sequelize.STRING,
  updatedAt: Sequelize.DATE
});

Message.sync();

var handleRequest = function(request, response) {
  var defaultCorsHeaders = {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
    "access-control-allow-headers": "content-type, accept",
    "access-control-max-age": 10 // Seconds.
  };
  request.setEncoding('utf8');

  var statusCode = 200;

  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "application/json";


  if(request.method === "OPTIONS"){
    response.writeHead(200, headers);
    response.end();
  }
  else if(request.method === 'GET'){
    if(request.url.indexOf('classes')!==-1){
      Message.findAll().success(function(msgs){
        response.writeHead(200, headers);
        // console.log('msgs', msgs);
        response.end(JSON.stringify(msgs));
      });
    }
    else{
      response.writeHead(404, headers);
      response.end();
    }
  }
  else if(request.method === 'POST'){
    console.log('here');
    response.writeHead(200, headers);
    var body = '';
    request.on('data', function(data){
      body += data;
    });
    request.on('end', function(){
      console.log("body: ",body);
      var qsParsedBody = querystring.parse(body);
      console.log(qsParsedBody);
      // var newMessage = Message.build(qsParsedBody);
      var newMessage = Message.build({userName: qsParsedBody.userId, content: qsParsedBody.content});
      newMessage.save().success(function(message){
        response.end(JSON.stringify());
      });
    });
  }
};

var port = 8080;
var ip = "127.0.0.1";

var server = http.createServer(handleRequest);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);