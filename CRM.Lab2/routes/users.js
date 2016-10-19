var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {    
    res.render('users', { title: 'Users' });    
});

router.get('/asdf', function (req, res) {
    res.render('users', { title: 'Users asdf' });    
});

module.exports = router;