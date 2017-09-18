var mongoose = require('libs/mongoose');
var Promise = require("bluebird");

mongoose = Promise.promisifyAll(mongoose);

var con = new Promise(function (resolve, reject) {
    mongoose.connection.on('open', function () {
        console.log('ON open');
    }).then(function () {
        var db = mongoose.connection.db;
        db.dropDatabase().then(function () {
            console.log('droped');
            require('models/user');
            mongoose.models.User.ensureIndexes().then(function () {

                function createUsers() {
                    var users = [
                        {username: 'Vasya', password: 'supervasya'},
                        {username: 'Petya', password: '123'},
                        {username: 'admin', password: '123'}
                    ];
                    var results = [];
                    users.map(function (item) {
                        var pr = new Promise(function (resolve, reject) {
                            var user = new mongoose.models.User(item);
                            user.save().then(function () {
                                console.log('save');
                                resolve();
                            }).catch(function (e) {
                                console.log(e);
                                mongoose.disconnect();
                            });
                        });
                        results.push(pr);
                    });

                    return results;
                }
                var allPromisses = createUsers();
                Promise.all(allPromisses).then(function (item) {
                    console.log('all done');
                    mongoose.disconnect();
                }).catch(function (e) {
                    console.log(e);
                    mongoose.disconnect();
                });
            }).catch(function (e) {
                console.log(e);
                mongoose.disconnect();
            });
//            console.log(mongoose.models.User);
        }).then(function () {

        });
    });
});

