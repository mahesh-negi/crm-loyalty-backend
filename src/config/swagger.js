const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "CRM Loyalty Backend APIs",
            version: "1.0.0",
            description:
                "Enterprise-grade CRM, Loyalty, Campaign & Billing APIs",
        },
        servers: [
            {
                url: "http://localhost:5000",
            },
        ],

        // 🔐 GLOBAL AUTH
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },

        security: [
            {
                bearerAuth: [],
            },
        ],
    },

    apis: [
        "./src/routes/*.js",
        "./src/swagger/*.js",
    ],
};

module.exports = swaggerJsdoc(options);
