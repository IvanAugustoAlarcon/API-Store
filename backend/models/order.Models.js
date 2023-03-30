const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                default: 1,
            },
            price: {
                type: Number,
            }
        }
    ],
    amount: {
        type: Number,
        require: true
    },
    address: {
        type: Object,
        require: true
    },
    status: {
        type: String,
        default: 'pending'
    }
})

module.exports = mongoose.model('Order', orderSchema)