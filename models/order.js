var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const orderSchema = new Schema({
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
            min: [1, 'Product quantity needs be greater than 0.']
        },
        price: Number
    }],
    total: {
        type: Number,
        required: true
    },
})


module.exports = mongoose.model('Order', orderSchema);