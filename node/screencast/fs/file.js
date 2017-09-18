var fs = require('fs');

fs.readFile(__filename, function (err, data) {
    if (err) {
        console.error(err);
    } else {
        console.log(data);
        console.log(data.toString());
//        data.length;
    }
});


fs.stat(__filename, function (err, stats) {
    console.log(stats.isFile());
    console.log(stats);
})