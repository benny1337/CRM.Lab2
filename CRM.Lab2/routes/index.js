var express = require('express');
var router = express.Router();
var passport = require('../config/passport');


router.get('/', function (req, res) {
    res.render('index', { title: '' });
});

// PROFILE SECTION =========================
router.get('/profile', isLoggedIn, function (req, res) {
    res.render('profile', {
        user: req.user,
        title: "Profile"
    });
});

// LOGOUT ==============================
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});


// send to facebook to do the authentication
router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

// handle the callback after facebook has authenticated the user
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}

module.exports = router;
