const dns = require("node:dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const attendeeRoutes = require("./routes/attendeeRoutes");

const scheduleRoutes = require("./routes/scheduleRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.send("EventSphere API is running");
});

// Attendee routes
app.use("/api", attendeeRoutes);

app.use("/api", scheduleRoutes);

// Server port
const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start server
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected successfully!");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });
