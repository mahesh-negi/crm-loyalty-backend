const Customer = require("../models/Customer");
const LoyaltyTransaction = require("../models/LoyaltyTransaction");
const Voucher = require("../models/Voucher");
const generateVoucherCode = require("../utils/generateVoucherCode");

// @desc Add loyalty transaction
// @route POST /api/loyalty/earn
// @access ADMIN / MANAGER
exports.earnPoints = async (req, res) => {
    try {
        const { customerId, amount } = req.body;

        if (!customerId || !amount) {
            return res.status(400).json({ message: "Customer & amount required" });
        }

        const customer = await Customer.findById(customerId);

        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        if (!customer.isLoyaltyMember) {
            return res
                .status(400)
                .json({ message: "Customer is not a loyalty member" });
        }

        // 1️⃣ Calculate points
        const pointsEarned = Math.floor(amount / 100);

        // 2️⃣ Add points
        customer.loyaltyPoints += pointsEarned;

        // 3️⃣ Save transaction
        const transaction = await LoyaltyTransaction.create({
            customer: customer._id,
            amount,
            pointsEarned,
            type: "EARN",
        });

        let voucher = null;

        // 4️⃣ Reward logic (100 points = voucher)
        if (customer.loyaltyPoints >= 100) {
            customer.loyaltyPoints -= 100;

            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + 90);

            voucher = await Voucher.create({
                customer: customer._id,
                code: generateVoucherCode(),
                value: 500,
                expiryDate,
            });
        }

        // 5️⃣ Save customer
        await customer.save();

        res.status(201).json({
            message: "Points added successfully",
            pointsEarned,
            totalPoints: customer.loyaltyPoints,
            voucherGenerated: voucher ? true : false,
            voucher,
            transaction,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
