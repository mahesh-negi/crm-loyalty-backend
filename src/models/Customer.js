const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    mobile: String,

    isLoyaltyMember: { type: Boolean, default: false },

    dob: Date,
    anniversary: Date,

    loyaltyPoints: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Customer", customerSchema);
