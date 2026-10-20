
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const ExhibitorRoutes = require("./routes/ExhibitorRoutes");
const ApplicationRoutes = require("./routes/ApplicationRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/exhibitor", ExhibitorRoutes);
app.use("/api/applications", ApplicationRoutes);

app.get("/", (req, res) => {
    res.send("EventSphere API is running");
});

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected");

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("MongoDB connection failed");
        console.log(error);
    });
