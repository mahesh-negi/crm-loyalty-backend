const mongoose = require("mongoose");

const voucherSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
            required: true,
            index: true, // fast lookup by customer
        },

        code: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            uppercase: true, // consistency
        },

        value: {
            type: Number,
            required: true,
            default: 500,
            min: 0, // safety
        },

        isRedeemed: {
            type: Boolean,
            default: false,
        },

        redeemedAt: {
            type: Date,
            default: null,
        },

        expiryDate: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Voucher", voucherSchema);
