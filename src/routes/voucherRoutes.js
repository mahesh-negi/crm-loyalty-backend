const express = require("express");
const router = express.Router();
const Voucher = require("../models/Voucher");
const { redeemVoucher } = require("../controllers/voucherController");

const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");

/**
 * @swagger
 * tags:
 *   name: Vouchers
 *   description: Voucher APIs
 */

/**
 * @swagger
 * /api/vouchers/redeem:
 *   post:
 *     summary: Redeem voucher
 *     tags: [Vouchers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VoucherRedeem'
 *     responses:
 *       200:
 *         description: Voucher redeemed successfully
 *       400:
 *         description: Invalid or expired voucher
 */
router.post("/redeem", auth, role("ADMIN", "MANAGER"), redeemVoucher);

/**
 * @swagger
 * /api/vouchers/{customerId}:
 *   get:
 *     summary: Get vouchers of a customer
 *     tags: [Vouchers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer ID
 *     responses:
 *       200:
 *         description: Vouchers fetched successfully
 */
router.get("/:customerId", auth, role("ADMIN", "MANAGER"), async (req, res) => {
    const vouchers = await Voucher.find({
        customer: req.params.customerId,
    });
    res.json(vouchers);
});

module.exports = router;
