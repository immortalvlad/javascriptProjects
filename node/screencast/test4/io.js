var fs = require('fs');
setTimeout(()=>( console.log("setTimeout")),0);

fs.open('./index.html', 'r', function (err, file) {
    console.log('IO!');
});

setImmediate(function(){
    console.log("immediate");
});

process.nextTick(function(){
    console.log("nextTick");
});
