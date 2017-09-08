var path = require('path');

module.exports = function (app, passport) {

    app.get('*', function (req, res) {
        res.render(path.join('../views/index'));
    });

    app.get('/', function (req, res) {
        res.render('index.ejs', {message: req.flash('loginMessage')});
    });

    app.get('/partials/:name', function (req, res) {
        res.render('partials/' + req.params.name);
    });

    app.post('/register', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/register',
        failureFlash: true
    }));

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.get('/profile', isLoggedIn, function (req, res) {
        res.sendfile('profile.html', {
            user: req.user
        });
    });
};

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated()) {
        return next();
    }
    // if they aren't redirect them to the home page
    res.redirect('/');
}