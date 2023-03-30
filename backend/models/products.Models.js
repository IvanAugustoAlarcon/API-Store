const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    title: {
        type: String,
        required: [true, 'provide a title']
    },
    price: {
        type: Number,
        required: [true, 'provide a price']
    },
    category: {
        type: String,
        required: [true, 'provide a category']
    },
    description: {
        type: String,
        required: [true, 'provide a description']
    },
    image: {
        type: String,
        required: [true, 'provide a image']
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema)