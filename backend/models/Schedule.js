
const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            default: "",
        },
        date: {
            type: Date,
            required: true,
        },
        startTime: {
            type: String,
            required: true,
        },
        endTime: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            default: "General",
        },
        speaker: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Schedule", scheduleSchema);
