var Order = require('../app/models/order');

var orders = (function () {
    var my = {};
    my.save = function (req, res, next) {
        var order = new Order({
            UserId: req.body.UserId,
            UserFullName: req.body.UserFullName,
            UserEmail: req.body.UserEmail,
            Date: req.body.Date,
            Status: req.body.Status,
            OrderRows: req.body.OrderRows
        });
        order.save(function (err) {
            if (err) throw err;            
            next();
        });
    }

    my.getAll = function (req, res, next) {
        var user = req.user;
        Order.find({ UserId: user.facebook.id }, function (err, orders) {
            res.orders = orders;
            return next();
        });
    }

    return my;
})();

module.exports = orders;