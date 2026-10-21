
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const ExhibitorRoutes = require("./routes/ExhibitorRoutes");
const ApplicationRoutes = require("./routes/ApplicationRoutes");
const boothRoutes = require("./routes/boothRoute");
const scheduleRoutes = require("./routes/scheduleRoute");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/exhibitor", ExhibitorRoutes);
app.use("/api/applications", ApplicationRoutes);
app.use("/api/booths", boothRoutes);
app.use("/api/schedules", scheduleRoutes);

// Test Route
app.get("/", (req, res) => {
    res.json({
        message: "EventSphere Backend is running"
    });
});

// MongoDB Connection
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected");

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });
