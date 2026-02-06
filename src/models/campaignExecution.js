const mongoose = require("mongoose");

const campaignExecutionSchema = new mongoose.Schema(
    {
        campaign: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Campaign",
            required: true,
        },

        totalCustomers: {
            type: Number,
            required: true,
        },

        executedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model(
    "CampaignExecution",
    campaignExecutionSchema
);
