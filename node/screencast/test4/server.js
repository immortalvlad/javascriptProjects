var http = require('http');
var fs = require('fs');



http.createServer(function (req, res) {
    if (req.url === '/') {
        fs.readFile('index.html', function (err, info) { 
            if (err) {
                console.error(err);
                res.sendStatus(500);
                res.end('На сервере произошла ошибка' + err);
                return;
            }
            res.end(info);
        });
    } else {
        res.end('end');
    }
}).listen(3000);

