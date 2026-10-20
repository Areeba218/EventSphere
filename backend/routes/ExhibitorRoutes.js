
const express = require("express");
const Exhibitor = require("../Model/ExhibitorModel");

const router = express.Router();

// Save exhibitor profile

router.post("/profile", async (req, res) => {
    try {
        const {
            companyName,
            contactPerson,
            email,
            phone,
            website,
            category,
            products,
            address,
            description
        } = req.body;

        if (!companyName || !email || !category) {
            return res.status(400).json({
                message: "Company name, email and category are required."
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existingProfile = await Exhibitor.findOne({
            email: normalizedEmail
        });

        let exhibitor;
        let message;

        if (existingProfile) {
            exhibitor = await Exhibitor.findOneAndUpdate(
                { email: normalizedEmail },
                {
                    $set: {
                        companyName,
                        contactPerson,
                        phone,
                        website,
                        category,
                        products,
                        address,
                        description
                    }
                },
                {
                    new: true,
                    runValidators: true
                }
            );

            message = "Profile updated successfully";
        } else {
            exhibitor = await Exhibitor.create({
                companyName,
                contactPerson,
                email: normalizedEmail,
                phone,
                website,
                category,
                products,
                address,
                description
            });

            message = "Profile saved successfully";
        }

        return res.status(200).json({
            message,
            exhibitor
        });

    } catch (error) {
        console.error("Exhibitor profile error:", error);

        return res.status(500).json({
            message: "Profile could not be saved",
            error: error.message
        });
    }
});

// Get exhibitor profile by email
router.get("/profile/:email", async (req, res) => {
    try {
        const exhibitor = await Exhibitor.findOne({
            email: req.params.email
        });

        if (!exhibitor) {
            return res.status(404).json({
                message: "Profile not found"
            });
        }

        res.json(exhibitor);
    } catch (error) {
        res.status(500).json({
            message: "Error loading profile",
            error: error.message
        });
    }
});

module.exports = router;
