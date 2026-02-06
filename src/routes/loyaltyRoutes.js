const express = require("express");
const router = express.Router();
const { earnPoints } = require("../controllers/loyaltyController");

const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");

/**
 * @swagger
 * tags:
 *   name: Loyalty
 *   description: Loyalty points APIs
 */

/**
 * @swagger
 * /api/loyalty/earn:
 *   post:
 *     summary: Earn loyalty points
 *     tags: [Loyalty]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoyaltyEarn'
 *     responses:
 *       201:
 *         description: Loyalty points added successfully
 */
router.post("/earn", auth, role("ADMIN", "MANAGER"), earnPoints);

module.exports = router;
