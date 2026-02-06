const express = require("express");
const router = express.Router();

const {
    createCampaign,
    getCampaignCustomers,
    executeCampaign,
    getCampaignExecutions,
} = require("../controllers/campaignController");

const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");

/**
 * @swagger
 * tags:
 *   name: Campaigns
 *   description: Campaign management APIs
 */

/**
 * @swagger
 * /api/campaigns:
 *   post:
 *     summary: Create campaign
 *     tags: [Campaigns]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Campaign'
 *     responses:
 *       201:
 *         description: Campaign created successfully
 */
router.post("/", auth, role("ADMIN"), createCampaign);

/**
 * @swagger
 * /api/campaigns/{id}/execute:
 *   post:
 *     summary: Execute campaign (mock send)
 *     tags: [Campaigns]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Campaign ID
 *     responses:
 *       200:
 *         description: Campaign executed successfully
 */
router.post("/:id/execute", auth, role("ADMIN"), executeCampaign);

/**
 * @swagger
 * /api/campaigns/{id}/executions:
 *   get:
 *     summary: Get campaign execution history
 *     tags: [Campaigns]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Campaign ID
 *     responses:
 *       200:
 *         description: Execution history fetched successfully
 */
router.get("/:id/executions", auth, role("ADMIN"), getCampaignExecutions);

/**
 * @swagger
 * /api/campaigns/{id}/customers:
 *   get:
 *     summary: Get campaign eligible customers
 *     tags: [Campaigns]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Campaign ID
 *     responses:
 *       200:
 *         description: Eligible customers fetched successfully
 */
router.get("/:id/customers", auth, role("ADMIN"), getCampaignCustomers);

module.exports = router;
