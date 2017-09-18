var http = require('http');
var fs = require('fs');

//var server  = new http.Server();

//server.on('request',function(req,res){
//    console.log('req');
//    res.end('re');
//});

//server.listen(3000);
var server = new http.Server(function (req, res) {
}).listen(3000);


setTimeout(function () {
    server.close();
}, 2500);


var timer = setInterval(function () {
    console.log(process.memoryUsage());
},1000);

timer.unref();
