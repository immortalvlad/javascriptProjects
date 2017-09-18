
var index = require('routes/index');
var frontpage = require('routes/frontpage');
var users = require('routes/users');
var login = require('routes/login');
var logout = require('routes/logout');
var chat = require('routes/chat');
var auth = require('routes/auth');
var checkAuth = require('../middleware/checkAuth');

module.exports = function (app) {
    app.use('/', frontpage.get);
    app.use('/users', users);
    app.use('/login', login);
    app.use('/logout', logout);
    app.use('/chat', checkAuth, chat);
    app.use('/auth', auth);
};