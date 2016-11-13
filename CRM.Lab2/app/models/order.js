var mongoose = require('mongoose');
//var OrderRow = mongoose.model('OrderRow');

var orderSchema = mongoose.Schema({
    UserId: String,
    UserFullName: String,
    UserEmail: String,
    Date: Date,
    Status: Number,
    OrderRows: [{ type: mongoose.Schema.Types.Object, ref: 'OrderRow' }]
});

module.exports = mongoose.model('Order', orderSchema);
