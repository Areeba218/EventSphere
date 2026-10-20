
const Schedule = require("../models/Schedule");

// Get all schedule events
const getSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.find().sort({
            date: 1,
            startTime: 1,
        });

        res.status(200).json(schedules);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch schedules",
            error: error.message,
        });
    }
};

// Add a schedule event
const addSchedule = async (req, res) => {
    try {
        const {
            title,
            description,
            date,
            startTime,
            endTime,
            location,
            category,
            speaker,
        } = req.body;

        if (!title || !date || !startTime || !endTime || !location) {
            return res.status(400).json({
                message:
                    "Title, date, start time, end time, and location are required.",
            });
        }

        const schedule = await Schedule.create({
            title,
            description,
            date,
            startTime,
            endTime,
            location,
            category,
            speaker,
        });

        res.status(201).json({
            message: "Schedule event added successfully",
            schedule,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to add schedule event",
            error: error.message,
        });
    }
};

module.exports = {
    getSchedules,
    addSchedule,
};
