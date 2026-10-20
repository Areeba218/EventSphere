
const Registration = require("../models/Registration");
const Exhibitor = require("../models/Exhibitor");

// Register an attendee for an expo
const registerForExpo = async (req, res) => {
    try {
        const { name, email, phone, passType, expoName, expoId } = req.body;

        if (!name || !email || !phone || !passType) {
            return res.status(400).json({
                message: "Please provide name, email, phone, and pass type."
            });
        }

        const registration = new Registration({
            name,
            email,
            phone,
            passType,
            expoName,
            expoId
        });

        const savedRegistration = await registration.save();

        return res.status(201).json({
            message: "Registration successful!",
            registration: savedRegistration
        });
    } catch (err) {
        console.error("Registration error:", err);

        return res.status(500).json({
            message: "Registration failed.",
            error: err.message
        });
    }
};

// Get exhibitors, with optional case-insensitive name search
const getExhibitors = async (req, res) => {
    try {
        const { search } = req.query;
        const query = {};

        if (search && search.trim()) {
            query.name = {
                $regex: search.trim(),
                $options: "i"
            };
        }

        const exhibitors = await Exhibitor.find(query);

        return res.status(200).json(exhibitors);
    } catch (err) {
        console.error("Get exhibitors error:", err);

        return res.status(500).json({
            message: "Failed to fetch exhibitors.",
            error: err.message
        });
    }
};

module.exports = {
    registerForExpo,
    getExhibitors
};
