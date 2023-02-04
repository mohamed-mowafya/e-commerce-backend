const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userId: {
        type: String,
    },
    items: [{
        productId: {
            type: String,
        },
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Product quantity must be greater than 0.'],
            default: 1
        },
        price: Number
    }],
    total: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model('Cart', cartSchema);