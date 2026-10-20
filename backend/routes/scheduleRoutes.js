const express = require("express");
const router = express.Router();

const {
    getSchedules,
    addSchedule,
} = require("../controller/scheduleController");

router.get("/schedules", getSchedules);
router.post("/schedules", addSchedule);

module.exports = router;