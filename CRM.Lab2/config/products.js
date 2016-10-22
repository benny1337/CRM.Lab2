var Product = require('../app/models/product');

var products = (function () {
    var my = {};    
    my.getAll = function (req, res, next) {       

        Product.find({}, function (err, products) {
            res.products = products;
            return next();
        });

    }

    return my;
})();

module.exports = products;