var log = require('libs/log')(module);
var config = require('config');
//var connect = require('connect');
var async = require('async');
var cookie = require('cookie');
var cookieParser = require('cookie-parser');
var sessionStore = require('libs/sessionStore');
var HttpError = require('error').HttpError;
var User = require('models/user').User;

//wrapper on sessionStore
function loadSession(sid, callback) {
    //sessionStore callback is not quite async-style
    sessionStore.load(sid, function (err, session) {
        if (arguments.length === 0) {
            //no arguments => no session
            return callback(null, null);
        } else {
            return callback(null, session);
        }
    });
}

function loadUser(session, callback) {
    if (!session.user) {
        log.debug('Session %s is anonymous', session.id);
        return callback(null, null);
    }

    log.debug('retrieving user ', session.user);

    User.findById(session.user, function (err, user) {
        if (err)
            return callback(err);

        if (!user) {
            return callback(null, null);
        }
        log.debug('user findById result: ' + user);
        callback(null, user);
    });
}

module.exports = function (server) {
    var io = require('socket.io').listen(server);
    io.set('origins', 'localhost:*');
    io.set('logger', log);
    io.set('authorization', function (handshake, callback) {
            
        async.waterfall([
            function (callback) {
                //сделать handshakeData.cookies - обьектом с cookie
                handshake.cookies = cookie.parse(handshake.headers.cookie || '');
                var sidCookie = handshake.cookies[config.get('session:key')];
                var sid = cookieParser.signedCookie(sidCookie, config.get('session:secret'));
                loadSession(sid, callback);
            },
            function (session, callback) {
                if (!session) {
                    callback(new HttpError(401, 'No session'));
                }
                handshake.session = session;
                loadUser(session, callback);
            },
            function (user, callback) {

                if (!user) {
                    callback(new HttpError(403, 'Anonymous session may not connect'));
                }
                handshake.user = user;

                callback(null);
            }
        ], function (err) {
            if (!err) {
                temp = handshake.user;
                return callback(null, true);
            }

            if (err instanceof HttpError) {
                return callback(null, false);
            }

            callback(err);
        });
    });

    io.on('connection', function (socket) {
//        console.log('11111-------------------');
//        console.log('user = '+ temp.get('username'));
//        console.log(temp);
//        console.log(socket.handshake);
//                console.log('username11111 = ' + socket.handshake.user.get('username'));

//        var username = socket.handshake.user.get('username');
        var username = 'some';

        socket.broadcast.emit('join', username);

        socket.on('message', function (text, cb) {
            socket.broadcast.emit('message', username, text);
            cb && cb();
//        socket.emit('message',text);
        });

        socket.on('disconnect', function () {
            socket.broadcast.emit('leave', username);
        });
    });
    return io;
};



