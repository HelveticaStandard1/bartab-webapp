var express = require('express');

var cors = require('cors');
var app = express();

var port = process.env.port || 5000;
var routes = express.Router();
var mongoose = require('mongoose');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var path = require('path');

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

app.use(function(req, res, next) {
    res.locals.successMessages = req.flash('success_messages');
    res.locals.errorMessages = req.flash('error_messages');
    next();
});

require('./src/routes/transactionRouter')(app);
require('./src/routes/router.js')(app, passport);
require('./src/config/passport')(passport);

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.options('*', cors());

app.listen(port, function (err) {
    console.log('running server on port ' + port);
});

