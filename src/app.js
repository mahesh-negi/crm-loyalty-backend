const express = require("express");
const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

app.use(express.json());

// 🔥 Swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/customers", require("./routes/customerRoutes"));
app.use("/api/loyalty", require("./routes/loyaltyRoutes"));
app.use("/api/vouchers", require("./routes/voucherRoutes"));
app.use("/api/billing", require("./routes/billingRoutes"));
app.use("/api/reports", require("./routes/reportRoutes"));
app.use("/api/campaigns", require("./routes/campaignRoutes"));

module.exports = app;
