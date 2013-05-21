var http = require('http');
var mysql = require('mysql');
var querystring = require('querystring');
var request = require('request');


var dbConnection = mysql.createConnection({
  user: "root",
  password: "",
  database: "chat"
});

dbConnection.connect();

/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/

/* You already know how to create an http server from the previous
 * assignment; you can re-use most of that code here. */


 exports.handleRequest = function(request, response) {

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
      dbConnection.query('SELECT * FROM messages', function(err, results){
        response.writeHead(200, headers);
        response.end(JSON.stringify(results));
      });
    }
    else{
      response.writeHead(404, headers);
      response.end();
    }
  }
  else if(request.method === 'POST'){
    response.writeHead(302, headers); // Doesn't happen after 'end' event (async)
    var body = '';
    request.on('data', function(data){
      body += data;
    });
    request.on('end', function(){
      var qsParsedBody = querystring.parse(message);
      dbConnection.query("INSERT INTO messages (content, userId) VALUES (?, ?);", [qsParsedBody.message, qsParsedBody.userId], function(){
        console.log(arguments);
        response.end('\n');
      });
    });
  }
};

//dbConnection.end();
