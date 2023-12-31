const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            },
            type: {
                type: Boolean,
                required: true,
            },
            qty: {
                type: Number,
                default: 0,
            },
            ogprice: {
                type: Number,
                default: 0,
            },
            // !var tax
            varTax: {
                type: Number,
                default: 0,
            },
            fixTax: {
                type: Number,
                default: 0,
            },
            onePrice: {
                type: Number,
                default: 0,
            },
            price: {
                type: Number,
                default: 0,
            },
            title: {
                type: String,
            },
            productCode: {
                type: String,
            },
        },
    ],
    totalQty: {
        type: Number,
        default: 0,
        required: true,
    },
    totalCost: {
        type: Number,
        default: 0,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Cart', cartSchema);
