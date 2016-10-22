var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    name: String,
    price: Number,
    text: String    
});

module.exports = mongoose.model('Product', productSchema);
