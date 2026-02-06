const Bill = require("../models/Bill");
const Voucher = require("../models/Voucher");
const Customer = require("../models/Customer");

// @desc Get dashboard reports
// @route GET /api/reports/dashboard
// @access ADMIN
exports.dashboardReport = async (req, res) => {
    try {
        // total revenue (final amount)
        const revenueAgg = await Bill.aggregate([
            { $group: { _id: null, total: { $sum: "$finalAmount" } } }
        ]);

        // total discount
        const discountAgg = await Bill.aggregate([
            { $group: { _id: null, total: { $sum: "$discount" } } }
        ]);

        const totalBills = await Bill.countDocuments();

        const voucherUsed = await Voucher.countDocuments({
            isRedeemed: true
        });

        // loyalty vs non-loyalty revenue
        const loyaltyRevenue = await Bill.aggregate([
            {
                $lookup: {
                    from: "customers",
                    localField: "customer",
                    foreignField: "_id",
                    as: "customer"
                }
            },
            { $unwind: "$customer" },
            {
                $group: {
                    _id: "$customer.isLoyaltyMember",
                    total: { $sum: "$finalAmount" }
                }
            }
        ]);

        res.json({
            totalRevenue: revenueAgg[0]?.total || 0,
            totalDiscount: discountAgg[0]?.total || 0,
            totalBills,
            vouchersUsed: voucherUsed,
            loyaltyRevenueBreakdown: loyaltyRevenue
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
