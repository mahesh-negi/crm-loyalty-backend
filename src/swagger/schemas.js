/**
 * @swagger
 * components:
 *   schemas:
 *
 *     RegisterRequest:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           example: Admin User
 *         email:
 *           type: string
 *           example: admin@test.com
 *         password:
 *           type: string
 *           example: password123
 *         role:
 *           type: string
 *           example: ADMIN
 *
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           example: admin@test.com
 *         password:
 *           type: string
 *           example: password123
 *
 *     Customer:
 *       type: object
 *       required:
 *         - firstName
 *         - mobile
 *       properties:
 *         firstName:
 *           type: string
 *           example: Rahul
 *         lastName:
 *           type: string
 *           example: Sharma
 *         email:
 *           type: string
 *           example: rahul@test.com
 *         mobile:
 *           type: string
 *           example: 9999999999
 *         isLoyaltyMember:
 *           type: boolean
 *           example: true
 *         dob:
 *           type: string
 *           format: date
 *           example: 1995-05-20
 *         anniversary:
 *           type: string
 *           format: date
 *           example: 2020-02-14
 *
 *     LoyaltyEarn:
 *       type: object
 *       required:
 *         - customerId
 *         - amount
 *       properties:
 *         customerId:
 *           type: string
 *           example: 64ff1a2b9e7c123456789abc
 *         amount:
 *           type: number
 *           example: 1500
 *
 *     Campaign:
 *       type: object
 *       required:
 *         - name
 *         - type
 *         - message
 *         - startDate
 *         - endDate
 *       properties:
 *         name:
 *           type: string
 *           example: Birthday Campaign
 *         type:
 *           type: string
 *           enum: [GENERAL, LOYALTY_ONLY, NON_LOYALTY, BIRTHDAY, ANNIVERSARY]
 *           example: BIRTHDAY
 *         message:
 *           type: string
 *           example: Happy Birthday! Enjoy ₹500 off 🎉
 *         startDate:
 *           type: string
 *           format: date
 *           example: 2026-02-01
 *         endDate:
 *           type: string
 *           format: date
 *           example: 2026-02-28
 *
 *     Bill:
 *       type: object
 *       required:
 *         - customerId
 *         - amount
 *       properties:
 *         customerId:
 *           type: string
 *           example: 64ff1a2b9e7c123456789abc
 *         amount:
 *           type: number
 *           example: 2000
 *         voucherCode:
 *           type: string
 *           example: VCH-ABCD1234
 *
 *     VoucherRedeem:
 *       type: object
 *       required:
 *         - code
 *         - billAmount
 *       properties:
 *         code:
 *           type: string
 *           example: VCH-ABCD1234
 *         billAmount:
 *           type: number
 *           example: 2000
 */
