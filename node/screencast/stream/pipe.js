var http = require('http');
var fs = require('fs');


new http.Server(function (req, res) {
    if (req.url === '/big.html') {

        var file = new fs.ReadStream('big.html');
//        sendFile(file, res);
        sendFilePipe(file, res);
//        fs.readFile('big.html',function(err,content){
//            if(err){
//                res.statusCode = 500;
//                res.end('Server error');
//            }else{
//                res.setHeader('Content-Type','text/html; charset=utf-8');
//                res.end(content);
//            }
//        });
    }
}).listen(3000);

function sendFilePipe(file, res) {
    file.pipe(res);
//    file.pipe(process.stdout);

    file.on('error', function (err) {
        res.statusCode = 500;
        res.end('Server Error');
        console.error(err);
    });

    file.on('open', function () {
        console.log('open');
    }).on('close', function () {
        console.log('close');
    });
    
    
    res.on('close', function () {
        file.destroy();
    });
}



function sendFile(file, res) {
    file.on('readable', write);
    function write() {
        var fileContent = file.read();
        if (fileContent && !res.write(fileContent)) {
            file.removeListener('readable', write);
            res.once('drain', function () {
                file.on('readable', write);
                write();
            });
        }
//        res.write(fileContent);
    }
    file.on('end', function () {
        res.end();
    });

}