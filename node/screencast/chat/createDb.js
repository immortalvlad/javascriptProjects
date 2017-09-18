///------------Expmple 1 Native mongods----------------------//
////var MongoClient = require('mongodb').MongoClient;
//
//// Connection URL
//var url = 'mongodb://localhost:27017/chat';
//// Use connect method to connect to the Server
//MongoClient.connect(url, function (err, db) {
//    if (err)
//        throw err;
//    console.log("Connected correctly to server");
//    insertDocuments(db, function () { 
//        findDocuments(db, function () {
//            db.close();
//        });
//    });
//});
//
//var insertDocuments = function (db, callback) {
//    // Get the documents collection
//    var collection = db.collection('documents');
//    // Insert some documents
//    collection.insertMany([
//        {a: 1}, {a: 2}, {a: 3}
//    ], function (err, result) {
//        console.log("Inserted 3 documents into the document collection");
//        callback(result);
//    });
//};
//
//var findDocuments = function (db, callback) {
//    // Get the documents collection
//    var collection = db.collection('documents');
//    // Find some documents
//    collection.find({}).toArray(function (err, docs) {
//        console.log("Found the following records");
//        console.dir(docs);
//        callback(docs);
//    });
//}
///------------Expmple 2----------------------//
//var mongoose = require('mongoose');
//mongoose.Promise = require('bluebird');
//mongoose.connect('mongodb://localhost/chat', {
//    useMongoClient: true
//});
//var schema = mongoose.Schema({
//    name:String
//});
//schema.methods.meow = function(){
//    console.log(this.get('name'));  
//};
//
//var Cat = mongoose.model('Cat', schema);
//
//var kitty = new Cat({name: 'Zildjian'});
//kitty.save(function (err, kitty, affected) {
//    if (err) {
//        console.log(err);
//    } else {
//        console.log(arguments);
//        kitty.meow();
//    }
//});
//-------------------Example 3------------------
//var User = require('models/user').User;
//
//var user = new User({
//    username: "Tester",
//    password: "secret"
//});
//
//user.save(function (err, user, affected) {
//    if (err)
//        throw err;
////    console.log(arguments);
//});
//---------------Example 4----------------------
var mongoose = require('libs/mongoose');
var async = require('async');

async.series([
    open,
    dropDatabse,
    requireModels,
    createUsers
], function (err, results) {
    console.log(arguments);
    mongoose.disconnect();
});

function open(callback) {
    mongoose.connection.on('open', callback);
}
function dropDatabse(callback) {
    var db = mongoose.connection.db;
    db.dropDatabase(callback);
}
function requireModels(callback) {
    require('models/user');
    async.each(Object.keys(mongoose.models), function (modelName, callback) {
        mongoose.models[modelName].ensureIndexes(callback);
    }, callback);
}
function createUsers(callback) {

    var users = [
        {username: 'Vasya', password: 'supervasya'},
        {username: 'Petya', password: '123'},
        {username: 'admin', password: '123'}
    ];
    async.each(users, function (userData, callback) {
        var user = new mongoose.models.User(userData);
        user.save(callback);
    }, callback);
//    async.parallel([
//        function (callback) {
//            var vasya = new User({username: 'Vasya', password: 'supervasya'});
//            vasya.save(function (err) {
//                callback(err, vasya);
//            });
//        },
//        function (callback) {
//            var petya = new User({username: 'Petya', password: '123'});
//            petya.save(function (err) {
//                callback(err, petya);
//            });
//        },
//        function (callback) {
//            var admin = new User({username: 'admin', password: '123'});
//            admin.save(function (err) {
//                callback(err, admin);
//            });
//        }
//    ], callback);
}
