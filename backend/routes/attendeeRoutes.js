
const express = require("express");
const {
    registerForExpo,
    getExhibitors
} = require("../controller/attendeeController");

const router = express.Router();

router.post("/registrations", registerForExpo);
router.get("/exhibitors", getExhibitors);

module.exports = router;
