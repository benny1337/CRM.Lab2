var mongoose = require('mongoose');

var orderRowSchema = mongoose.Schema({
    ProductId: string,
    OrderId: string,
    Count: number
});

module.exports = mongoose.model('OrderRow', orderRowSchema);
