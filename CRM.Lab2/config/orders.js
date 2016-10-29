var Order = require('../app/models/order');
var OrderRow = require('../app/models/orderrow');

var orders = (function () {
    var my = {};
    my.save = function (req, res, next) {        
        var order = new Order({            
            UserId: req.body.UserId,
            Status: req.body.Status            
        });
        order.save(function (err) {
            if (err) throw err;
            req.body.OrderRows.forEach(function (row, index) {
                var r = new OrderRow({
                    ProductId: row.Product.ProductId,
                    OrderId: order.id,
                    Count: row.Count
                });
                r.save(function (err) {
                    if (err)
                        throw err;
                });
            });
            next();
        });
    }   

    return my;
})();

module.exports = orders;