
const mongoose = require("mongoose");

const exhibitorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        company: {
            type: String,
            trim: true
        },
        email: {
            type: String,
            trim: true,
            lowercase: true
        },
        phone: {
            type: String,
            trim: true
        },
        description: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

module.exports =
    mongoose.models.Exhibitor ||
    mongoose.model("Exhibitor", exhibitorSchema);
