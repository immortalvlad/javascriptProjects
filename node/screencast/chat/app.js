var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var config = require('config');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var log = require('libs/log')(module);
var HttpError = require('error').HttpError;
var session = require('express-session');
var mongoose = require('libs/mongoose');

var app = express();


//app.use(function (req, res, next) {
//    console.log('dsdsdsds');
//    res.status(500).send('Hello');
//    next();
//});
//app.use(function (req, res) {
//    console.log('11111111');
//    res.end('Hello111');
//});
// view engine setup
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//
//// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

var sessionStore = require('libs/sessionStore');

app.use(session({
    secret: config.get('session:secret'),
    key: config.get('session:key'),
    cookie: config.get('session:cookie'),
    store: sessionStore,
    resave: true,
    saveUninitialized: true
}));
//app.use(function (req, res, next) {
//    req.session.numberOfVisits = req.session.numberOfVisits + 1 || 1;
//    res.send("Visits: " + req.session.numberOfVisits);
//});

app.use(express.static(path.join(__dirname, 'public')));
app.use(require('middleware/sendHttpError'));
app.use(require('middleware/loadUser'));
app.use(require('middleware/googleAuth'));

require('routes/mainRoute')(app);
//
//// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
//
//// error handler
app.use(function (err, req, res, next) {
    if (typeof err === 'number') {
        err = new HttpError(err);
    }

    if (err instanceof HttpError) {
        res.sendHttpError(err);
    } else {
        if (app.get('env') === 'development') {
            res.locals.message = err.message;
            res.locals.error = err;
            res.status(err.status || 500);
            res.render('error');
        } else {
            log.error(err);
            err = new HttpError(500);
            res.sendHttpError(err);
        }
    }

    ///Standart handler///
    // set locals, only providing error in development
//    res.locals.message = err.message;
//    res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//    // render the error page
//    res.status(err.status || 500);
//    res.render('error');
});

module.exports = app;
