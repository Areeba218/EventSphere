const express = require("express");

const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/adminController");

const router = express.Router();

// Create Event
router.post("/events", createEvent);

// Get All Events
router.get("/events", getEvents);

// Get Single Event
router.get("/events/:id", getEventById);

// Update Event
router.put("/events/:id", updateEvent);

// Delete Event
router.delete("/events/:id", deleteEvent);

module.exports = router;