const Customer = require("../models/Customer");

// @desc Create customer
// @route POST /api/customers
// @access ADMIN
exports.createCustomer = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            mobile,
            isLoyaltyMember,
            dob,
            anniversary,
        } = req.body;

        if (!firstName || !mobile) {
            return res.status(400).json({ message: "First name and mobile required" });
        }

        const customerExists = await Customer.findOne({ mobile });
        if (customerExists) {
            return res.status(400).json({ message: "Customer already exists" });
        }

        const customer = await Customer.create({
            firstName,
            lastName,
            email,
            mobile,
            isLoyaltyMember: isLoyaltyMember || false,
            dob,
            anniversary,
            loyaltyPoints: isLoyaltyMember ? 0 : undefined,
        });

        res.status(201).json(customer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc Get all customers
// @route GET /api/customers
// @access ADMIN, MANAGER
exports.getCustomers = async (req, res) => {
    const customers = await Customer.find();
    res.json(customers);
};
