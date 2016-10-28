var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
    UserId: String,   
    Date: Date,
    Status: Number
});

module.exports = mongoose.model('Order', orderSchema);
