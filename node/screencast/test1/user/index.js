var db = require('db');
//db.connect();

var log = require('logger')(module);

function User(name){
    this.name = name;
}

User.prototype.hello = function(who){
    log(db.getPhrase('hello')+" " + who.name);
}

//module.exports = User;

exports.User = User;