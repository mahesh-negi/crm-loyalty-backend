const Bill = require("../models/Bill");
const Voucher = require("../models/Voucher");

// @desc Create bill
// @route POST /api/billing/create
// @access ADMIN / MANAGER
exports.createBill = async (req, res) => {
    try {
        const { customerId, amount, voucherCode } = req.body;

        if (!customerId || !amount) {
            return res
                .status(400)
                .json({ message: "Customer & amount required" });
        }

        let discount = 0;

        // voucher apply (optional)
        if (voucherCode) {
            const voucher = await Voucher.findOne({ code: voucherCode });

            if (!voucher) {
                return res.status(404).json({ message: "Invalid voucher code" });
            }

            if (voucher.isRedeemed) {
                return res.status(400).json({ message: "Voucher already used" });
            }

            if (voucher.expiryDate < new Date()) {
                return res.status(400).json({ message: "Voucher expired" });
            }

            discount = voucher.value;

            voucher.isRedeemed = true;
            voucher.redeemedAt = new Date();
            await voucher.save();
        }

        const finalAmount = Math.max(amount - discount, 0);

        const bill = await Bill.create({
            customer: customerId,
            originalAmount: amount,
            discount,
            finalAmount,
            voucherCode: voucherCode || null,
        });

        res.status(201).json({
            message: "Bill generated successfully",
            bill,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
