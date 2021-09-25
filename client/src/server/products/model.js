const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
    sku: {
        type: Number,
        default: 123456
    },
    name: {
        type: String,
        default: ""
    },
    type: {
        type: String,
        default: ""
    },
    price: {
        type: Number,
        default: 1
    },
    harga: {
        type: Number,
        default: 1
    },
    upc: {
        type: String,
        default: ""
    },
    maincategory: {
        type: String,
        default: ""
    },
    shipping: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        default: ""
    },
    manufacturer: {
        type: String,
        default: ""
    },
    model: {
        type: String,
        default: ""
    },
    url: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productsSchema);

module.exports = { Product };