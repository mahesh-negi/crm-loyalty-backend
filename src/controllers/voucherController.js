const Voucher = require("../models/Voucher");

// @desc Redeem voucher
// @route POST /api/vouchers/redeem
// @access ADMIN / MANAGER
exports.redeemVoucher = async (req, res) => {
    try {
        const { code, billAmount } = req.body;

        if (!code || billAmount === undefined) {
            return res
                .status(400)
                .json({ message: "Voucher code & bill amount required" });
        }

        const voucher = await Voucher.findOne({ code });

        if (!voucher) {
            return res.status(404).json({ message: "Invalid voucher code" });
        }

        if (voucher.isRedeemed) {
            return res.status(400).json({ message: "Voucher already redeemed" });
        }

        if (voucher.expiryDate < new Date()) {
            return res.status(400).json({ message: "Voucher expired" });
        }

        // calculate final amount
        const discount = voucher.value;
        const finalAmount = Math.max(billAmount - discount, 0);

        // mark voucher as redeemed
        voucher.isRedeemed = true;
        voucher.redeemedAt = new Date();
        await voucher.save();

        res.json({
            message: "Voucher redeemed successfully",
            voucherCode: voucher.code,
            discount,
            originalBill: billAmount,
            finalPayableAmount: finalAmount,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
