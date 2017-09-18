var db = require('db');
var util = require('util');
var error = require('./error');
db.connect();
var user = require('./user');
//console.log(process.env.NODE_PATH);
var log = require('logger')(module);

log(db.getPhrase("run succcess"));

var vasya = new user.User("Vasya");
var petya = new user.User("Petya");

vasya.hello(petya);
try {
    var page = db.makePage('index.html');
    console.log(page);
} catch (e) {
    if(e instanceof error.HttpError){
        console.log(e.status, e.message);
    }else{
        console.error("Ошибка %s\n сообщение: %s\n стек: %s",e.name,e.message, e.stack);
    }
}


