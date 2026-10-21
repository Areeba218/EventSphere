const Schedule = require("../models/schedule");

// Create Schedule
const createSchedule = async (req, res) => {
    try {
        const {
            title,
            description,
            date,
            startTime,
            endTime,
            location
        } = req.body;

        const schedule = await Schedule.create({
            title,
            description,
            date,
            startTime,
            endTime,
            location
        });

        res.status(201).json({
            message: "Schedule created successfully",
            schedule
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to create schedule",
            error: error.message
        });
    }
};

// Get All Schedules
const getAllSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.find().sort({ date: 1 });

        res.status(200).json({
            count: schedules.length,
            schedules
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch schedules",
            error: error.message
        });
    }
};

// Get Schedule By ID
const getScheduleById = async (req, res) => {
    try {
        const schedule = await Schedule.findById(req.params.id);

        if (!schedule) {
            return res.status(404).json({
                message: "Schedule not found"
            });
        }

        res.status(200).json(schedule);
    } catch (error) {
        res.status(400).json({
            message: "Failed to fetch schedule",
            error: error.message
        });
    }
};

// Update Schedule
const updateSchedule = async (req, res) => {
    try {
        const schedule = await Schedule.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
               
    returnDocument: "after",
    runValidators: true

            }
        );

        if (!schedule) {
            return res.status(404).json({
                message: "Schedule not found"
            });
        }

        res.status(200).json({
            message: "Schedule updated successfully",
            schedule
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to update schedule",
            error: error.message
        });
    }
};

// Delete Schedule
const deleteSchedule = async (req, res) => {
    try {
        const schedule = await Schedule.findByIdAndDelete(req.params.id);

        if (!schedule) {
            return res.status(404).json({
                message: "Schedule not found"
            });
        }

        res.status(200).json({
            message: "Schedule deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to delete schedule",
            error: error.message
        });
    }
};

module.exports = {
    createSchedule,
    getAllSchedules,
    getScheduleById,
    updateSchedule,
    deleteSchedule
};