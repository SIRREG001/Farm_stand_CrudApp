const mongoose = require('mongoose');

//creating a mongoose model
const Schema = mongoose.Schema
const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['fruit', 'vegetable', 'dairy', 'beverage']
    }
});

const Product = mongoose.model('Product', productSchema);

//exporting the model created
module.exports = Product;