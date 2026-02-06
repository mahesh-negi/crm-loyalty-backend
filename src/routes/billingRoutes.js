const express = require("express");
const router = express.Router();
const { createBill } = require("../controllers/billingController");

const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");

/**
 * @swagger
 * tags:
 *   name: Billing
 *   description: Billing & finance APIs
 */

/**
 * @swagger
 * /api/billing/create:
 *   post:
 *     summary: Create bill (with / without voucher)
 *     tags: [Billing]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bill'
 *     responses:
 *       201:
 *         description: Bill created successfully
 */
router.post("/create", auth, role("ADMIN", "MANAGER"), createBill);

module.exports = router;
