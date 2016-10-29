var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = mongoose.Schema({
    Name: String,
    Price: Number,
    Text: String,
    ProductId: String,
    Supplier: String,
    OtherImagesCSV: String,
    AttributesCSV: String,
    SeoName: String,
    Subtitle: String,
});

module.exports = mongoose.model('Product', productSchema);
