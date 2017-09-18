var express = require('express');
var router = express.Router();
//var User = require('models/user').User;
//var HttpError = require('error').HttpError;
//var AuthError = require('models/user').AuthError;
//var async = require('async');

router.get('/', function (req, res, next) {
//    res.render('login');
});

router.post('/', function (req, res, next) {

    var sid = req.session.id;
     var io = req.app.get('io');
    req.session.destroy(function (err) {
//        var server = req.app.get('server');
//        console.log(io);
//        io.emit('m1', sid);
//        server.emit("session:reload", sid);
        io.sockets._events.sessionreload(sid);
        if (err)
            return next(err);
        res.redirect('/');
    });
});

//exports.get = router;
module.exports = router;