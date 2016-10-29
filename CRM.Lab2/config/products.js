var Product = require('../app/models/product');

var products = (function () {
    var my = {};    
    my.getAll = function (req, res, next) {       

        Product.find({}, function (err, products) {            
            res.products = products;
            return next();
        });

    }

    my.getOne = function (req, res, next) {
        var name = req.params.seoname
        Product.find({ SeoName: name }, function (err, products) {
            if (products.length < 1)
                return next();
            res.product = products[0];
            return next();
        });

    }

    return my;
})();

module.exports = products;