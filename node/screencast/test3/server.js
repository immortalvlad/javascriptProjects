var http = require('http');
var url = require('url');
//http://127.0.0.1:1337/echo?message=Hello
var server = new http.Server(function (req, res) {
    console.log(req.method, req.url);
    var urlParsed = url.parse(req.url, true);
    console.log(urlParsed);
    if (urlParsed.pathname === '/echo' && urlParsed.query.message) {
        res.setHeader('Cache-control','no-cache');
        res.end(urlParsed.query.message);
    }else{
        res.statusCode = 404;
        res.end('Page not found111');
    }
});

server.listen(1337, '127.0.0.1');
