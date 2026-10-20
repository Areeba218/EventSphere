
const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
    {
        exhibitorEmail: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },

        companyName: {
            type: String,
            required: true,
            trim: true
        },

        expoName: {
            type: String,
            required: true,
            trim: true
        },

        products: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        staffCount: {
            type: Number,
            required: true,
            min: 1
        },

        boothPreference: {
            type: String,
            enum: ["Standard", "Premium", "Large"],
            default: "Standard"
        },

        status: {
            type: String,
            enum: ["Pending", "Approved", "Rejected"],
            default: "Pending"
        },

        adminRemarks: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Application",
    applicationSchema
);
