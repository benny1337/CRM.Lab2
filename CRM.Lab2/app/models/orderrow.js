var mongoose = require('mongoose');


var orderRowSchema = mongoose.Schema({
    Product: { type: mongoose.Schema.Types.Object, ref: 'Product' },        
    Count: Number
});

module.exports = mongoose.model('OrderRow', orderRowSchema);
