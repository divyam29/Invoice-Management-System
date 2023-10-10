const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    cart: {
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
                // ! total price
                price: {
                    type: Number,
                    default: 0,
                },
                varTax: {
                    type: Number,
                    default: 0,
                },
                fixTax: {
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
    },
    address: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    Delivered: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('Order', orderSchema);
