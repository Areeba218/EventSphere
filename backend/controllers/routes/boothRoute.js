
const express = require("express");
const router = express.Router();

const {
    createBooth,
    getAllBooths,
    getBoothById,
    updateBooth,
    deleteBooth
} = require("../controllers/boothController");

// Create booth
router.post("/", createBooth);

// Get all booths
router.get("/", getAllBooths);

// Get booth by ID
router.get("/:id", getBoothById);

// Update booth
router.put("/:id", updateBooth);

// Delete booth
router.delete("/:id", deleteBooth);

module.exports = router;

