const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const boothRoutes = require("./routes/boothRoute");
const scheduleRoutes = require("./routes/scheduleRoute");

const app = express();

// Middleware must come before routes
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Booth API routes
app.use("/api/booths", boothRoutes);
app.use("/api/schedules", scheduleRoutes);

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "EventSphere Backend is running"
    });
});

// Connect MongoDB and start server
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });
