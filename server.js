/*jshint esversion: 6 */

var express = require('express'),
    cors = require('cors'),
    app = express(),
    port = process.env.PORT || 5000,
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    passport = require('passport'),
    flash = require('connect-flash'),
    path = require('path');

app.use(express.static('public'));
app.use(express.static('src/views'));
app.use(cors());

// app.get('/', function (req, res) {
//     res.render(path.join(__dirname + '/src/views/index'));
// });
var configDB = require('./src/config/database');

mongoose.connect(configDB.url);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

app.set('view engine', 'ejs');
app.set('views', [__dirname + '/src/views', __dirname + '/src/views/partials']);

app.use(session({secret: 'thisisasecretphrasemwahahahaha'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function (req, res, next) {
    res.locals.successMessages = req.flash('success_messages');
    res.locals.errorMessages = req.flash('error_messages');
    next();
});

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.options('*', cors());

var server = app.listen(port, function (err) {
    console.log('running server on port ' + port);
});

var io = require('socket.io').listen(server);

require('./src/routes/socket')(io);
require('./src/routes/transactionRouter')(app, io);
require('./src/routes/router.js')(app, passport);
require('./src/config/passport')(passport);