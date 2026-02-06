const cron = require("node-cron");
const Campaign = require("../models/Campaign");
const Customer = require("../models/Customer");
const campaignExecution = require("../models/campaignExecution");

// Run every day at 9 AM
cron.schedule("0 9 * * *", async () => {
    console.log("🎯 Running daily campaign scheduler...");

    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;

    const campaigns = await Campaign.find({
        type: { $in: ["BIRTHDAY", "ANNIVERSARY"] },
        isActive: true,
    });

    for (let campaign of campaigns) {
        let customers = [];

        if (campaign.type === "BIRTHDAY") {
            customers = await Customer.find({
                dob: { $exists: true },
                $expr: {
                    $and: [
                        { $eq: [{ $dayOfMonth: "$dob" }, day] },
                        { $eq: [{ $month: "$dob" }, month] },
                    ],
                },
            });
        }

        if (campaign.type === "ANNIVERSARY") {
            customers = await Customer.find({
                anniversary: { $exists: true },
                $expr: {
                    $and: [
                        { $eq: [{ $dayOfMonth: "$anniversary" }, day] },
                        { $eq: [{ $month: "$anniversary" }, month] },
                    ],
                },
            });
        }

        if (customers.length > 0) {
            customers.forEach((c) => {
                console.log(
                    `Auto Campaign "${campaign.name}" sent to ${c.email || c.mobile}`
                );
            });

            await campaignExecution.create({
                campaign: campaign._id,
                totalCustomers: customers.length,
            });
        }
    }
});


