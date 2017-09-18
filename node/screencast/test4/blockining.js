var http = require('http');
var fs = require('fs');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function sleepFor( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ 
    } 
}

http.createServer(function (req, res) {
    var info;
    if (req.url === '/') {
//        info = fs.readFileSync('index.html');
        res.end('start');
        res.end(info);
    } else {
        sleepFor(5000);
        res.end('end');
//        sleep(5000).then(() => {
//            res.end('end');
//        });
    }
}).listen(3000);

