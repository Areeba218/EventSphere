const express = require("express");
const router = express.Router();

const {
    createSchedule,
    getAllSchedules,
    getScheduleById,
    updateSchedule,
    deleteSchedule
} = require("../controllers/scheduleController");

// Create a schedule
router.post("/", createSchedule);

// Get all schedules
router.get("/", getAllSchedules);

// Get one schedule by ID
router.get("/:id", getScheduleById);

// Update a schedule
router.put("/:id", updateSchedule);

// Delete a schedule
router.delete("/:id", deleteSchedule);

module.exports = router;