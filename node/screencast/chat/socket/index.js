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
//        console.log(err);
//        console.log(session);
//        console.log(arguments.length);
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
var io;
module.exports = function (server) {
    io = require('socket.io').listen(server);
//    var io = require('socket.io')(server);
    io.set('origins', 'localhost:*');
    io.set('logger', log);
    io.use(function (socket, next) {

        async.waterfall([
            function (callback) {
                //сделать handshakeData.cookies - обьектом с cookie
                socket.handshake.cookies = cookie.parse(socket.handshake.headers.cookie || '');
                var sidCookie = socket.handshake.cookies[config.get('session:key')];
                var sid = cookieParser.signedCookie(sidCookie, config.get('session:secret'));
                loadSession(sid, callback);
            },
            function (session, callback) {
                if (!session) {
                    callback(new HttpError(401, 'No session'));
                }
                socket.handshake.session = session;
                loadUser(session, callback);
            },
            function (user, callback) {

                if (!user) {
                    callback(new HttpError(403, 'Anonymous session may not connect'));
                }
                socket.handshake.user = user;

                callback(null);
            }
        ], function (err) {
            if (!err) {
                temp = socket.handshake.user;
                return next();
            }

            if (err instanceof HttpError) {
                return next();
            }

            next(err);
        });
    });

//    io.on('m1', function (sid) {
//        console.log('seesion reload');
//        //get all sockets
//        var clients = io.sockets.clients();
//        clients.forEach(function (client) {
//            if (client.handshake.session.id !== sid)
//                return;
//            loadSession(sid, function (err, session) {
//                if (err) {
//                    client.emit('error', 'server error');
//                    client.disconnect();
//                    return;
//                }
//
//                if (!session) {
//                    client.emit('error', 'handshake unauthorized');
//                    client.disconnect();
//                    return;
//                }
//
//                client.handshake.session = session;
//            });
//        });
//    });
    io.on('sessionreload', function (sid) {
        console.log('seesion reload');
         var clients = io.sockets.clients();
//        console.log(clients);
        var allConnectedClients = Object.keys(io.sockets.connected);
        console.log(allConnectedClients);
//        console.log(sid);
//        console.log(clients.sockets);
        allConnectedClients.forEach(function (client) {
            var socket = io.sockets.connected[client];
//            io.emit('error', 'server error');
//            console.log(socket.handshake.session.id);
//            console.log(sid);
            if (socket.handshake.session.id !== sid)
                return;
            loadSession(sid, function (err, session) {
                if (err) {
                    io.emit('error', 'server error');
                    socket.disconnect();
                    return;
                }

                if (!session) {
//                    console.log('handshake unauthorized');
//                    io.sockets.sockets[client];
                    console.log(io.sockets.sockets[client].client.conn);
//                    io.sockets.sockets[client].client.conn.emit('error', 'handshake unauthorized');
                    io.emit('logout', 'handshake unauthorized');
                    socket.disconnect();
                    return;
                }
                socket.handshake.session = session;
            });
        });
        //get all sockets
//        var clients = io.sockets.clients();
//        console.log(clients);
//        clients.forEach(function (client) {
//            if (client.handshake.session.id !== sid)
//                return;
//            loadSession(sid, function (err, session) {
//                if (err) {
//                    client.emit('error', 'server error');
//                    client.disconnect();
//                    return;
//                }
//
//                if (!session) {
//                    client.emit('error', 'handshake unauthorized');
//                    client.disconnect();
//                    return;
//                }
//
//                client.handshake.session = session;
//            });
//        });
    });
    io.on('connection', function (socket) {
        var username = '';
        if(socket.handshake.user){
            username = socket.handshake.user.get('username');
        }else{
            console.log('discon');
            socket.disconnect(true);
            return;
        }

        socket.broadcast.emit('join', username);

        socket.on('message', function (text, cb) {
            socket.broadcast.emit('message', username, text);
            cb && cb();
//        socket.emit('message',text);
        });

        socket.on('disconnect', function () {
            socket.broadcast.emit('leave', username);
        });

//        var allConnectedClients = Object.keys(io.sockets.connected);
//        console.log(allConnectedClients);
//        var clientsCount = io.engine.clientsCount;
//        console.log(clientsCount);
    });
    return io;
};



