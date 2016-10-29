var express = require('express');
var router = express.Router();
var passport = require('../config/passport');
var products = require('../config/products');
var orders = require('../config/orders');


router.post("/orders", orders.save, function (req, res) {    
    res.setHeader('Content-Type', 'application/json');    
    res.send({ status: 'SUCCESS' });
});

router.get('/', function (req, res) {
    res.render('index', { header: '' });
});

router.get('/checkout', function (req, res) {
    res.render('index', { header: 'Kassa' });
});
router.get('/about', function (req, res) {
    res.render('index', { header: 'Om' });
});

router.get('/products', function (req, res) {
    res.render('index', { header: 'Produkter' });
});

router.get('/product/:productname', function (req, res) {
    res.render('index', { header: 'Produkter' });
});

router.get('/products/all', products.getAll, function (req, res) {
    res.setHeader('Content-Type', 'application/json');    
    res.send(JSON.stringify(res.products));
});
router.get('/products/one/:seoname', products.getOne, function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(res.product));
});


// PROFILE SECTION =========================
router.get('/profile', isLoggedIn, function (req, res) {
    res.render('index', {
        user: req.user,
        header: "Profile"
    });
});

router.get('/currentuser', function (req, res) {   
    res.json(req.user);
    //res.setHeader('Content-Type', 'application/json');
    //res.send(JSON.stringify(req.user));
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
