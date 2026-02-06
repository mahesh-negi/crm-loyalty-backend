const Campaign = require("../models/Campaign");
const campaignExecution = require("../models/campaignExecution");
const Customer = require("../models/Customer");

// @desc Create campaign
// @route POST /api/campaigns
// @access ADMIN
exports.createCampaign = async (req, res) => {
    try {
        const { name, type, message, startDate, endDate } = req.body;

        if (!name || !type || !message || !startDate || !endDate) {
            return res.status(400).json({ message: "All fields required" });
        }

        const campaign = await Campaign.create({
            name,
            type,
            message,
            startDate,
            endDate,
        });

        res.status(201).json(campaign);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc Get eligible customers for campaign
// @route GET /api/campaigns/:id/customers
// @access ADMIN
exports.getCampaignCustomers = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id);
        if (!campaign) {
            return res.status(404).json({ message: "Campaign not found" });
        }

        let customers = [];

        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;

        switch (campaign.type) {
            case "GENERAL":
                customers = await Customer.find();
                break;

            case "LOYALTY_ONLY":
                customers = await Customer.find({ isLoyaltyMember: true });
                break;

            case "NON_LOYALTY":
                customers = await Customer.find({ isLoyaltyMember: false });
                break;

            case "BIRTHDAY":
                customers = await Customer.find({
                    dob: { $exists: true },
                    $expr: {
                        $and: [
                            { $eq: [{ $dayOfMonth: "$dob" }, day] },
                            { $eq: [{ $month: "$dob" }, month] },
                        ],
                    },
                });
                break;

            case "ANNIVERSARY":
                customers = await Customer.find({
                    anniversary: { $exists: true },
                    $expr: {
                        $and: [
                            { $eq: [{ $dayOfMonth: "$anniversary" }, day] },
                            { $eq: [{ $month: "$anniversary" }, month] },
                        ],
                    },
                });
                break;
        }

        res.json({
            campaign: campaign.name,
            type: campaign.type,
            count: customers.length,
            customers,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// @desc Execute campaign (mock send)
// @route POST /api/campaigns/:id/execute
// @access ADMIN
exports.executeCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id);
        if (!campaign) {
            return res.status(404).json({ message: "Campaign not found" });
        }

        let customers = [];

        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;

        switch (campaign.type) {
            case "GENERAL":
                customers = await Customer.find();
                break;

            case "LOYALTY_ONLY":
                customers = await Customer.find({ isLoyaltyMember: true });
                break;

            case "NON_LOYALTY":
                customers = await Customer.find({ isLoyaltyMember: false });
                break;

            case "BIRTHDAY":
                customers = await Customer.find({
                    dob: { $exists: true },
                    $expr: {
                        $and: [
                            { $eq: [{ $dayOfMonth: "$dob" }, day] },
                            { $eq: [{ $month: "$dob" }, month] },
                        ],
                    },
                });
                break;

            case "ANNIVERSARY":
                customers = await Customer.find({
                    anniversary: { $exists: true },
                    $expr: {
                        $and: [
                            { $eq: [{ $dayOfMonth: "$anniversary" }, day] },
                            { $eq: [{ $month: "$anniversary" }, month] },
                        ],
                    },
                });
                break;
        }

        // MOCK SEND (console log)
        customers.forEach((c) => {
            console.log(
                `Campaign "${campaign.name}" sent to ${c.email || c.mobile}`
            );
        });

        // Save execution record
        const execution = await campaignExecution.create({
            campaign: campaign._id,
            totalCustomers: customers.length,
        });

        res.json({
            message: "Campaign executed successfully (mock)",
            campaign: campaign.name,
            totalCustomers: customers.length,
            execution,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    exports.executeCampaign = async (req, res) => {
        try {
            const campaign = await Campaign.findById(req.params.id);
            if (!campaign) {
                return res.status(404).json({ message: "Campaign not found" });
            }

            let customers = [];

            const today = new Date();
            const day = today.getDate();
            const month = today.getMonth() + 1;

            switch (campaign.type) {
                case "GENERAL":
                    customers = await Customer.find();
                    break;

                case "LOYALTY_ONLY":
                    customers = await Customer.find({ isLoyaltyMember: true });
                    break;

                case "NON_LOYALTY":
                    customers = await Customer.find({ isLoyaltyMember: false });
                    break;

                case "BIRTHDAY":
                    customers = await Customer.find({
                        dob: { $exists: true },
                        $expr: {
                            $and: [
                                { $eq: [{ $dayOfMonth: "$dob" }, day] },
                                { $eq: [{ $month: "$dob" }, month] },
                            ],
                        },
                    });
                    break;

                case "ANNIVERSARY":
                    customers = await Customer.find({
                        anniversary: { $exists: true },
                        $expr: {
                            $and: [
                                { $eq: [{ $dayOfMonth: "$anniversary" }, day] },
                                { $eq: [{ $month: "$anniversary" }, month] },
                            ],
                        },
                    });
                    break;
            }

            // MOCK SEND (console log)
            customers.forEach((c) => {
                console.log(
                    `Campaign "${campaign.name}" sent to ${c.email || c.mobile}`
                );
            });

            // Save execution record
            const execution = await campaignExecution.create({
                campaign: campaign._id,
                totalCustomers: customers.length,
            });

            res.json({
                message: "Campaign executed successfully (mock)",
                campaign: campaign.name,
                totalCustomers: customers.length,
                execution,
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};

// @desc Get campaign execution history
// @route GET /api/campaigns/:id/executions
// @access ADMIN
exports.getCampaignExecutions = async (req, res) => {
    const executions = await campaignExecution.find({
        campaign: req.params.id,
    }).sort({ createdAt: -1 });

    res.json({
        campaignId: req.params.id,
        totalRuns: executions.length,
        executions,
    });
};

