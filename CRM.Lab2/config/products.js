var Product = require('../app/models/product');

var products = (function () {
    var my = {};    
    my.getAll = function (req, res, next) {       
        res.products = {
            name: "Prodde",
            price: 500,
            text: "die goe text"
        }
        return next();
    }

    return my;
})();

module.exports = products;