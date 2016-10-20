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

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

// locally --------------------------------
// LOGIN ===============================
// show the login form
router.get('/login', function (req, res) {
    res.render('login', { title: 'Login' });
});

// process the login form
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));

// SIGNUP =================================
// show the signup form
router.get('/signup', function (req, res) {
    res.render('signup', { title: 'Signup' });
});

// process the signup form
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));

// facebook -------------------------------

// send to facebook to do the authentication
router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

// handle the callback after facebook has authenticated the user
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));


// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

// locally --------------------------------
router.get('/connect/local', function (req, res) {
    res.render('connect-local.ejs', { message: req.flash('loginMessage') });
});

router.post('/connect/local', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/connect/local', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));

// send to facebook to do the authentication
router.get('/connect/facebook', passport.authorize('facebook', { scope: 'email' }));

// handle the callback after facebook has authorized the user
router.get('/connect/facebook/callback',
    passport.authorize('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));


// local -----------------------------------
router.get('/unlink/local', isLoggedIn, function (req, res) {
    var user = req.user;
    user.local.email = undefined;
    user.local.password = undefined;
    user.save(function (err) {
        res.redirect('/profile');
    });
});

// facebook -------------------------------
router.get('/unlink/facebook', isLoggedIn, function (req, res) {
    var user = req.user;
    user.facebook.token = undefined;
    user.save(function (err) {
        res.redirect('/profile');
    });
});

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}

module.exports = router;
