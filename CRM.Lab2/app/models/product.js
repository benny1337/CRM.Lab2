var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    Name: String,
    Price: Number,
    Text: String,    
    Id: String,
    Supplier: String,
    OtherImagesCSV: String,
    AttributesCSV: String,
    SeoName: String,
    Subtitle: String,
});

module.exports = mongoose.model('Product', productSchema);
