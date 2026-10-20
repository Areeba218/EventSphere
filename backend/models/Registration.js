
const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        phone: {
            type: String,
            required: true,
            trim: true
        },
        passType: {
            type: String,
            required: true,
            trim: true
        },
        expoName: {
            type: String,
            trim: true,
            default: ""
        },
        expoId: {
            type: String,
            default: "unknown"
        }
    },
    {
        timestamps: true
    }
);

module.exports =
    mongoose.models.Registration ||
    mongoose.model("Registration", registrationSchema);
