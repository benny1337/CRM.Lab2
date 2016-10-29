var mongoose = require('mongoose');

var orderRowSchema = mongoose.Schema({
    ProductId: String,
    OrderId: String,
    Count: Number
});

module.exports = mongoose.model('OrderRow', orderRowSchema);
