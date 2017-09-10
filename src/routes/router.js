var path = require('path');

module.exports = function (app, passport) {

    app.get('/', function (req, res) {
        res.render('index.ejs', {message: req.flash('loginMessage')});
    });

    app.get('/partials/:name', function (req, res) {
        res.render('partials/' + req.params.name);
    });

    app.post('/api/register', function (req, res, next) {
        passport.authenticate('local-signup', function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.user;
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                return res.send(req.user);
            });
        })(req, res, next);
    });

    app.post('/api/login', function (req, res, next) {
        passport.authenticate('local-login', function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return req.user;
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                return res.send(req.user);
            });
        })(req, res, next);
    });

    app.get('/profile', isLoggedIn, function (req, res) {
        res.render('profile.ejs', {
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