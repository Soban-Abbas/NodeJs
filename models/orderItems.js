const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    items: [{
        product: {
            title: String,
            price: Number,
            quantity:Number
        },

    }],
    grandTotal: Number
})

const order = mongoose.model('order', orderSchema)

module.exports = order;