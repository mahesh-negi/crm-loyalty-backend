const mongoose = require("mongoose");

const loyaltyTransactionSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        pointsEarned: {
            type: Number,
            required: true,
        },
        type: {
            type: String,
            enum: ["EARN", "REDEEM"],
            default: "EARN",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model(
    "LoyaltyTransaction",
    loyaltyTransactionSchema
);
