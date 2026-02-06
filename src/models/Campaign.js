const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        type: {
            type: String,
            enum: [
                "GENERAL",
                "LOYALTY_ONLY",
                "NON_LOYALTY",
                "BIRTHDAY",
                "ANNIVERSARY",
            ],
            required: true,
        },

        message: {
            type: String,
            required: true,
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        startDate: {
            type: Date,
            required: true,
        },

        endDate: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Campaign", campaignSchema);
