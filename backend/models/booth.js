
const mongoose = require("mongoose");

const boothSchema = new mongoose.Schema(
    {
        boothName: {
            type: String,
            required: true,
            trim: true
        },

        boothNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        description: {
            type: String,
            default: ""
        },

        location: {
            type: String,
            required: true,
            trim: true
        },

        price: {
            type: Number,
            required: true,
            min: 0
        },

        status: {
            type: String,
            enum: ["Available", "Booked", "Reserved"],
            default: "Available"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Booth", boothSchema);
